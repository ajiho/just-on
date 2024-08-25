import $ from './event.js'

/**
 * Attach an event handler function for one or more events to the selected elements.
 * @author Ajiho <lujiahao@88.com>
 * @license MIT
 * @param {String|Element} element  Element or element selector string
 * @param {String} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param {*} [data] Data to be passed to the handler in event.data when an event is triggered.
 * @param {Function} [handler] A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
 * @returns {jQuery} JQuery Object
 */
export function on(element, events, selector, data, handler) {
  $(element).on(events, selector, data, handler)
}

/**
 * Remove an event handler.
 * @param {String|Element} element Element or element selector string
 * @param {String} events One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
 * @param {String} [selector] A selector which should match the one originally passed to .on() when attaching event handlers.
 * @param {Function} [handler] A handler function previously attached for the event(s), or the special value false.
 */
export function off(element, events, selector, handler) {
  $(element).off(events, selector, handler)
}
