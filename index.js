var readimage = require('readimage')
var writegif = require('writegif')
var fs = require('fs')

function trail(buffer, callback) {
  readimage(buffer, function(err, image) {
    if (err) {
      return callback(err)
    }
    for (var i = 1; i < image.frames.length; i++) {
      var frame = image.frames[i]
    }
    writegif(image, callback)
  })
}

var b = fs.readFileSync('/Users/calebtroughton/Desktop/test.gif')
trail(b, function(err, tb) {
  fs.writeFileSync('/Users/calebtroughton/Desktop/test-trail.gif', tb)
  console.log('trailed')
})

