# gif-trail

Turn a gif into a motion trail by compositing each frame on top of the previous ones.

`npm install gif-trail`

```js
var trail = require('gif-trail')
var fs = require('fs')

fs.readFile('example.gif', function(err, buffer) {
  gif-trail(buffer, function(err, trailBuffer) {
    fs.writeFile('example-trailed.gif', function(err) {
      console.log('trailed')
    })
  })
})
```
