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

![Original](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/original.gif)

### tracer

![Tracer](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/motion_ghost.gif)

### min

![Min](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/darkest.gif)

### max

![Max](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/brightest.gif)

### trip

![Trip](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/multiply.gif)

### meatmotion

![Meatmotion](https://raw.githubusercontent.com/imakewebthings/node-gif-composites/master/examples/meat_motion.gif)

## License

MIT.
