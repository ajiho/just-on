function jQueryFactory(window, noGlobal) {
  if (typeof window === 'undefined' || !window.document) {
    throw new Error('jQuery requires a window with a document')
  }

  var arr = []

  var getProto = Object.getPrototypeOf

  var slice = arr.slice

  var flat = arr.flat
    ? function (array) {
        return arr.flat.call(array)
      }
    : function (array) {
        return arr.concat.apply([], array)
      }

  var push = arr.push

  var indexOf = arr.indexOf

  var class2type = {}

  var toString = class2type.toString

  var hasOwn = class2type.hasOwnProperty

  var fnToString = hasOwn.toString

  var ObjectFunctionString = fnToString.call(Object)

  var support = {}

  function toType(obj) {
    if (obj == null) {
      return obj + ''
    }

    return typeof obj === 'object'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj
  }

  function isWindow(obj) {
    return obj != null && obj === obj.window
  }

  function isArrayLike(obj) {
    var length = !!obj && obj.length,
      type = toType(obj)

    if (typeof obj === 'function' || isWindow(obj)) {
      return false
    }

    return (
      type === 'array' ||
      length === 0 ||
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    )
  }

  var document$1 = window.document

  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true,
  }

  function DOMEval(code, node, doc) {
    doc = doc || document$1

    var i,
      script = doc.createElement('script')

    script.text = code
    for (i in preservedScriptAttributes) {
      if (node && node[i]) {
        script[i] = node[i]
      }
    }

    if (doc.head.appendChild(script).parentNode) {
      script.parentNode.removeChild(script)
    }
  }

  var version = '4.0.0-beta.2+51fffe9f +event',
    rhtmlSuffix = /HTML$/i,
    jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context)
    }

  jQuery.fn = jQuery.prototype = {
    jquery: version,

    constructor: jQuery,

    length: 0,

    toArray: function () {
      return slice.call(this)
    },

    get: function (num) {
      if (num == null) {
        return slice.call(this)
      }

      return num < 0 ? this[num + this.length] : this[num]
    },

    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems)

      ret.prevObject = this

      return ret
    },

    each: function (callback) {
      return jQuery.each(this, callback)
    },

    map: function (callback) {
      return this.pushStack(
        jQuery.map(this, function (elem, i) {
          return callback.call(elem, i, elem)
        }),
      )
    },

    slice: function () {
      return this.pushStack(slice.apply(this, arguments))
    },

    first: function () {
      return this.eq(0)
    },

    last: function () {
      return this.eq(-1)
    },

    even: function () {
      return this.pushStack(
        jQuery.grep(this, function (_elem, i) {
          return (i + 1) % 2
        }),
      )
    },

    odd: function () {
      return this.pushStack(
        jQuery.grep(this, function (_elem, i) {
          return i % 2
        }),
      )
    },

    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0)
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },

    end: function () {
      return this.prevObject || this.constructor()
    },
  }

  jQuery.extend = jQuery.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false

    if (typeof target === 'boolean') {
      deep = target

      target = arguments[i] || {}
      i++
    }

    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          copy = options[name]

          if (name === '__proto__' || target === copy) {
            continue
          }

          if (
            deep &&
            copy &&
            (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
          ) {
            src = target[name]

            if (copyIsArray && !Array.isArray(src)) {
              clone = []
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {}
            } else {
              clone = src
            }
            copyIsArray = false

            target[name] = jQuery.extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    return target
  }

  jQuery.extend({
    expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

    // Assume jQuery is ready without the ready module
    isReady: true,

    error: function (msg) {
      throw new Error(msg)
    },

    noop: function () {},

    isPlainObject: function (obj) {
      var proto, Ctor

      // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects
      if (!obj || toString.call(obj) !== '[object Object]') {
        return false
      }

      proto = getProto(obj)

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      if (!proto) {
        return true
      }

      // Objects with prototype are plain iff they were constructed by a global Object function
      Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
      return (
        typeof Ctor === 'function' &&
        fnToString.call(Ctor) === ObjectFunctionString
      )
    },

    isEmptyObject: function (obj) {
      var name

      for (name in obj) {
        return false
      }
      return true
    },

    globalEval: function (code, options, doc) {
      DOMEval(code, { nonce: options && options.nonce }, doc)
    },

    each: function (obj, callback) {
      var length,
        i = 0

      if (isArrayLike(obj)) {
        length = obj.length
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      }

      return obj
    },

    text: function (elem) {
      var node,
        ret = '',
        i = 0,
        nodeType = elem.nodeType

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while ((node = elem[i++])) {
          // Do not traverse comment nodes
          ret += jQuery.text(node)
        }
      }
      if (nodeType === 1 || nodeType === 11) {
        return elem.textContent
      }
      if (nodeType === 9) {
        return elem.documentElement.textContent
      }
      if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue
      }

      // Do not include comment or processing instruction nodes

      return ret
    },

    // results is for internal usage only
    makeArray: function (arr, results) {
      var ret = results || []

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
        } else {
          push.call(ret, arr)
        }
      }

      return ret
    },

    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i)
    },

    isXMLDoc: function (elem) {
      var namespace = elem && elem.namespaceURI,
        docElem = elem && (elem.ownerDocument || elem).documentElement

      return !rhtmlSuffix.test(
        namespace || (docElem && docElem.nodeName) || 'HTML',
      )
    },

    contains: function (a, b) {
      var bup = b && b.parentNode

      return (
        a === bup ||
        !!(
          bup &&
          bup.nodeType === 1 &&
          (a.contains
            ? a.contains(bup)
            : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16)
        )
      )
    },

    merge: function (first, second) {
      var len = +second.length,
        j = 0,
        i = first.length

      for (; j < len; j++) {
        first[i++] = second[j]
      }

      first.length = i

      return first
    },

    grep: function (elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i)
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i])
        }
      }

      return matches
    },

    map: function (elems, callback, arg) {
      var length,
        value,
        i = 0,
        ret = []

      if (isArrayLike(elems)) {
        length = elems.length
        for (; i < length; i++) {
          value = callback(elems[i], i, arg)

          if (value != null) {
            ret.push(value)
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg)

          if (value != null) {
            ret.push(value)
          }
        }
      }

      return flat(ret)
    },

    guid: 1,

    support: support,
  })

  if (typeof Symbol === 'function') {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
  }

  jQuery.each(
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
      ' ',
    ),
    function (_i, name) {
      class2type['[object ' + name + ']'] = name.toLowerCase()
    },
  )

  var documentElement$1 = document$1.documentElement

  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g

  var rcheckableType = /^(?:checkbox|radio)$/i

  var isIE = document$1.documentMode

  function acceptData(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType
  }

  var rdashAlpha = /-([a-z])/g

  function fcamelCase(_all, letter) {
    return letter.toUpperCase()
  }

  function camelCase(string) {
    return string.replace(rdashAlpha, fcamelCase)
  }

  function Data() {
    this.expando = jQuery.expando + Data.uid++
  }

  Data.uid = 1

  Data.prototype = {
    cache: function (owner) {
      var value = owner[this.expando]

      if (!value) {
        value = Object.create(null)

        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true,
            })
          }
        }
      }

      return value
    },
    set: function (owner, data, value) {
      var prop,
        cache = this.cache(owner)

      if (typeof data === 'string') {
        cache[camelCase(data)] = value
      } else {
        for (prop in data) {
          cache[camelCase(prop)] = data[prop]
        }
      }
      return value
    },
    get: function (owner, key) {
      return key === undefined
        ? this.cache(owner)
        : owner[this.expando] && owner[this.expando][camelCase(key)]
    },
    access: function (owner, key, value) {
      if (
        key === undefined ||
        (key && typeof key === 'string' && value === undefined)
      ) {
        return this.get(owner, key)
      }

      this.set(owner, key, value)

      return value !== undefined ? value : key
    },
    remove: function (owner, key) {
      var i,
        cache = owner[this.expando]

      if (cache === undefined) {
        return
      }

      if (key !== undefined) {
        if (Array.isArray(key)) {
          key = key.map(camelCase)
        } else {
          key = camelCase(key)

          key = key in cache ? [key] : key.match(rnothtmlwhite) || []
        }

        i = key.length

        while (i--) {
          delete cache[key[i]]
        }
      }

      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined
        } else {
          delete owner[this.expando]
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando]
      return cache !== undefined && !jQuery.isEmptyObject(cache)
    },
  }

  var dataPriv = new Data()

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
  }

  var rsingleTag =
    /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i

  function isObviousHtml(input) {
    return (
      input[0] === '<' && input[input.length - 1] === '>' && input.length >= 3
    )
  }

  var pop = arr.pop

  var whitespace = '[\\x20\\t\\r\\n\\f]'

  try {
    document$1.querySelector(':has(*,:jqfake)')
    support.cssHas = false
  } catch (e) {
    support.cssHas = true
  }

  var rbuggyQSA = []

  if (isIE) {
    rbuggyQSA.push(
      ':enabled',
      ':disabled',

      '\\[' +
        whitespace +
        '*name' +
        whitespace +
        '*=' +
        whitespace +
        '*(?:\'\'|"")',
    )
  }

  if (!support.cssHas) {
    rbuggyQSA.push(':has')
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'))

  var rtrimCSS = new RegExp(
    '^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$',
    'g',
  )

  var identifier =
    '(?:\\\\[\\da-fA-F]{1,6}' +
    whitespace +
    '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+'

  var rleadingCombinator = new RegExp(
    '^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*',
  )

  var rdescend = new RegExp(whitespace + '|>')

  var rsibling = /[+~]/

  var matches = documentElement$1.matches || documentElement$1.msMatchesSelector

  function createCache() {
    var keys = []

    function cache(key, value) {
      if (keys.push(key + ' ') > jQuery.expr.cacheLength) {
        delete cache[keys.shift()]
      }
      return (cache[key + ' '] = value)
    }
    return cache
  }

  function testContext(context) {
    return (
      context && typeof context.getElementsByTagName !== 'undefined' && context
    )
  }

  var attributes =
    '\\[' +
    whitespace +
    '*(' +
    identifier +
    ')(?:' +
    whitespace +
    '*([*^$|!~]?=)' +
    whitespace +
    '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
    identifier +
    '))|)' +
    whitespace +
    '*\\]'

  var pseudos =
    ':(' +
    identifier +
    ')(?:\\((' +
    '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' +
    '((?:\\\\.|[^\\\\()[\\]]|' +
    attributes +
    ')*)|' +
    '.*' +
    ')\\)|)'

  var filterMatchExpr = {
    ID: new RegExp('^#(' + identifier + ')'),
    CLASS: new RegExp('^\\.(' + identifier + ')'),
    TAG: new RegExp('^(' + identifier + '|[*])'),
    ATTR: new RegExp('^' + attributes),
    PSEUDO: new RegExp('^' + pseudos),
    CHILD: new RegExp(
      '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
        whitespace +
        '*(even|odd|(([+-]|)(\\d*)n|)' +
        whitespace +
        '*(?:([+-]|)' +
        whitespace +
        '*(\\d+)|))' +
        whitespace +
        '*\\)|)',
      'i',
    ),
  }

  var rpseudo = new RegExp(pseudos)

  var runescape = new RegExp(
      '\\\\[\\da-fA-F]{1,6}' + whitespace + '?|\\\\([^\\r\\n\\f])',
      'g',
    ),
    funescape = function (escape, nonHex) {
      var high = '0x' + escape.slice(1) - 0x10000

      if (nonHex) {
        return nonHex
      }

      return high < 0
        ? String.fromCharCode(high + 0x10000)
        : String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00)
    }

  function unescapeSelector(sel) {
    return sel.replace(runescape, funescape)
  }

  function selectorError(msg) {
    jQuery.error('Syntax error, unrecognized expression: ' + msg)
  }

  var rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*')

  var tokenCache = createCache()

  function tokenize(selector, parseOnly) {
    var matched,
      match,
      tokens,
      type,
      soFar,
      groups,
      preFilters,
      cached = tokenCache[selector + ' ']

    if (cached) {
      return parseOnly ? 0 : cached.slice(0)
    }

    soFar = selector
    groups = []
    preFilters = jQuery.expr.preFilter

    while (soFar) {
      if (!matched || (match = rcomma.exec(soFar))) {
        if (match) {
          soFar = soFar.slice(match[0].length) || soFar
        }
        groups.push((tokens = []))
      }

      matched = false

      if ((match = rleadingCombinator.exec(soFar))) {
        matched = match.shift()
        tokens.push({
          value: matched,

          type: match[0].replace(rtrimCSS, ' '),
        })
        soFar = soFar.slice(matched.length)
      }

      for (type in filterMatchExpr) {
        if (
          (match = jQuery.expr.match[type].exec(soFar)) &&
          (!preFilters[type] || (match = preFilters[type](match)))
        ) {
          matched = match.shift()
          tokens.push({
            value: matched,
            type: type,
            matches: match,
          })
          soFar = soFar.slice(matched.length)
        }
      }

      if (!matched) {
        break
      }
    }

    if (parseOnly) {
      return soFar.length
    }

    return soFar
      ? selectorError(selector)
      : tokenCache(selector, groups).slice(0)
  }

  var preFilter = {
    ATTR: function (match) {
      match[1] = unescapeSelector(match[1])

      match[3] = unescapeSelector(match[3] || match[4] || match[5] || '')

      if (match[2] === '~=') {
        match[3] = ' ' + match[3] + ' '
      }

      return match.slice(0, 4)
    },

    CHILD: function (match) {
      /* matches from filterMatchExpr["CHILD"]
			1 type (only|nth|...)
			2 what (child|of-type)
			3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
			4 xn-component of xn+y argument ([+-]?\d*n|)
			5 sign of xn-component
			6 x of xn-component
			7 sign of y-component
			8 y of y-component
		*/
      match[1] = match[1].toLowerCase()

      if (match[1].slice(0, 3) === 'nth') {
        if (!match[3]) {
          selectorError(match[0])
        }

        match[4] = +(match[4]
          ? match[5] + (match[6] || 1)
          : 2 * (match[3] === 'even' || match[3] === 'odd'))
        match[5] = +(match[7] + match[8] || match[3] === 'odd')
      } else if (match[3]) {
        selectorError(match[0])
      }

      return match
    },

    PSEUDO: function (match) {
      var excess,
        unquoted = !match[6] && match[2]

      if (filterMatchExpr.CHILD.test(match[0])) {
        return null
      }

      if (match[3]) {
        match[2] = match[4] || match[5] || ''

        // Strip excess characters from unquoted arguments
      } else if (
        unquoted &&
        rpseudo.test(unquoted) &&
        // Get excess from tokenize (recursively)
        (excess = tokenize(unquoted, true)) &&
        // advance to the next closing parenthesis
        (excess =
          unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)
      ) {
        // excess is a negative index
        match[0] = match[0].slice(0, excess)
        match[2] = unquoted.slice(0, excess)
      }

      // Return only captures needed by the pseudo filter method (type and argument)
      return match.slice(0, 3)
    },
  }

  function toSelector(tokens) {
    var i = 0,
      len = tokens.length,
      selector = ''
    for (; i < len; i++) {
      selector += tokens[i].value
    }
    return selector
  }

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  function access(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null

    // Sets many values
    if (toType(key) === 'object') {
      chainable = true
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw)
      }
    } else if (value !== undefined) {
      chainable = true

      if (typeof value !== 'function') {
        raw = true
      }

      if (bulk) {
        if (raw) {
          fn.call(elems, value)
          fn = null
        } else {
          bulk = fn
          fn = function (elem, _key, value) {
            return bulk.call(jQuery(elem), value)
          }
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(
            elems[i],
            key,
            raw ? value : value.call(elems[i], i, fn(elems[i], key)),
          )
        }
      }
    }

    if (chainable) {
      return elems
    }

    if (bulk) {
      return fn.call(elems)
    }

    return len ? fn(elems[0], key) : emptyGet
  }

  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1)
    },

    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name)
      })
    },
  })

  jQuery.extend({
    attr: function (elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType

      if (nType === 3 || nType === 8 || nType === 2) {
        return
      }

      if (typeof elem.getAttribute === 'undefined') {
        return jQuery.prop(elem, name, value)
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()]
      }

      if (value !== undefined) {
        if (
          value === null ||
          (value === false && name.toLowerCase().indexOf('aria-') !== 0)
        ) {
          jQuery.removeAttr(elem, name)
          return
        }

        if (
          hooks &&
          'set' in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
        ) {
          return ret
        }

        elem.setAttribute(name, value)
        return value
      }

      if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }

      ret = elem.getAttribute(name)

      return ret == null ? undefined : ret
    },

    attrHooks: {},

    removeAttr: function (elem, value) {
      var name,
        i = 0,
        attrNames = value && value.match(rnothtmlwhite)

      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          elem.removeAttribute(name)
        }
      }
    },
  })

  if (isIE) {
    jQuery.attrHooks.type = {
      set: function (elem, value) {
        if (value === 'radio' && nodeName(elem, 'input')) {
          var val = elem.value
          elem.setAttribute('type', value)
          if (val) {
            elem.value = val
          }
          return value
        }
      },
    }
  }

  var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g

  function fcssescape(ch, asCodePoint) {
    if (asCodePoint) {
      if (ch === '\0') {
        return '\uFFFD'
      }

      return (
        ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' '
      )
    }

    return '\\' + ch
  }

  jQuery.escapeSelector = function (sel) {
    return (sel + '').replace(rcssescape, fcssescape)
  }

  var sort = arr.sort

  var splice = arr.splice

  var hasDuplicate

  // Document order sorting
  function sortOrder(a, b) {
    // Flag for duplicate removal
    if (a === b) {
      hasDuplicate = true
      return 0
    }

    // Sort on method existence if only one input has compareDocumentPosition
    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition
    if (compare) {
      return compare
    }

    // Calculate position if both inputs belong to the same document
    // Support: IE 11+
    // IE sometimes throws a "Permission denied" error when strict-comparing

    compare =
      (a.ownerDocument || a) == (b.ownerDocument || b)
        ? a.compareDocumentPosition(b)
        : 1

    if (compare & 1) {
      if (
        a == document$1 ||
        (a.ownerDocument == document$1 && jQuery.contains(document$1, a))
      ) {
        return -1
      }

      if (
        b == document$1 ||
        (b.ownerDocument == document$1 && jQuery.contains(document$1, b))
      ) {
        return 1
      }

      return 0
    }

    return compare & 4 ? -1 : 1
  }

  jQuery.uniqueSort = function (results) {
    var elem,
      duplicates = [],
      j = 0,
      i = 0

    hasDuplicate = false

    sort.call(results, sortOrder)

    if (hasDuplicate) {
      while ((elem = results[i++])) {
        if (elem === results[i]) {
          j = duplicates.push(i)
        }
      }
      while (j--) {
        splice.call(results, duplicates[j], 1)
      }
    }

    return results
  }

  jQuery.fn.uniqueSort = function () {
    return this.pushStack(jQuery.uniqueSort(slice.apply(this)))
  }

  var i,
    outermostContext,
    document,
    documentElement,
    documentIsHTML,
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    compilerCache = createCache(),
    nonnativeSelectorCache = createCache(),
    rwhitespace = new RegExp(whitespace + '+', 'g'),
    ridentifier = new RegExp('^' + identifier + '$'),
    matchExpr = jQuery.extend(
      {
        needsContext: new RegExp(
          '^' +
            whitespace +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            whitespace +
            '*((?:-\\d)?\\d*)' +
            whitespace +
            '*\\)|)(?=[^-]|$)',
          'i',
        ),
      },
      filterMatchExpr,
    ),
    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,
    rquickExpr$1 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    unloadHandler = function () {
      setDocument()
    },
    inDisabledFieldset = addCombinator(
      function (elem) {
        return elem.disabled === true && nodeName(elem, 'fieldset')
      },
      { dir: 'parentNode', next: 'legend' },
    )

  function find(selector, context, results, seed) {
    var m,
      i,
      elem,
      nid,
      match,
      groups,
      newSelector,
      newContext = context && context.ownerDocument,
      nodeType = context ? context.nodeType : 9

    results = results || []

    if (
      typeof selector !== 'string' ||
      !selector ||
      (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
    ) {
      return results
    }

    if (!seed) {
      setDocument(context)
      context = context || document

      if (documentIsHTML) {
        if (nodeType !== 11 && (match = rquickExpr$1.exec(selector))) {
          if ((m = match[1])) {
            if (nodeType === 9) {
              if ((elem = context.getElementById(m))) {
                push.call(results, elem)
              }
              return results
            } else {
              if (
                newContext &&
                (elem = newContext.getElementById(m)) &&
                jQuery.contains(context, elem)
              ) {
                push.call(results, elem)
                return results
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector))
            return results
          } else if ((m = match[3]) && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m))
            return results
          }
        }

        if (
          !nonnativeSelectorCache[selector + ' '] &&
          (!rbuggyQSA || !rbuggyQSA.test(selector))
        ) {
          newSelector = selector
          newContext = context

          if (
            nodeType === 1 &&
            (rdescend.test(selector) || rleadingCombinator.test(selector))
          ) {
            newContext =
              (rsibling.test(selector) && testContext(context.parentNode)) ||
              context

            if (newContext != context || isIE) {
              if ((nid = context.getAttribute('id'))) {
                nid = jQuery.escapeSelector(nid)
              } else {
                context.setAttribute('id', (nid = jQuery.expando))
              }
            }

            groups = tokenize(selector)
            i = groups.length
            while (i--) {
              groups[i] =
                (nid ? '#' + nid : ':scope') + ' ' + toSelector(groups[i])
            }
            newSelector = groups.join(',')
          }

          try {
            push.apply(results, newContext.querySelectorAll(newSelector))
            return results
          } catch (qsaError) {
            nonnativeSelectorCache(selector, true)
          } finally {
            if (nid === jQuery.expando) {
              context.removeAttribute('id')
            }
          }
        }
      }
    }

    return select(selector.replace(rtrimCSS, '$1'), context, results, seed)
  }

  function markFunction(fn) {
    fn[jQuery.expando] = true
    return fn
  }

  function createInputPseudo(type) {
    return function (elem) {
      return nodeName(elem, 'input') && elem.type === type
    }
  }

  function createButtonPseudo(type) {
    return function (elem) {
      return (
        (nodeName(elem, 'input') || nodeName(elem, 'button')) &&
        elem.type === type
      )
    }
  }

  function createDisabledPseudo(disabled) {
    return function (elem) {
      if ('form' in elem) {
        if (elem.parentNode && elem.disabled === false) {
          if ('label' in elem) {
            if ('label' in elem.parentNode) {
              return elem.parentNode.disabled === disabled
            } else {
              return elem.disabled === disabled
            }
          }

          return (
            elem.isDisabled === disabled ||
            (elem.isDisabled !== !disabled &&
              inDisabledFieldset(elem) === disabled)
          )
        }

        return elem.disabled === disabled
      } else if ('label' in elem) {
        return elem.disabled === disabled
      }

      return false
    }
  }

  function createPositionalPseudo(fn) {
    return markFunction(function (argument) {
      argument = +argument
      return markFunction(function (seed, matches) {
        var j,
          matchIndexes = fn([], seed.length, argument),
          i = matchIndexes.length

        while (i--) {
          if (seed[(j = matchIndexes[i])]) {
            seed[j] = !(matches[j] = seed[j])
          }
        }
      })
    })
  }

  function setDocument(node) {
    var subWindow,
      doc = node ? node.ownerDocument || node : document$1

    if (doc == document || doc.nodeType !== 9) {
      return
    }

    document = doc
    documentElement = document.documentElement
    documentIsHTML = !jQuery.isXMLDoc(document)

    if (
      isIE &&
      document$1 != document &&
      (subWindow = document.defaultView) &&
      subWindow.top !== subWindow
    ) {
      subWindow.addEventListener('unload', unloadHandler)
    }
  }

  find.matches = function (expr, elements) {
    return find(expr, null, null, elements)
  }

  find.matchesSelector = function (elem, expr) {
    setDocument(elem)

    if (
      documentIsHTML &&
      !nonnativeSelectorCache[expr + ' '] &&
      (!rbuggyQSA || !rbuggyQSA.test(expr))
    ) {
      try {
        return matches.call(elem, expr)
      } catch (e) {
        nonnativeSelectorCache(expr, true)
      }
    }

    return find(expr, document, null, [elem]).length > 0
  }

  jQuery.expr = {
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    find: {
      ID: function (id, context) {
        if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
          var elem = context.getElementById(id)
          return elem ? [elem] : []
        }
      },

      TAG: function (tag, context) {
        if (typeof context.getElementsByTagName !== 'undefined') {
          return context.getElementsByTagName(tag)
        } else {
          return context.querySelectorAll(tag)
        }
      },

      CLASS: function (className, context) {
        if (
          typeof context.getElementsByClassName !== 'undefined' &&
          documentIsHTML
        ) {
          return context.getElementsByClassName(className)
        }
      },
    },

    relative: {
      '>': { dir: 'parentNode', first: true },
      ' ': { dir: 'parentNode' },
      '+': { dir: 'previousSibling', first: true },
      '~': { dir: 'previousSibling' },
    },

    preFilter: preFilter,

    filter: {
      ID: function (id) {
        var attrId = unescapeSelector(id)
        return function (elem) {
          return elem.getAttribute('id') === attrId
        }
      },

      TAG: function (nodeNameSelector) {
        var expectedNodeName = unescapeSelector(nodeNameSelector).toLowerCase()
        return nodeNameSelector === '*'
          ? function () {
              return true
            }
          : function (elem) {
              return nodeName(elem, expectedNodeName)
            }
      },

      CLASS: function (className) {
        var pattern = classCache[className + ' ']

        return (
          pattern ||
          ((pattern = new RegExp(
            '(^|' + whitespace + ')' + className + '(' + whitespace + '|$)',
          )) &&
            classCache(className, function (elem) {
              return pattern.test(
                (typeof elem.className === 'string' && elem.className) ||
                  (typeof elem.getAttribute !== 'undefined' &&
                    elem.getAttribute('class')) ||
                  '',
              )
            }))
        )
      },

      ATTR: function (name, operator, check) {
        return function (elem) {
          var result = jQuery.attr(elem, name)

          if (result == null) {
            return operator === '!='
          }
          if (!operator) {
            return true
          }

          result += ''

          if (operator === '=') {
            return result === check
          }
          if (operator === '!=') {
            return result !== check
          }
          if (operator === '^=') {
            return check && result.indexOf(check) === 0
          }
          if (operator === '*=') {
            return check && result.indexOf(check) > -1
          }
          if (operator === '$=') {
            return check && result.slice(-check.length) === check
          }
          if (operator === '~=') {
            return (
              (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1
            )
          }
          if (operator === '|=') {
            return (
              result === check ||
              result.slice(0, check.length + 1) === check + '-'
            )
          }

          return false
        }
      },

      CHILD: function (type, what, _argument, first, last) {
        var simple = type.slice(0, 3) !== 'nth',
          forward = type.slice(-4) !== 'last',
          ofType = what === 'of-type'

        return first === 1 && last === 0
          ? function (elem) {
              return !!elem.parentNode
            }
          : function (elem, _context, xml) {
              var cache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? 'nextSibling' : 'previousSibling',
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false

              if (parent) {
                if (simple) {
                  while (dir) {
                    node = elem
                    while ((node = node[dir])) {
                      if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                        return false
                      }
                    }

                    start = dir = type === 'only' && !start && 'nextSibling'
                  }
                  return true
                }

                start = [forward ? parent.firstChild : parent.lastChild]

                if (forward && useCache) {
                  outerCache =
                    parent[jQuery.expando] || (parent[jQuery.expando] = {})
                  cache = outerCache[type] || []
                  nodeIndex = cache[0] === dirruns && cache[1]
                  diff = nodeIndex && cache[2]
                  node = nodeIndex && parent.childNodes[nodeIndex]

                  while (
                    (node =
                      (++nodeIndex && node && node[dir]) ||
                      (diff = nodeIndex = 0) ||
                      start.pop())
                  ) {
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      outerCache[type] = [dirruns, nodeIndex, diff]
                      break
                    }
                  }
                } else {
                  if (useCache) {
                    outerCache =
                      elem[jQuery.expando] || (elem[jQuery.expando] = {})
                    cache = outerCache[type] || []
                    nodeIndex = cache[0] === dirruns && cache[1]
                    diff = nodeIndex
                  }

                  if (diff === false) {
                    while (
                      (node =
                        (++nodeIndex && node && node[dir]) ||
                        (diff = nodeIndex = 0) ||
                        start.pop())
                    ) {
                      if (
                        (ofType ? nodeName(node, name) : node.nodeType === 1) &&
                        ++diff
                      ) {
                        if (useCache) {
                          outerCache =
                            node[jQuery.expando] || (node[jQuery.expando] = {})
                          outerCache[type] = [dirruns, diff]
                        }

                        if (node === elem) {
                          break
                        }
                      }
                    }
                  }
                }

                diff -= last
                return (
                  diff === first || (diff % first === 0 && diff / first >= 0)
                )
              }
            }
      },

      PSEUDO: function (pseudo, argument) {
        var fn =
          jQuery.expr.pseudos[pseudo] ||
          jQuery.expr.setFilters[pseudo.toLowerCase()] ||
          selectorError('unsupported pseudo: ' + pseudo)

        if (fn[jQuery.expando]) {
          return fn(argument)
        }

        return fn
      },
    },

    pseudos: {
      not: markFunction(function (selector) {
        var input = [],
          results = [],
          matcher = compile(selector.replace(rtrimCSS, '$1'))

        return matcher[jQuery.expando]
          ? markFunction(function (seed, matches, _context, xml) {
              var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length

              while (i--) {
                if ((elem = unmatched[i])) {
                  seed[i] = !(matches[i] = elem)
                }
              }
            })
          : function (elem, _context, xml) {
              input[0] = elem
              matcher(input, null, xml, results)

              input[0] = null
              return !results.pop()
            }
      }),

      has: markFunction(function (selector) {
        return function (elem) {
          return find(selector, elem).length > 0
        }
      }),

      contains: markFunction(function (text) {
        text = unescapeSelector(text)
        return function (elem) {
          return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1
        }
      }),

      lang: markFunction(function (lang) {
        if (!ridentifier.test(lang || '')) {
          selectorError('unsupported lang: ' + lang)
        }
        lang = unescapeSelector(lang).toLowerCase()
        return function (elem) {
          var elemLang
          do {
            if (
              (elemLang = documentIsHTML
                ? elem.lang
                : elem.getAttribute('xml:lang') || elem.getAttribute('lang'))
            ) {
              elemLang = elemLang.toLowerCase()
              return elemLang === lang || elemLang.indexOf(lang + '-') === 0
            }
          } while ((elem = elem.parentNode) && elem.nodeType === 1)
          return false
        }
      }),

      target: function (elem) {
        var hash = window.location && window.location.hash
        return hash && hash.slice(1) === elem.id
      },

      root: function (elem) {
        return elem === documentElement
      },

      focus: function (elem) {
        return (
          elem === document.activeElement &&
          document.hasFocus() &&
          !!(elem.type || elem.href || ~elem.tabIndex)
        )
      },

      enabled: createDisabledPseudo(false),
      disabled: createDisabledPseudo(true),

      checked: function (elem) {
        return (
          (nodeName(elem, 'input') && !!elem.checked) ||
          (nodeName(elem, 'option') && !!elem.selected)
        )
      },

      selected: function (elem) {
        if (isIE && elem.parentNode) {
          elem.parentNode.selectedIndex
        }

        return elem.selected === true
      },

      empty: function (elem) {
        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
          if (elem.nodeType < 6) {
            return false
          }
        }
        return true
      },

      parent: function (elem) {
        return !jQuery.expr.pseudos.empty(elem)
      },

      header: function (elem) {
        return rheader.test(elem.nodeName)
      },

      input: function (elem) {
        return rinputs.test(elem.nodeName)
      },

      button: function (elem) {
        return (
          (nodeName(elem, 'input') && elem.type === 'button') ||
          nodeName(elem, 'button')
        )
      },

      text: function (elem) {
        return nodeName(elem, 'input') && elem.type === 'text'
      },

      first: createPositionalPseudo(function () {
        return [0]
      }),

      last: createPositionalPseudo(function (_matchIndexes, length) {
        return [length - 1]
      }),

      eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
        return [argument < 0 ? argument + length : argument]
      }),

      even: createPositionalPseudo(function (matchIndexes, length) {
        var i = 0
        for (; i < length; i += 2) {
          matchIndexes.push(i)
        }
        return matchIndexes
      }),

      odd: createPositionalPseudo(function (matchIndexes, length) {
        var i = 1
        for (; i < length; i += 2) {
          matchIndexes.push(i)
        }
        return matchIndexes
      }),

      lt: createPositionalPseudo(function (matchIndexes, length, argument) {
        var i

        if (argument < 0) {
          i = argument + length
        } else if (argument > length) {
          i = length
        } else {
          i = argument
        }

        for (; --i >= 0; ) {
          matchIndexes.push(i)
        }
        return matchIndexes
      }),

      gt: createPositionalPseudo(function (matchIndexes, length, argument) {
        var i = argument < 0 ? argument + length : argument
        for (; ++i < length; ) {
          matchIndexes.push(i)
        }
        return matchIndexes
      }),
    },
  }

  jQuery.expr.pseudos.nth = jQuery.expr.pseudos.eq

  for (i in {
    radio: true,
    checkbox: true,
    file: true,
    password: true,
    image: true,
  }) {
    jQuery.expr.pseudos[i] = createInputPseudo(i)
  }
  for (i in { submit: true, reset: true }) {
    jQuery.expr.pseudos[i] = createButtonPseudo(i)
  }

  function setFilters() {}
  setFilters.prototype = jQuery.expr.filters = jQuery.expr.pseudos
  jQuery.expr.setFilters = new setFilters()

  function addCombinator(matcher, combinator, base) {
    var dir = combinator.dir,
      skip = combinator.next,
      key = skip || dir,
      checkNonElements = base && key === 'parentNode',
      doneName = done++

    return combinator.first
      ? function (elem, context, xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml)
            }
          }
          return false
        }
      : function (elem, context, xml) {
          var oldCache,
            outerCache,
            newCache = [dirruns, doneName]

          if (xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true
                }
              }
            }
          } else {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[jQuery.expando] || (elem[jQuery.expando] = {})

                if (skip && nodeName(elem, skip)) {
                  elem = elem[dir] || elem
                } else if (
                  (oldCache = outerCache[key]) &&
                  oldCache[0] === dirruns &&
                  oldCache[1] === doneName
                ) {
                  return (newCache[2] = oldCache[2])
                } else {
                  outerCache[key] = newCache

                  if ((newCache[2] = matcher(elem, context, xml))) {
                    return true
                  }
                }
              }
            }
          }
          return false
        }
  }

  function elementMatcher(matchers) {
    return matchers.length > 1
      ? function (elem, context, xml) {
          var i = matchers.length
          while (i--) {
            if (!matchers[i](elem, context, xml)) {
              return false
            }
          }
          return true
        }
      : matchers[0]
  }

  function multipleContexts(selector, contexts, results) {
    var i = 0,
      len = contexts.length
    for (; i < len; i++) {
      find(selector, contexts[i], results)
    }
    return results
  }

  function condense(unmatched, map, filter, context, xml) {
    var elem,
      newUnmatched = [],
      i = 0,
      len = unmatched.length,
      mapped = map != null

    for (; i < len; i++) {
      if ((elem = unmatched[i])) {
        if (!filter || filter(elem, context, xml)) {
          newUnmatched.push(elem)
          if (mapped) {
            map.push(i)
          }
        }
      }
    }

    return newUnmatched
  }

  function setMatcher(
    preFilter,
    selector,
    matcher,
    postFilter,
    postFinder,
    postSelector,
  ) {
    if (postFilter && !postFilter[jQuery.expando]) {
      postFilter = setMatcher(postFilter)
    }
    if (postFinder && !postFinder[jQuery.expando]) {
      postFinder = setMatcher(postFinder, postSelector)
    }
    return markFunction(function (seed, results, context, xml) {
      var temp,
        i,
        elem,
        matcherOut,
        preMap = [],
        postMap = [],
        preexisting = results.length,
        elems =
          seed ||
          multipleContexts(
            selector || '*',
            context.nodeType ? [context] : context,
            [],
          ),
        matcherIn =
          preFilter && (seed || !selector)
            ? condense(elems, preMap, preFilter, context, xml)
            : elems

      if (matcher) {
        matcherOut =
          postFinder || (seed ? preFilter : preexisting || postFilter)
            ? []
            : results

        matcher(matcherIn, matcherOut, context, xml)
      } else {
        matcherOut = matcherIn
      }

      if (postFilter) {
        temp = condense(matcherOut, postMap)
        postFilter(temp, [], context, xml)

        i = temp.length
        while (i--) {
          if ((elem = temp[i])) {
            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
          }
        }
      }

      if (seed) {
        if (postFinder || preFilter) {
          if (postFinder) {
            temp = []
            i = matcherOut.length
            while (i--) {
              if ((elem = matcherOut[i])) {
                temp.push((matcherIn[i] = elem))
              }
            }
            postFinder(null, (matcherOut = []), temp, xml)
          }

          i = matcherOut.length
          while (i--) {
            if (
              (elem = matcherOut[i]) &&
              (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1
            ) {
              seed[temp] = !(results[temp] = elem)
            }
          }
        }
      } else {
        matcherOut = condense(
          matcherOut === results
            ? matcherOut.splice(preexisting, matcherOut.length)
            : matcherOut,
        )
        if (postFinder) {
          postFinder(null, results, matcherOut, xml)
        } else {
          push.apply(results, matcherOut)
        }
      }
    })
  }

  function matcherFromTokens(tokens) {
    var checkContext,
      matcher,
      j,
      len = tokens.length,
      leadingRelative = jQuery.expr.relative[tokens[0].type],
      implicitRelative = leadingRelative || jQuery.expr.relative[' '],
      i = leadingRelative ? 1 : 0,
      matchContext = addCombinator(
        function (elem) {
          return elem === checkContext
        },
        implicitRelative,
        true,
      ),
      matchAnyContext = addCombinator(
        function (elem) {
          return indexOf.call(checkContext, elem) > -1
        },
        implicitRelative,
        true,
      ),
      matchers = [
        function (elem, context, xml) {
          var ret =
            (!leadingRelative && (xml || context != outermostContext)) ||
            ((checkContext = context).nodeType
              ? matchContext(elem, context, xml)
              : matchAnyContext(elem, context, xml))

          checkContext = null
          return ret
        },
      ]

    for (; i < len; i++) {
      if ((matcher = jQuery.expr.relative[tokens[i].type])) {
        matchers = [addCombinator(elementMatcher(matchers), matcher)]
      } else {
        matcher = jQuery.expr.filter[tokens[i].type].apply(
          null,
          tokens[i].matches,
        )

        if (matcher[jQuery.expando]) {
          j = ++i
          for (; j < len; j++) {
            if (jQuery.expr.relative[tokens[j].type]) {
              break
            }
          }
          return setMatcher(
            i > 1 && elementMatcher(matchers),
            i > 1 &&
              toSelector(
                tokens
                  .slice(0, i - 1)
                  .concat({ value: tokens[i - 2].type === ' ' ? '*' : '' }),
              ).replace(rtrimCSS, '$1'),
            matcher,
            i < j && matcherFromTokens(tokens.slice(i, j)),
            j < len && matcherFromTokens((tokens = tokens.slice(j))),
            j < len && toSelector(tokens),
          )
        }
        matchers.push(matcher)
      }
    }

    return elementMatcher(matchers)
  }

  function matcherFromGroupMatchers(elementMatchers, setMatchers) {
    var bySet = setMatchers.length > 0,
      byElement = elementMatchers.length > 0,
      superMatcher = function (seed, context, xml, results, outermost) {
        var elem,
          j,
          matcher,
          matchedCount = 0,
          i = '0',
          unmatched = seed && [],
          setMatched = [],
          contextBackup = outermostContext,
          elems = seed || (byElement && jQuery.expr.find.TAG('*', outermost)),
          dirrunsUnique = (dirruns +=
            contextBackup == null ? 1 : Math.random() || 0.1)

        if (outermost) {
          outermostContext = context == document || context || outermost
        }

        for (; (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0

            if (!context && elem.ownerDocument != document) {
              setDocument(elem)
              xml = !documentIsHTML
            }
            while ((matcher = elementMatchers[j++])) {
              if (matcher(elem, context || document, xml)) {
                push.call(results, elem)
                break
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique
            }
          }

          if (bySet) {
            if ((elem = !matcher && elem)) {
              matchedCount--
            }

            if (seed) {
              unmatched.push(elem)
            }
          }
        }

        matchedCount += i

        if (bySet && i !== matchedCount) {
          j = 0
          while ((matcher = setMatchers[j++])) {
            matcher(unmatched, setMatched, context, xml)
          }

          if (seed) {
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results)
                }
              }
            }

            setMatched = condense(setMatched)
          }

          push.apply(results, setMatched)

          if (
            outermost &&
            !seed &&
            setMatched.length > 0 &&
            matchedCount + setMatchers.length > 1
          ) {
            jQuery.uniqueSort(results)
          }
        }

        if (outermost) {
          dirruns = dirrunsUnique
          outermostContext = contextBackup
        }

        return unmatched
      }

    return bySet ? markFunction(superMatcher) : superMatcher
  }

  function compile(selector, match) {
    var i,
      setMatchers = [],
      elementMatchers = [],
      cached = compilerCache[selector + ' ']

    if (!cached) {
      if (!match) {
        match = tokenize(selector)
      }
      i = match.length
      while (i--) {
        cached = matcherFromTokens(match[i])
        if (cached[jQuery.expando]) {
          setMatchers.push(cached)
        } else {
          elementMatchers.push(cached)
        }
      }

      cached = compilerCache(
        selector,
        matcherFromGroupMatchers(elementMatchers, setMatchers),
      )

      cached.selector = selector
    }
    return cached
  }

  function select(selector, context, results, seed) {
    var i,
      tokens,
      token,
      type,
      find,
      compiled = typeof selector === 'function' && selector,
      match = !seed && tokenize((selector = compiled.selector || selector))

    results = results || []

    if (match.length === 1) {
      tokens = match[0] = match[0].slice(0)
      if (
        tokens.length > 2 &&
        (token = tokens[0]).type === 'ID' &&
        context.nodeType === 9 &&
        documentIsHTML &&
        jQuery.expr.relative[tokens[1].type]
      ) {
        context = (jQuery.expr.find.ID(
          unescapeSelector(token.matches[0]),
          context,
        ) || [])[0]
        if (!context) {
          return results
        } else if (compiled) {
          context = context.parentNode
        }

        selector = selector.slice(tokens.shift().value.length)
      }

      i = matchExpr.needsContext.test(selector) ? 0 : tokens.length
      while (i--) {
        token = tokens[i]

        if (jQuery.expr.relative[(type = token.type)]) {
          break
        }
        if ((find = jQuery.expr.find[type])) {
          if (
            (seed = find(
              unescapeSelector(token.matches[0]),
              (rsibling.test(tokens[0].type) &&
                testContext(context.parentNode)) ||
                context,
            ))
          ) {
            tokens.splice(i, 1)
            selector = seed.length && toSelector(tokens)
            if (!selector) {
              push.apply(results, seed)
              return results
            }

            break
          }
        }
      }
    }

    ;(compiled || compile(selector, match))(
      seed,
      context,
      !documentIsHTML,
      results,
      !context ||
        (rsibling.test(selector) && testContext(context.parentNode)) ||
        context,
    )
    return results
  }

  setDocument()

  jQuery.find = find

  find.compile = compile
  find.select = select
  find.setDocument = setDocument
  find.tokenize = tokenize

  var rneedsContext = jQuery.expr.match.needsContext

  function winnow(elements, qualifier, not) {
    if (typeof qualifier === 'function') {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }

    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not
      })
    }

    if (typeof qualifier !== 'string') {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not
      })
    }

    return jQuery.filter(qualifier, elements, not)
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0]

    if (not) {
      expr = ':not(' + expr + ')'
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : []
    }

    return jQuery.find.matches(
      expr,
      jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1
      }),
    )
  }

  jQuery.fn.extend({
    find: function (selector) {
      var i,
        ret,
        len = this.length,
        self = this

      if (typeof selector !== 'string') {
        return this.pushStack(
          jQuery(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true
              }
            }
          }),
        )
      }

      ret = this.pushStack([])

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret)
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    is: function (selector) {
      return !!winnow(
        this,

        typeof selector === 'string' && rneedsContext.test(selector)
          ? jQuery(selector)
          : selector || [],
        false,
      ).length
    },
  })

  var rootjQuery,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = (jQuery.fn.init = function (selector, context) {
      var match, elem

      if (!selector) {
        return this
      }

      if (selector.nodeType) {
        this[0] = selector
        this.length = 1
        return this
      } else if (typeof selector === 'function') {
        return rootjQuery.ready !== undefined
          ? rootjQuery.ready(selector)
          : selector(jQuery)
      } else {
        match = selector + ''
        if (isObviousHtml(match)) {
          // Assume that strings that start and end with <> are HTML and skip
          // the regex check. This also handles browser-supported HTML wrappers
          // like TrustedHTML.
          match = [null, selector, null]

          // Handle HTML strings or selectors
        } else if (typeof selector === 'string') {
          match = rquickExpr.exec(selector)
        } else {
          return jQuery.makeArray(selector, this)
        }

        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context

            jQuery.merge(
              this,
              jQuery.parseHTML(
                match[1],
                context && context.nodeType
                  ? context.ownerDocument || context
                  : document$1,
                true,
              ),
            )

            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (typeof this[match] === 'function') {
                  this[match](context[match])
                } else {
                  this.attr(match, context[match])
                }
              }
            }

            return this
          } else {
            elem = document$1.getElementById(match[2])

            if (elem) {
              this[0] = elem
              this.length = 1
            }
            return this
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector)
        } else {
          return this.constructor(context).find(selector)
        }
      }
    })

  init.prototype = jQuery.fn

  rootjQuery = jQuery(document$1)

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/

  function returnTrue() {
    return true
  }

  function returnFalse() {
    return false
  }

  function on(elem, types, selector, data, fn, one) {
    var origFn, type

    if (typeof types === 'object') {
      if (typeof selector !== 'string') {
        data = data || selector
        selector = undefined
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one)
      }
      return elem
    }

    if (data == null && fn == null) {
      fn = selector
      data = selector = undefined
    } else if (fn == null) {
      if (typeof selector === 'string') {
        fn = data
        data = undefined
      } else {
        fn = data
        data = selector
        selector = undefined
      }
    }
    if (fn === false) {
      fn = returnFalse
    } else if (!fn) {
      return elem
    }

    if (one === 1) {
      origFn = fn
      fn = function (event) {
        jQuery().off(event)
        return origFn.apply(this, arguments)
      }

      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector)
    })
  }

  jQuery.event = {
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
        eventHandle,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.get(elem)

      if (!acceptData(elem)) {
        return
      }

      if (handler.handler) {
        handleObjIn = handler
        handler = handleObjIn.handler
        selector = handleObjIn.selector
      }

      if (selector) {
        jQuery.find.matchesSelector(documentElement$1, selector)
      }

      if (!handler.guid) {
        handler.guid = jQuery.guid++
      }

      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null)
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== 'undefined' &&
            jQuery.event.triggered !== e.type
            ? jQuery.event.dispatch.apply(elem, arguments)
            : undefined
        }
      }

      types = (types || '').match(rnothtmlwhite) || ['']
      t = types.length
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || []
        type = origType = tmp[1]
        namespaces = (tmp[2] || '').split('.').sort()

        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue
        }

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {}

        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type

        // Update special based on newly reset type
        special = jQuery.event.special[type] || {}

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend(
          {
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext:
              selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join('.'),
          },
          handleObjIn,
        )

        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = []
          handlers.delegateCount = 0

          // Only use addEventListener if the special events handler returns false
          if (
            !special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false
          ) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle)
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj)

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid
          }
        }

        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj)
        } else {
          handlers.push(handleObj)
        }
      }
    },

    // Detach an event or set of events from an element
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
        origCount,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.hasData(elem) && dataPriv.get(elem)

      if (!elemData || !(events = elemData.events)) {
        return
      }

      // Once for each type.namespace in types; type may be omitted
      types = (types || '').match(rnothtmlwhite) || ['']
      t = types.length
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || []
        type = origType = tmp[1]
        namespaces = (tmp[2] || '').split('.').sort()

        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true)
          }
          continue
        }

        special = jQuery.event.special[type] || {}
        type = (selector ? special.delegateType : special.bindType) || type
        handlers = events[type] || []
        tmp =
          tmp[2] &&
          new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')

        // Remove matching events
        origCount = j = handlers.length
        while (j--) {
          handleObj = handlers[j]

          if (
            (mappedTypes || origType === handleObj.origType) &&
            (!handler || handler.guid === handleObj.guid) &&
            (!tmp || tmp.test(handleObj.namespace)) &&
            (!selector ||
              selector === handleObj.selector ||
              (selector === '**' && handleObj.selector))
          ) {
            handlers.splice(j, 1)

            if (handleObj.selector) {
              handlers.delegateCount--
            }
            if (special.remove) {
              special.remove.call(elem, handleObj)
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (
            !special.teardown ||
            special.teardown.call(elem, namespaces, elemData.handle) === false
          ) {
            jQuery.removeEvent(elem, type, elemData.handle)
          }

          delete events[type]
        }
      }

      // Remove data and the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, 'handle events')
      }
    },

    dispatch: function (nativeEvent) {
      var i,
        j,
        ret,
        matched,
        handleObj,
        handlerQueue,
        args = new Array(arguments.length),
        event = jQuery.event.fix(nativeEvent),
        handlers =
          (dataPriv.get(this, 'events') || Object.create(null))[event.type] ||
          [],
        special = jQuery.event.special[event.type] || {}

      args[0] = event

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      event.delegateTarget = this

      if (
        special.preDispatch &&
        special.preDispatch.call(this, event) === false
      ) {
        return
      }

      handlerQueue = jQuery.event.handlers.call(this, event, handlers)

      i = 0
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem

        j = 0
        while (
          (handleObj = matched.handlers[j++]) &&
          !event.isImmediatePropagationStopped()
        ) {
          if (
            !event.rnamespace ||
            handleObj.namespace === false ||
            event.rnamespace.test(handleObj.namespace)
          ) {
            event.handleObj = handleObj
            event.data = handleObj.data

            ret = (
              (jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler
            ).apply(matched.elem, args)

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault()
                event.stopPropagation()
              }
            }
          }
        }
      }

      if (special.postDispatch) {
        special.postDispatch.call(this, event)
      }

      return event.result
    },

    handlers: function (event, handlers) {
      var i,
        handleObj,
        sel,
        matchedHandlers,
        matchedSelectors,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target

      if (delegateCount && !(event.type === 'click' && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (
            cur.nodeType === 1 &&
            !(event.type === 'click' && cur.disabled === true)
          ) {
            matchedHandlers = []
            matchedSelectors = {}
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i]

              sel = handleObj.selector + ' '

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext
                  ? jQuery(sel, this).index(cur) > -1
                  : jQuery.find(sel, this, null, [cur]).length
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj)
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({ elem: cur, handlers: matchedHandlers })
            }
          }
        }
      }

      cur = this
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount),
        })
      }

      return handlerQueue
    },

    addProp: function (name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,

        get:
          typeof hook === 'function'
            ? function () {
                if (this.originalEvent) {
                  return hook(this.originalEvent)
                }
              }
            : function () {
                if (this.originalEvent) {
                  return this.originalEvent[name]
                }
              },

        set: function (value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value,
          })
        },
      })
    },

    fix: function (originalEvent) {
      return originalEvent[jQuery.expando]
        ? originalEvent
        : new jQuery.Event(originalEvent)
    },

    special: jQuery.extend(Object.create(null), {
      load: {
        noBubble: true,
      },
      click: {
        setup: function (data) {
          var el = this || data

          if (
            rcheckableType.test(el.type) &&
            el.click &&
            nodeName(el, 'input')
          ) {
            leverageNative(el, 'click', true)
          }

          return false
        },
        trigger: function (data) {
          var el = this || data

          if (
            rcheckableType.test(el.type) &&
            el.click &&
            nodeName(el, 'input')
          ) {
            leverageNative(el, 'click')
          }

          return true
        },

        _default: function (event) {
          var target = event.target
          return (
            (rcheckableType.test(target.type) &&
              target.click &&
              nodeName(target, 'input') &&
              dataPriv.get(target, 'click')) ||
            nodeName(target, 'a')
          )
        },
      },

      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result
          }
        },
      },
    }),
  }

  function leverageNative(el, type, isSetup) {
    if (!isSetup) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue)
      }
      return
    }

    dataPriv.set(el, type, false)
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function (event) {
        var result,
          saved = dataPriv.get(this, type)

        if (event.isTrigger & 1 && this[type]) {
          if (!saved.length) {
            saved = slice.call(arguments)
            dataPriv.set(this, type, saved)

            this[type]()
            result = dataPriv.get(this, type)
            dataPriv.set(this, type, false)

            if (saved !== result) {
              event.stopImmediatePropagation()
              event.preventDefault()

              return result && result.value
            }
          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation()
          }
        } else if (saved.length) {
          dataPriv.set(this, type, {
            value: jQuery.event.trigger(saved[0], saved.slice(1), this),
          })

          event.stopPropagation()
          event.isImmediatePropagationStopped = returnTrue
        }
      },
    })
  }

  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle)
    }
  }

  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props)
    }

    if (src && src.type) {
      this.originalEvent = src
      this.type = src.type

      this.isDefaultPrevented = src.defaultPrevented ? returnTrue : returnFalse

      this.target = src.target
      this.currentTarget = src.currentTarget
      this.relatedTarget = src.relatedTarget
    } else {
      this.type = src
    }

    if (props) {
      jQuery.extend(this, props)
    }

    this.timeStamp = (src && src.timeStamp) || Date.now()

    this[jQuery.expando] = true
  }

  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,

    preventDefault: function () {
      var e = this.originalEvent

      this.isDefaultPrevented = returnTrue

      if (e && !this.isSimulated) {
        e.preventDefault()
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent

      this.isPropagationStopped = returnTrue

      if (e && !this.isSimulated) {
        e.stopPropagation()
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent

      this.isImmediatePropagationStopped = returnTrue

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation()
      }

      this.stopPropagation()
    },
  }

  jQuery.each(
    {
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      char: true,
      code: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: true,
    },
    jQuery.event.addProp,
  )

  jQuery.each(
    { focus: 'focusin', blur: 'focusout' },
    function (type, delegateType) {
      function focusMappedHandler(nativeEvent) {
        var event = jQuery.event.fix(nativeEvent)
        event.type = nativeEvent.type === 'focusin' ? 'focus' : 'blur'
        event.isSimulated = true

        if (event.target === event.currentTarget) {
          dataPriv.get(this, 'handle')(event)
        }
      }

      jQuery.event.special[type] = {
        setup: function () {
          leverageNative(this, type, true)

          if (isIE) {
            this.addEventListener(delegateType, focusMappedHandler)
          } else {
            return false
          }
        },
        trigger: function () {
          leverageNative(this, type)

          return true
        },

        teardown: function () {
          if (isIE) {
            this.removeEventListener(delegateType, focusMappedHandler)
          } else {
            return false
          }
        },

        _default: function (event) {
          return dataPriv.get(event.target, type)
        },

        delegateType: delegateType,
      }
    },
  )

  jQuery.each(
    {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout',
      pointerenter: 'pointerover',
      pointerleave: 'pointerout',
    },
    function (orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,

        handle: function (event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj

          if (
            !related ||
            (related !== target && !jQuery.contains(target, related))
          ) {
            event.type = handleObj.origType
            ret = handleObj.handler.apply(this, arguments)
            event.type = fix
          }
          return ret
        },
      }
    },
  )

  jQuery.fn.extend({
    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn)
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1)
    },
    off: function (types, selector, fn) {
      var handleObj, type
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj
        jQuery(types.delegateTarget).off(
          handleObj.namespace
            ? handleObj.origType + '.' + handleObj.namespace
            : handleObj.origType,
          handleObj.selector,
          handleObj.handler,
        )
        return this
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type])
        }
        return this
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector
        selector = undefined
      }
      if (fn === false) {
        fn = returnFalse
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector)
      })
    },
  })

  return jQuery
}

var jQuery = jQueryFactory(window, true)

export { jQuery, jQuery as $ }

export default jQuery
