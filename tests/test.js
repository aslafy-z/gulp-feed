/* eslint-env mocha */

'use strict'

var chai = require('chai')

var describe = require('mocha').describe
var it = require('mocha').it
var expect = chai.expect

var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var dummyTitle = 'Dummy Title'
var dummyContent = 'This is dummy content'
var dummyPost = {
  title: dummyTitle,
  description: dummyContent
}

describe('gulp-feed', function () {
  var gulpFeed, mockery

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
    var isReadable = require('isstream').isReadable
    var fileStream = gulpFeed([dummyPost], {
      render: {
        'test.json': 'json1'
      }
    })
    expect(isReadable(fileStream)).to.be.true()
  })
})
