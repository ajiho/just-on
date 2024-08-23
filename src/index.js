import $ from "./event.js";


export function on(element, events, selector, data, handler) {
  $(element).on(events, selector, data, handler);
}

export function off(element, events, selector, handler) {
  $(element).off(events, selector, handler);
}
