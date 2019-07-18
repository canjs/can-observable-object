"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("can-observable-mixin"),
    makeDefineInstanceKey = _require.makeDefineInstanceKey,
    mixins = _require.mixins,
    mixinMapProps = _require.mixinMapProps,
    mixinProxy = _require.mixinProxy,
    mixinTypeEvents = _require.mixinTypeEvents;

var ObservableObject =
/*#__PURE__*/
function (_mixinProxy) {
  _inherits(ObservableObject, _mixinProxy);

  function ObservableObject(props) {
    var _this;

    _classCallCheck(this, ObservableObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObservableObject).call(this));
    mixins.finalizeClass(_this.constructor);
    mixins.initialize(_assertThisInitialized(_this), props);
    return _this;
  }

  return ObservableObject;
}(mixinProxy(Object));

ObservableObject = mixinTypeEvents(mixinMapProps(ObservableObject));
makeDefineInstanceKey(ObservableObject);
module.exports = ObservableObject;