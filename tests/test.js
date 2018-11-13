/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const chai = require('chai')

const describe = require('mocha').describe
const it = require('mocha').it
const expect = chai.expect

const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const dummyTitle = 'Dummy Title'
const dummyContent = 'This is dummy content'
const dummyPost = {
  title: dummyTitle,
  description: dummyContent
}

describe('gulp-feed', function () {
  let gulpFeed, mockery

  beforeEach(function () {
    mockery = require('mockery')
    mockery.enable({
      warnOnUnregistered: false
    })

    gulpFeed = require('..')
  })

  afterEach(function () {
    mockery.deregisterAll()
    mockery.disable()
    gulpFeed = null
  })

  it('returns a readable stream', function () {
    const isReadable = require('isstream').isReadable
    const fileStream = gulpFeed([dummyPost], {
      render: {
        'test.json': 'json1'
      }
    })
    expect(isReadable(fileStream)).to.be.true
  })
})
