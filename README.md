# just-on

Just the event module of jQuery

## why?

If you are passionate about developing JavaScript plugins and want to get rid of jQuery, but also enjoy its use of event binding, then this library is very useful for you, which is also its main use case

## install

```bash
$ npm i -D just-on
```

## usage

```js
import { on, off } from 'just-on'

//bind click event
on('#btn', 'click', function () {
  console.log('binded!')
})

//remove click event
off('#btn', 'click')
```

We just placed the selector parameter in the first position of the method here

For details, please refer to : [on](https://api.jquery.com/on/#on-events-selector-data-handler)、[off](https://api.jquery.com/off/#off-events-selector-handler)
