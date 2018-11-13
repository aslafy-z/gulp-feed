const Vinyl = require('vinyl')
const log = require('fancy-log')
const Readable = require('stream').Readable
const Feed = require('feed').Feed

const RENDERERS = ['rss2', 'atom1', 'json1']

module.exports = function (posts, options = {}) {
  const render = options.render || null
  if (!render || !Object.values(render).every(el => RENDERERS.includes(el))) {
    log.error('gulp-feed: No valid renderer specified, use "rss2", "atom1" or "json1".')
    throw new Error('gulp-feed: Incorrect options.')
  }
  delete options.render
  const formatter = options.formatter || (x => x)
  delete options.formatter

  const feed = new Feed(options)
  posts.forEach(post => feed.addItem(formatter(post)))

  const stream = Readable({
    objectMode: true,
    read () {}
  })

  const promises = Object.keys(render).map(k => {
    return new Promise((resolve) => {
      const value = typeof feed[render[k]] === 'function' ? feed[render[k]]() : null
      if (value) {
        log('gulp-feed: render ' + render[k] + ' for file ' + k + ' succeed!')
      } else {
        log.error('gulp-feed: render ' + render[k] + ' for file ' + k + ' failed!')
        log.error('gulp-feed: ', render[k] + ' renderer does not exists.')
        return resolve(null)
      }
      return resolve(new Vinyl({
        path: k,
        contents: Buffer.from(value)
      }))
    })
  })

  Promise.all(promises).then(posts => {
    posts.filter(p => !!p).forEach(p => stream.push(p))
    stream.push(null)
  })

  return stream
}
