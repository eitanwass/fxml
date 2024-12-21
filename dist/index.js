"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/stream.js"(exports2, module2) {
    module2.exports = require("stream");
  }
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports2, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res2 = prim.call(input, hint || "default");
        if (typeof res2 !== "object") return res2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = require("buffer");
    var Buffer2 = _require.Buffer;
    var _require2 = require("util");
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    module2.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) ret += s + p.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports2, module2) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose) return;
      if (self2._readableState && !self2._readableState.emitClose) return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
      else stream.emit("error", err);
    }
    module2.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/readable-stream/errors.js
var require_errors = __commonJS({
  "node_modules/readable-stream/errors.js"(exports2, module2) {
    "use strict";
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      class NodeError extends Base {
        constructor(arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      let msg;
      if (endsWith(name, " argument")) {
        msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
      } else {
        const type = includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
      }
      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module2.exports.codes = codes;
  }
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/state.js"(exports2, module2) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module2.exports = {
      getHighWaterMark
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "node_modules/util-deprecate/node.js"(exports2, module2) {
    module2.exports = require("util").deprecate;
  }
});

// node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/readable-stream/lib/_stream_writable.js"(exports2, module2) {
    "use strict";
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_node()
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits()(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state.ending) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        process.nextTick(cb, er);
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending) endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/readable-stream/lib/_stream_duplex.js"(exports2, module2) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) keys2.push(key);
      return keys2;
    };
    module2.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended) return;
      process.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports2, module2) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable) onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module2.exports = eos;
  }
});

// node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports2, module2) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res2 = prim.call(input, hint || "default");
        if (typeof res2 !== "object") return res2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            process.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module2.exports = createReadableStreamAsyncIterator;
  }
});

// node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/from.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res2 = prim.call(input, hint || "default");
        if (typeof res2 !== "object") return res2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
    function from(Readable, iterable, opts) {
      var iterator;
      if (iterable && typeof iterable.next === "function") {
        iterator = iterable;
      } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
      else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
      else throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      var readable = new Readable(_objectSpread({
        objectMode: true
      }, opts));
      var reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      function next() {
        return _next2.apply(this, arguments);
      }
      function _next2() {
        _next2 = _asyncToGenerator(function* () {
          try {
            var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value, done = _yield$iterator$next.done;
            if (done) {
              readable.push(null);
            } else if (readable.push(yield value)) {
              next();
            } else {
              reading = false;
            }
          } catch (err) {
            readable.destroy(err);
          }
        });
        return _next2.apply(this, arguments);
      }
      return readable;
    }
    module2.exports = from;
  }
});

// node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/readable-stream/lib/_stream_readable.js"(exports2, module2) {
    "use strict";
    module2.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = require("util");
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "") this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res2 = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res2;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res2 = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res2;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res2 = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res2;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) ;
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
  }
});

// node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/readable-stream/lib/_stream_transform.js"(exports2, module2) {
    "use strict";
    module2.exports = Transform;
    var _require$codes = require_errors().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/readable-stream/lib/_stream_passthrough.js"(exports2, module2) {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports2, module2) {
    "use strict";
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err) throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0) eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length) return noop;
      if (typeof streams[streams.length - 1] !== "function") return noop;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module2.exports = pipeline;
  }
});

// node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "node_modules/readable-stream/readable.js"(exports2, module2) {
    var Stream = require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream.Readable;
      Object.assign(module2.exports, Stream);
      module2.exports.Stream = Stream;
    } else {
      exports2 = module2.exports = require_stream_readable();
      exports2.Stream = Stream || exports2;
      exports2.Readable = exports2;
      exports2.Writable = require_stream_writable();
      exports2.Duplex = require_stream_duplex();
      exports2.Transform = require_stream_transform();
      exports2.PassThrough = require_stream_passthrough();
      exports2.finished = require_end_of_stream();
      exports2.pipeline = require_pipeline();
    }
  }
});

// node_modules/through2/through2.js
var require_through2 = __commonJS({
  "node_modules/through2/through2.js"(exports2, module2) {
    var Transform = require_readable().Transform;
    var inherits = require_inherits();
    function DestroyableTransform(opts) {
      Transform.call(this, opts);
      this._destroyed = false;
    }
    inherits(DestroyableTransform, Transform);
    DestroyableTransform.prototype.destroy = function(err) {
      if (this._destroyed) return;
      this._destroyed = true;
      var self2 = this;
      process.nextTick(function() {
        if (err)
          self2.emit("error", err);
        self2.emit("close");
      });
    };
    function noop(chunk, enc, callback) {
      callback(null, chunk);
    }
    function through22(construct) {
      return function(options, transform, flush) {
        if (typeof options == "function") {
          flush = transform;
          transform = options;
          options = {};
        }
        if (typeof transform != "function")
          transform = noop;
        if (typeof flush != "function")
          flush = null;
        return construct(options, transform, flush);
      };
    }
    module2.exports = through22(function(options, transform, flush) {
      var t2 = new DestroyableTransform(options);
      t2._transform = transform;
      if (flush)
        t2._flush = flush;
      return t2;
    });
    module2.exports.ctor = through22(function(options, transform, flush) {
      function Through2(override) {
        if (!(this instanceof Through2))
          return new Through2(override);
        this.options = Object.assign({}, options, override);
        DestroyableTransform.call(this, this.options);
      }
      inherits(Through2, DestroyableTransform);
      Through2.prototype._transform = transform;
      if (flush)
        Through2.prototype._flush = flush;
      return Through2;
    });
    module2.exports.obj = through22(function(options, transform, flush) {
      var t2 = new DestroyableTransform(Object.assign({ objectMode: true, highWaterMark: 16 }, options));
      t2._transform = transform;
      if (flush)
        t2._flush = flush;
      return t2;
    });
  }
});

// src/options.ts
var defaultFxmlOptions = {
  commentsTagName: "_comments",
  attributesTagName: "_attributes"
};

// src/fxml.ts
var tagNameEnders = "\r\n	>/= ";
var singleQuoteCC = "'".charCodeAt(0);
var doubleQuoteCC = '"'.charCodeAt(0);
var openCornerBrackerCC = "<".charCodeAt(0);
var closeCornerBrackerCC = ">".charCodeAt(0);
var slashCC = "/".charCodeAt(0);
var exclamationCC = "!".charCodeAt(0);
var parse = (text, options) => {
  options = Object.assign(defaultFxmlOptions, options ?? {});
  let pos = 0;
  let tagPath = [];
  const isTextChar = (charCode) => charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123;
  const upsertValueByPath = (obj, path, value) => {
    let o = obj;
    const lastPart = path.pop();
    if (lastPart === void 0) return obj;
    let part;
    for (part of path) {
      if (!(part in o)) o[part] = {};
      else if (typeof o[part] !== "object") throw new Error(`Unable to deep set in path of simple type ${obj} at ${path}`);
      o = o[part];
    }
    if (!(lastPart in o)) o[lastPart] = {};
    if (typeof o[lastPart] !== "object") throw new Error(`Unable to deep set in path of simple type ${obj} at ${path}`);
    if (typeof value === "object")
      o[lastPart] = {
        ...o[lastPart],
        ...value
      };
    else
      o[lastPart] = value;
    return obj;
  };
  const parseName = () => {
    let start = pos;
    while (text.length >= pos && tagNameEnders.indexOf(text[pos]) === -1) {
      pos++;
    }
    return text.slice(start, pos);
  };
  const parseFreeTextBody = () => {
    const start = pos;
    const end = text.indexOf("<", pos);
    if (end === -1) {
      pos = text.length + 1;
    } else {
      pos = end;
    }
    return text.slice(start, pos);
  };
  const parseQuotedString = () => {
    const quoteType = text[pos];
    const stringStartPos = pos + 1;
    pos = text.indexOf(quoteType, stringStartPos);
    return text.slice(stringStartPos, pos);
  };
  const parseTag = (parentTagName) => {
    let parsedXml = {};
    let parsedXmlLayers = [parsedXml];
    let tagPath2 = [];
    let curVal = void 0;
    while (text.length > pos) {
      if (text.charCodeAt(pos) === openCornerBrackerCC) {
        if (text.charCodeAt(pos + 1) === slashCC) {
          pos += 2;
          const tagName = parseName();
          const expectedCloseTagName = tagPath2.pop();
          if (expectedCloseTagName !== tagName) {
            throw new Error(`Closing tag "${tagName}" doesn't match opening tag "${expectedCloseTagName}"`);
          }
          parsedXmlLayers.pop();
        } else if (text.charCodeAt(pos + 1) === exclamationCC) {
        } else {
          pos++;
          const tagName = parseName();
          tagPath2.push(tagName);
          if (!(tagName in parsedXmlLayers[parsedXmlLayers.length - 1])) {
            parsedXmlLayers[parsedXmlLayers.length - 1][tagName] = {};
            parsedXmlLayers.push(parsedXmlLayers[parsedXmlLayers.length - 1][tagName]);
          } else {
            parsedXmlLayers[parsedXmlLayers.length - 1][tagName] = [
              parsedXmlLayers[parsedXmlLayers.length - 1][tagName],
              {}
            ];
            parsedXmlLayers.push(
              parsedXmlLayers[parsedXmlLayers.length - 1][tagName][parsedXmlLayers[parsedXmlLayers.length - 1][tagName].length - 1]
            );
          }
          let attributes = {};
          while (text.length >= pos && text.charCodeAt(pos) !== closeCornerBrackerCC) {
            let curCharCode = text.charCodeAt(pos);
            if (isTextChar(curCharCode)) {
              const attributeName = parseName();
              curCharCode = text.charCodeAt(pos);
              while (curCharCode && curCharCode !== singleQuoteCC && curCharCode !== doubleQuoteCC && !isTextChar(curCharCode) && curCharCode !== closeCornerBrackerCC) {
                pos++;
                curCharCode = text.charCodeAt(pos);
              }
              let attributeValue = null;
              if (curCharCode === singleQuoteCC || curCharCode === doubleQuoteCC) {
                attributeValue = parseQuotedString();
                if (pos === -1) {
                  throw new Error("No end for attribute value");
                }
              } else {
                pos--;
              }
              attributes[attributeName] = attributeValue;
            }
            pos++;
          }
          parsedXmlLayers[parsedXmlLayers.length - 1][options.attributesTagName] = attributes;
          if (text.charCodeAt(pos - 1) === slashCC) {
            const closedTag = tagPath2.pop();
            parsedXmlLayers.pop();
            pos++;
          }
        }
      } else if (tagNameEnders.indexOf(text[pos]) === -1) {
        const content = parseFreeTextBody().trim();
        parsedXmlLayers[parsedXmlLayers.length - 2][tagPath2[tagPath2.length - 1]] = content;
      } else {
        pos++;
      }
    }
    return parsedXml;
  };
  return parseTag("");
};

// node_modules/txml/dist/txml.mjs
function parse2(S, options) {
  "txml";
  options = options || {};
  var pos = options.pos || 0;
  var keepComments = !!options.keepComments;
  var keepWhitespace = !!options.keepWhitespace;
  var openBracket = "<";
  var openBracketCC = "<".charCodeAt(0);
  var closeBracket = ">";
  var closeBracketCC = ">".charCodeAt(0);
  var minusCC = "-".charCodeAt(0);
  var slashCC2 = "/".charCodeAt(0);
  var exclamationCC2 = "!".charCodeAt(0);
  var singleQuoteCC2 = "'".charCodeAt(0);
  var doubleQuoteCC2 = '"'.charCodeAt(0);
  var openCornerBracketCC = "[".charCodeAt(0);
  var closeCornerBracketCC = "]".charCodeAt(0);
  function parseChildren(tagName) {
    var children = [];
    while (S[pos]) {
      if (S.charCodeAt(pos) == openBracketCC) {
        if (S.charCodeAt(pos + 1) === slashCC2) {
          var closeStart = pos + 2;
          pos = S.indexOf(closeBracket, pos);
          var closeTag = S.substring(closeStart, pos);
          if (closeTag.indexOf(tagName) == -1) {
            var parsedText = S.substring(0, pos).split("\n");
            throw new Error(
              "Unexpected close tag\nLine: " + (parsedText.length - 1) + "\nColumn: " + (parsedText[parsedText.length - 1].length + 1) + "\nChar: " + S[pos]
            );
          }
          if (pos + 1) pos += 1;
          return children;
        } else if (S.charCodeAt(pos + 1) === exclamationCC2) {
          if (S.charCodeAt(pos + 2) == minusCC) {
            const startCommentPos = pos;
            while (pos !== -1 && !(S.charCodeAt(pos) === closeBracketCC && S.charCodeAt(pos - 1) == minusCC && S.charCodeAt(pos - 2) == minusCC && pos != -1)) {
              pos = S.indexOf(closeBracket, pos + 1);
            }
            if (pos === -1) {
              pos = S.length;
            }
            if (keepComments) {
              children.push(S.substring(startCommentPos, pos + 1));
            }
          } else if (S.charCodeAt(pos + 2) === openCornerBracketCC && S.charCodeAt(pos + 8) === openCornerBracketCC && S.substr(pos + 3, 5).toLowerCase() === "cdata") {
            var cdataEndIndex = S.indexOf("]]>", pos);
            if (cdataEndIndex == -1) {
              children.push(S.substr(pos + 9));
              pos = S.length;
            } else {
              children.push(S.substring(pos + 9, cdataEndIndex));
              pos = cdataEndIndex + 3;
            }
            continue;
          } else {
            const startDoctype = pos + 1;
            pos += 2;
            var encapsuled = false;
            while ((S.charCodeAt(pos) !== closeBracketCC || encapsuled === true) && S[pos]) {
              if (S.charCodeAt(pos) === openCornerBracketCC) {
                encapsuled = true;
              } else if (encapsuled === true && S.charCodeAt(pos) === closeCornerBracketCC) {
                encapsuled = false;
              }
              pos++;
            }
            children.push(S.substring(startDoctype, pos));
          }
          pos++;
          continue;
        }
        var node = parseNode();
        children.push(node);
        if (node.tagName[0] === "?") {
          children.push(...node.children);
          node.children = [];
        }
      } else {
        var text = parseText();
        if (keepWhitespace) {
          if (text.length > 0) {
            children.push(text);
          }
        } else {
          var trimmed = text.trim();
          if (trimmed.length > 0) {
            children.push(trimmed);
          }
        }
        pos++;
      }
    }
    return children;
  }
  function parseText() {
    var start = pos;
    pos = S.indexOf(openBracket, pos) - 1;
    if (pos === -2)
      pos = S.length;
    return S.slice(start, pos + 1);
  }
  var nameSpacer = "\r\n	>/= ";
  function parseName() {
    var start = pos;
    while (nameSpacer.indexOf(S[pos]) === -1 && S[pos]) {
      pos++;
    }
    return S.slice(start, pos);
  }
  var NoChildNodes = options.noChildNodes || ["img", "br", "input", "meta", "link", "hr"];
  function parseNode() {
    pos++;
    const tagName = parseName();
    const attributes = {};
    let children = [];
    while (S.charCodeAt(pos) !== closeBracketCC && S[pos]) {
      var c = S.charCodeAt(pos);
      if (c > 64 && c < 91 || c > 96 && c < 123) {
        var name = parseName();
        var code = S.charCodeAt(pos);
        while (code && code !== singleQuoteCC2 && code !== doubleQuoteCC2 && !(code > 64 && code < 91 || code > 96 && code < 123) && code !== closeBracketCC) {
          pos++;
          code = S.charCodeAt(pos);
        }
        if (code === singleQuoteCC2 || code === doubleQuoteCC2) {
          var value = parseString();
          if (pos === -1) {
            return {
              tagName,
              attributes,
              children
            };
          }
        } else {
          value = null;
          pos--;
        }
        attributes[name] = value;
      }
      pos++;
    }
    if (S.charCodeAt(pos - 1) !== slashCC2) {
      if (tagName == "script") {
        var start = pos + 1;
        pos = S.indexOf("</script>", pos);
        children = [S.slice(start, pos)];
        pos += 9;
      } else if (tagName == "style") {
        var start = pos + 1;
        pos = S.indexOf("</style>", pos);
        children = [S.slice(start, pos)];
        pos += 8;
      } else if (NoChildNodes.indexOf(tagName) === -1) {
        pos++;
        children = parseChildren(tagName);
      } else {
        pos++;
      }
    } else {
      pos++;
    }
    return {
      tagName,
      attributes,
      children
    };
  }
  function parseString() {
    var startChar = S[pos];
    var startpos = pos + 1;
    pos = S.indexOf(startChar, startpos);
    return S.slice(startpos, pos);
  }
  function findElements() {
    var r = new RegExp("\\s" + options.attrName + `\\s*=['"]` + options.attrValue + `['"]`).exec(S);
    if (r) {
      return r.index;
    } else {
      return -1;
    }
  }
  var out = null;
  if (options.attrValue !== void 0) {
    options.attrName = options.attrName || "id";
    var out = [];
    while ((pos = findElements()) !== -1) {
      pos = S.lastIndexOf("<", pos);
      if (pos !== -1) {
        out.push(parseNode());
      }
      S = S.substr(pos);
      pos = 0;
    }
  } else if (options.parseNode) {
    out = parseNode();
  } else {
    out = parseChildren("");
  }
  if (options.filter) {
    out = filter(out, options.filter);
  }
  if (options.simplify) {
    return simplify(Array.isArray(out) ? out : [out]);
  }
  if (options.setPos) {
    out.pos = pos;
  }
  return out;
}
function simplify(children) {
  var out = {};
  if (!children.length) {
    return "";
  }
  if (children.length === 1 && typeof children[0] == "string") {
    return children[0];
  }
  children.forEach(function(child) {
    if (typeof child !== "object") {
      return;
    }
    if (!out[child.tagName])
      out[child.tagName] = [];
    var kids = simplify(child.children);
    out[child.tagName].push(kids);
    if (Object.keys(child.attributes).length && typeof kids !== "string") {
      kids._attributes = child.attributes;
    }
  });
  for (var i in out) {
    if (out[i].length == 1) {
      out[i] = out[i][0];
    }
  }
  return out;
}
function filter(children, f, dept = 0, path = "") {
  var out = [];
  children.forEach(function(child, i) {
    if (typeof child === "object" && f(child, i, dept, path)) out.push(child);
    if (child.children) {
      var kids = filter(child.children, f, dept + 1, (path ? path + "." : "") + i + "." + child.tagName);
      out = out.concat(kids);
    }
  });
  return out;
}

// node_modules/txml/dist/transformStream.mjs
var import_through2 = __toESM(require_through2(), 1);

// node_modules/txml/dist/index.mjs
var import_through22 = __toESM(require_through2(), 1);

// src/index.ts
var sampleXML = `<root>
   <listing>
      <seller_info>
         <seller_name>jenzen12 </seller_name>
         <seller_rating>new </seller_rating>
      </seller_info>
      <payment_types>Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>* Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$310.00 </current_bid>
         <time_left>4 days </time_left>
         <high_bidder>
            <bidder_name>mike_and_colleen </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids>27 </num_bids>
         <started_at>$10.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Costa Meca, CA </location>
         <opened>Nov 27 00:24 PST </opened>
         <closed>Dec 02 10:24 PST </closed>
         <id_num>45519743 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically extended </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$310.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory>128MB RDRAM </memory>
         <hard_drive>
            40GB Ultra ATA Hard Drive (7200RPM)</hard_drive>
         <cpu>Pentium III </cpu>
         <brand>Dell Dimension 8100 Series </brand>
         <description>Dell's NEW
            Dimension features
            the Intel
            Pentium 4
            Processor! With
            leading edge
            performance and a
            brand new
            computing
            architecture, this
            system is designed
            for speed and power
            so you can enjoy the
            latest in audio,
            video, and Internet
            technologies.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>webaxion </seller_name>
         <seller_rating>31 </seller_rating>
      </seller_info>
      <payment_types> Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$53.50 </current_bid>
         <time_left>1 day </time_left>
         <high_bidder>
            <bidder_name>eldrdge1 </bidder_name>
            <bidder_rating>new </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 4 </num_bids>
         <started_at>$20.00 </started_at>
         <bid_increment>$2.50 </bid_increment>
         <location>Charlotte, NC </location>
         <opened>Nov 23 05:57
            PST </opened>
         <closed>Nov 29 05:57
            PST </closed>
         <id_num>45245937 </id_num>
         <notes>Seller can close auction early.
            * Auction does not get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu> </cpu>
         <brand> </brand>
         <description> Visioneer Strobe Pro NT integrates the most advanced paper management
            software
            with our unique compact sheet fed color scanner. The result is the ideal solution for
            streamlining information that makes it easy to find what you're looking for- even if you
            don't remember where you put it. With our Paper-driven? technology, you just feed in
            your color or black and white documents or images; Visioneer Strobe Pro NT
            automatically launches the PaperPort Deluxe software, and places your documents and
            images on the PaperPort desktop. and images on the PaperPort desktop.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>kriisvs </seller_name>
         <seller_rating>19 </seller_rating>
      </seller_info>
      <payment_types>Accepts Cashiers Checks and
         Money Orders
         * Accepts Credit Cards (MC,
         VISA)
      </payment_types>
      <shipping_info>Seller Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$2.99 </current_bid>
         <time_left>4 hrs </time_left>
         <high_bidder>
            <bidder_name>wnba088 </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>999 </num_items>
         <num_bids>5 </num_bids>
         <started_at>$2.99 </started_at>
         <bid_increment>$0.10 </bid_increment>
         <location>Haliburton, Ontario CA </location>
         <opened>Nov 25 18:09 PST </opened>
         <closed>Nov 27 18:09 PST </closed>
         <id_num>45416810 </id_num>
         <notes> Auction does not get automatically extended.
            * Seller will ship internationally. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu> </cpu>
         <brand> </brand>
         <description>
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>boy1der_1998 </seller_name>
         <seller_rating>5 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
      </payment_types>
      <shipping_info> Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>* Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$1,334.00 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids>0 </num_bids>
         <started_at> $1,334.00</started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Charleston, SC </location>
         <opened>Nov 19 15:00
            PST </opened>
         <closed>Nov 19 15:00
            PST </closed>
         <id_num>44993324 </id_num>
         <notes>Seller can close auction early.
            * Auction may get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>128 MB PC-100 SDRam </memory>
         <hard_drive>20 GB 7200 RPM Hard
            Drive </hard_drive>
         <cpu>Intel Pentium III 800 MHz CPU </cpu>
         <brand> </brand>
         <description> Intel Pentium III 800 MHz CPU * 128 MB PC-100 SDRam * 20 GB 7200 RPM Hard
            Drive * 56K Soft Modem * 16X DVD/40X CD-Rom Drive * Built on Sound and Video
            * Keyboard, Mouse and Speakers * Windows 98 or ME 17" AOC 3 year Warranty
            Monitor 1 year 24 x 7 ON Site Warranty-Nationwide Shipping and Handling is an
            addional: $75.00 for UPS Ground. Faster services are availible. ALL Personal Checks
            must Clear First.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>coronasystems </seller_name>
         <seller_rating>12 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$120.25 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name>turaxm </bidder_name>
            <bidder_rating>3 </bidder_rating>
         </high_bidder>
         <num_items>3 </num_items>
         <num_bids> 23 </num_bids>
         <started_at>$1.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Bridgeport, WV </location>
         <opened>Nov 21 13:07
            PST </opened>
         <closed>Nov 29 15:07
            PST </closed>
         <id_num>45128630 </id_num>
         <notes>Auction may get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$120.25
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>Pentium III FCPGA </cpu>
         <brand> </brand>
         <description>

            How would you like a Custom Built System?
            Built in our labs by Industry Certified Engineers and
            Technicians
            Backed by a full year warranty.
            System Details
            Name brand motherboard
            Pentium III FCPGA Motherboard - Supports up to 1064
            MHz Processor
            Can be upgraded !

            32MB AGP Video Card
            System Sdram video
            Up to 64 MB AGP 4X Video!
            Can be upgraded !

            3D Sound Included!
            Support for up to 4 speakers
            Can be upgraded to SoundBlaster Live!

            56K V.90 FaxModem
            Send faxes or connect online.
            See below for special web hosting free gift !

            Case and Power Supply

            PS/2 Ports
            USB Ports

            Drive cables


            Drivers Disk and Software

            What your bid gets you:
            The System above

            Free design assistance from our certified
            staff
            Not sure what you need?
            Not a computer whiz?
            Don't know a megabyte from a gigabyte?

            Don't worry - we'll assist you at each step.

            Build your system - the way you want it.
            We help you with the design, and then we
            construct it for you.
            Free.

            All design and labor costs are included in the
            base unit.

            You choose the upgrades you want at
            wholesale prices!
            And we install them free!
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>lizjb40 </seller_name>
         <seller_rating>69 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and
         Money Order
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$180.00 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name>salaam624 </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids>1 </num_bids>
         <started_at>$180.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Colonial Beach, VA </location>
         <opened>Nov 26 14:03 PST </opened>
         <closed>Nov 29 19:03 PST </closed>
         <id_num>45471155 </id_num>
         <notes> seller can close auction early.
            * Auction may get automatically extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$180.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>800 MHz/ Intel Penntium III Processor </cpu>
         <brand> </brand>
         <description> You are bidding on a RETAIL BOX INTEL PENNTIUM III 800 MHz/133 MHz
            System Bus CPU. Intel Penntium III Processor Product Features: 800MHZ Processor
            Core Speed - 133-MHz System Bus - 256KB On-Die Full-Speed L2 Cache - MMX
            Media Enhancement Technology - Fan Heatsink - All sales are final. I will shipp to
            the 48 United States, states ONLY! I will accept personal checks or Money Order for
            this item, however, I will hold shipment of the item for 6 days until the check clears
            the
            banks and Money Orders ship same day. As for shpping charges - $6.50 S&amp;H and
            Insurance.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>nex_gen_computers </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and Money Orders
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$215.00 </current_bid>
         <time_left>4 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 6 </num_bids>
         <started_at>$5.00 </started_at>
         <bid_increment> $1.00</bid_increment>
         <location>Los Angeles Ca </location>
         <opened>Nov 25 10:46 PST </opened>
         <closed>Dec 02 10:46 PST </closed>
         <id_num>44885977 </id_num>
         <notes> Auction does not get automatically
            extended.
            * Auction has a reserve price that has not
            been met. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>64MB SyncDRAM (up to 768MB) </memory>
         <hard_drive>6.4GB HDD (Ultra DMA EIDE) </hard_drive>
         <cpu>Celeron 466MHz </cpu>
         <brand>Compaq Presario 5700 minitower </brand>
         <description> With a powerful Intel Celeron? 466MHz (w/128KB L2 Cache) processor the
            Presario
            5700 is good for everything. You can watch movies, play powerful games, browse the
            Internet at the highest speed available, do your everyday tasks, this computer is good
            at
            all this. It comes standard with a built-in 24x CD-ROM, huge 6.4GB hard drive (you
            will probably never use it all), internal 56K V.90 PCI Fax/Modem. This is a good
            advanced system, which is going to last forever. You can count on 5 and more years of
            work, there's plenty of 5 and more years old Compaqs that are still in use. Besides,
            Compaq has a very good technical support, so you won't have any problems looking for
            the drivers, for example. You can also order the quick restore CD, Compaq sends those
            for free.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>deg76 </seller_name>
         <seller_rating>2 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and
         Money Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>799.00 </current_bid>
         <time_left>5 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$799.00 </started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Winchester, VA </location>
         <opened>Nov 24 16:28 PST </opened>
         <closed>Dec 02 16:28 PST </closed>
         <id_num>45337675 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically extended.
            * There is a buy price on this auction of
            $999.00. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>64 Meg Ram </memory>
         <hard_drive>10 Gig HD </hard_drive>
         <cpu>Pentium III 650 MHZ Cpu </cpu>
         <brand> </brand>
         <description>Pentium III 650 MHZ Cpu NEW SYSTEM ATX Mid Tower 50X CDROM 10 Gig HD
            64 Meg Ram 8 Meg Video 56K Modem Sound 2 USB Ports Ethernet 10/100 Keyboard,
            Mouse, Speakers 15" Monitor 1 Year Parts and Labor E-Mail deg@shentel.net with
            address for exact shipping charges. Ships using UPS.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>mertztech </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types> Accepts Personal Checks
      </payment_types>
      <shipping_info> Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$315.00 </current_bid>
         <time_left>8 days </time_left>
         <high_bidder>
            <bidder_name>abestseller </bidder_name>
            <bidder_rating>4 </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 8 </num_bids>
         <started_at>$95.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Williamsville, NY </location>
         <opened>Nov 25 12:01 PST </opened>
         <closed>Dec 05 18:01 PST </closed>
         <id_num>45045404 </id_num>
         <notes>Auction does not get automatically
            extended.
            * There is a buy price on this auction of
            $599.95. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$315.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> 64MB SDRAM Memory</memory>
         <hard_drive>20GB Quantum Fireball IDE Hard Drive </hard_drive>
         <cpu>Intel Pentium III 800MHz Processor </cpu>
         <brand> </brand>
         <description>This is an incredible, brand new system just for you.
            Shipping &amp; Handling is $49.00 and paid for by the buyer.
            An e-mail will be sent upon receipt of payment. UPS
            Ground is method of shipping.
            PayPal is accepted!
            Personal checks, cashiers checks and money orders are
            accepted.
            All auction sales are final.
            New York state residence add 8% sales tax.
            Payment must be received within 5 days from close of
            auction.
            Allow 3-10 business days to process order and configure
            system after payment is received.
            One year parts and labor warranty as provided for by
            manufacturer. Seller will replace defective parts at sellers
            option.
            I understand and agree: If I do not pay and send my
            payment within 7 days after auction closing, all necessary
            costs will be forwarded to a collection agency; a 20%
            restocking fee is assessed for all equipment; I cannot
            return the product(everything listed above) after 30 days
            of purchase.
            30 Day warrenty. Manufacturer warrenty apply.
            If you have any questions regarding this purchase please
            e-mail us at jeff@mertztech.com.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>o
            econgo1 </seller_name>
         <seller_rating>new </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$1,500.00 </current_bid>
         <time_left>3 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$1,500.00 </started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Tupelo, MS </location>
         <opened>Nov 26 11:54
            PST </opened>
         <closed> Dec 01 11:54
            PST</closed>
         <id_num>45463230 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically
            extended.
            * Seller will ship internationally </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>128MB RDRAM, </memory>
         <hard_drive>40GB
            Ultra ATA Hard Drive </hard_drive>
         <cpu>Intel Pentium III Processor at 1Ghz, </cpu>
         <brand> </brand>
         <description> (Your Computer Will Look Similar To The One Shown) This New Computer System
            comes with a blazing Intel Pentium III Processor at 1Ghz, 128MB RDRAM,40GB
            Ultra ATA Hard Drive,Sound Blaster Live! +MP3,Creative Labs Annihilator 2
            GeForce2 AGP Graphic Card, 19" Monitor, Creative Labs PC-DVD Encore 12X DVD,
            Microsoft Windows ME Operating System and A 3-Yr. Parts &amp; Labor Warranty. Ask
            for the new Pentium IV Processor at 1.4 &amp; 1.5GHz! If you have any questions please
            e-mail me or send me an instant message.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>cbear_net </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$289.00 </current_bid>
         <time_left>1 day </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$289.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Federal Way, WA </location>
         <opened>Nov 26 13:56 PST </opened>
         <closed>Nov 28 13:56 PST </closed>
         <id_num>44998107 </id_num>
         <notes> Auction does not get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>Intel Pentium III CPU </cpu>
         <brand> </brand>
         <description> Upgrade your system with Intel Pentium III CPU. QUICK GLANCE :This Product is
            brand new and pre-assembled! - Intel Pentium III 533MHz CPU and Heatsink - Intel
            SpeedStep Technology - Slot 1- 133MHz/256k - ASUS P3V4X JumperFree AGP/4X
            Motherboard - 133MHZ/100MHZ FSB &amp; PC133 SDRAM support - Coppermine
            CPU Support - DMA/66 Ready - PC133 64M SDRAM 168 Pins 7 ns Memory The
            Intel Pentium III processor offers great performance for today's and tomorrow's
            applications, as well as quality, reliability, and compatibility from the world's
            leading
            microprocessor company. Intel's latest Pentium III processors are manufactured using
            the advanced 0.18-micron process. This new generation of technology brings all the
            performance-enhancing features of the Pentium III processor into exciting new PC
            products. Available for both desktop and mobile users, the redesigned Pentium III
            processor with Advanced Transfer Cache means you have all the power and
            performance for today's and tomorrow's Internet applications. Mobile Pentium III
            processor featuring Intel SpeedStep technology lets you command the power of the
            Internet anytime, anywhere. For the Desktop, The Intel Pentium III processor is now
            available at up to 1.13 GHz. - FOR CONSUMERS Unleash the full multimedia
            capabilities of your Performance PC with the Pentium III processor -- including
            full-screen, full-motion video and realistic graphics for an enhanced, exciting Internet
            experience. With the new mobile Pentium III processor, take outstanding performance
            with you wherever you go! - FOR BUSINESS The Pentium III processor sets a new
            baseline for high-performance business desktop computing, and is also available for
            entry-level workstations and servers. And now, the new mobile Pentium III processor
            enables greater productivity on the go. - FOR DEVELOPERS Find the software, tools
            and technical information you need to optimize the power of the Pentium III processor.
            ** ** Warranty: 3 Months functional defect exchange warranty. ** The warranty of
            CPU, Memory and Mother board that have been mishandled or damaged is voided.
            Only those items that are determined to be free from damage will be exchanged or
            refunded. ************************** Buyer Pay $12.99 Shipping inside US via
            UPS. **** Shipping fees, return shipping costs are Non-Refundable. Physical damaged
            by improper handling or installation will not be honored. Support: Fax us 253 946-5719
            or email Cbear@cbear.net. Visit our website www.cbear.net for other products.
         </description>
      </item_info>
   </listing>
</root>`;
console.time("txml");
var resTxml = parse2(sampleXML, { simplify: true });
console.timeEnd("txml");
console.time("fxml");
var res = parse(sampleXML);
console.timeEnd("fxml");
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
