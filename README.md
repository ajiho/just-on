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
import { on, off } from "just-on";

//Binding Events
on("#bind", "click", function () {
  console.log("binded!");
});

off("#bind", "click");
```
