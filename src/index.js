import $ from './event.js'

/**
 * Attach an event handler function for one or more events to the selected elements.
 * @author Ajiho <lujiahao@88.com>
 * @param {String|Element|jQuery} element  Element or element selector string
 * @param {...*} args Additional arguments passed to the jQuery .on() method
 * @returns {jQuery} JQuery Object
 */
export function on(element, ...args) {
  $(element).on(...args)
}

/**
 * Remove an event handler.
 * @param {String|Element|jQuery} element Element or element selector string
 * @param {...*} args Additional arguments passed to the jQuery .off() method
 * @returns {jQuery} JQuery Object
 */
export function off(element, ...args) {
  $(element).off(...args)
}

/**
 * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
 * @param {String|Element|jQuery} element Element or element selector string
 * @param {...*} args Additional arguments passed to the jQuery .one() method
 * @returns {jQuery} JQuery Object
 */
export function one(element, ...args) {
  $(element).one(...args)
}
