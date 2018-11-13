# gulp-feed [![Build Status](https://travis-ci.org/aslafy-z/gulp-feed.svg?branch=master)](https://travis-ci.org/aslafy-z/gulp-feed) [![Coverage Status](https://coveralls.io/repos/aslafy-z/gulp-feed/badge.svg?branch=master&service=github)](https://coveralls.io/github/aslafy-z/gulp-feed?branch=master) [![Dependency Status](https://david-dm.org/aslafy-z/gulp-feed.svg)](https://david-dm.org/aslafy-z/gulp-feed)

[jpmonette/feed](https://github.com/jpmonette/feed) wrapper for gulp, allowing you create any supported feed format. The files contents are [streamed](streamed) into a stream of [Vinyl](https://github.com/gulpjs/vinyl) files and so generates in parallel.


## Installation

```
npm install @zadkiel/gulp-feed --save
```


## Usage

```javascript
const gulpFeed = require("@zadkiel/gulp-feed");

gulpFeed(posts, options).pipe(...);
```

### Example

	
```javascript
const posts = [{
  title: 'My super title',
  content: 'My super content',
}];
const options = {
  // options from feed (see https://github.com/jpmonette/feed#example)
  // 
  transform: post => post,
  // `transform` can be used to transform the data before giving it to feed (to adapt it)
  render: {
    'mysuperrss.xml': 'rss2',
    // filename: wanted format (rss2, atom1 or json1)
  },
};

gulpFeed(posts, options)
  .pipe(gulp.dest("assets/"));
```

### TODO

[ ] More tests
