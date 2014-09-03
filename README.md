# gif-composites

Apply various composite effects to gifs.

`npm install gif-composites`

All methods take an image buffer and provides a transformed image buffer in the callback.

```js
var composites = require('gif-composites')
var fs = require('fs')

fs.readFile('example.gif', function(err, buffer) {
  composites.tracer(buffer, function(err, tracerBuffer) {
    fs.writeFileSync('example-tracer.gif', tracerBuffer)
  })
})
```

## Methods

Given this original...



### tracer



### min



### max



### trip



### meatmotion



## License

MIT.
