var readimage = require('readimage')
var writegif = require('writegif')

var transforms = {
  max: function(base, frame) {
    var buf = new Buffer(base.length)
    for (var j = 0; j < buf.length; j++) {
      buf[j] = Math.max(base[j], frame[j])
    }
    return buf
  },

  meatmotion: function(base, frame) {
    var buf = new Buffer(base.length)
    for (var j = 0; j < buf.length; j+= 4) {
      var rDiff = Math.abs(frame[j] - base[j])
      var gDiff = Math.abs(frame[j+1] - base[j+1])
      var bDiff = Math.abs(frame[j+2] - base[j+2])
      var tolerance = 50
      if (rDiff > tolerance || gDiff > tolerance || bDiff > tolerance) {
        buf[j] = 241
        buf[j+1] = 129
        buf[j+2] = 173
      }
      else {
        buf[j] = base[j]
        buf[j+1] = base[j+1]
        buf[j+2] = base[j+2]
      }
    }
    return buf
  },

  min: function(base, frame) {
    var buf = new Buffer(base.length)
    for (var j = 0; j < buf.length; j++) {
      buf[j] = Math.min(base[j], frame[j])
    }
    return buf
  },

  tracer: function(base, frame) {
    var buf = new Buffer(base.length)
    for (var j = 0; j < buf.length; j+=4) {
      buf[j] = (base[j] + frame[j]) / 2
      buf[j+1] = (base[j+1] + frame[j+1]) / 2
      buf[j+2] = (base[j+2] + frame[j+2]) / 2
    }
    return buf
  },

  trip: function(base, frame) {
    var buf = new Buffer(base.length)
    for (var j = 0; j < buf.length; j+=4) {
      buf[j] = Math.floor((base[j] + frame[j]) / 1.5)
      buf[j+1] = Math.floor((base[j+1] + frame[j+1]) / 1.5)
      buf[j+2] = Math.floor((base[j+2] + frame[j+2]) / 1.5)
    }
    return buf
  }
}

for (var transform in transforms) {
  module.exports[transform] = (function(transformFn) {
    return function(buffer, callback) {
      readimage(buffer, function(err, image) {
        if (err) {
          return callback(err)
        }
        var base = image.frames[0].data
        for (var i = 0; i < image.frames.length; i++) {
          var frame = image.frames[i].data
          var buf = transformFn(base, frame)
          image.frames[i].data = buf
          base = buf
        }
        writegif(image, callback)
      })
    }
  }(transforms[transform]))
}
