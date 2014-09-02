var readimage = require('readimage')
var writegif = require('writegif')
var fs = require('fs')

function trail(buffer, callback) {
  readimage(buffer, function(err, image) {
    if (err) {
      return callback(err)
    }
    var base = image.frames[0].data
    for (var i = 1; i < image.frames.length; i++) {
      var frame = image.frames[i].data
      var buf = new Buffer(base.length)
      base.copy(buf)
      for (var j = 0; j < buf.length; j+=4) {
        buf[j] = (base[j] + frame[j]) / 2
        buf[j+1] = (base[j+1] + frame[j+1]) / 2
        buf[j+2] = (base[j+2] + frame[j+2]) / 2
      }
      image.frames[i].data = buf
      base = buf
    }
    writegif(image, callback)
  })
}

var b = fs.readFileSync('/Users/calebtroughton/Desktop/test2.gif')
trail(b, function(err, tb) {
  fs.writeFileSync('/Users/calebtroughton/Desktop/test-trail2.gif', tb)
  console.log('trailed')
})

