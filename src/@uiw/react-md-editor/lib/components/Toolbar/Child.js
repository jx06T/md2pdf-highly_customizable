"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Child;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _react = _interopRequireWildcard(require("react"));
var _ = _interopRequireDefault(require("./"));
var _Context = require("../../Context");
var _jsxRuntime = require("react/jsx-runtime");
function Child(props) {
  var _ref = props || {},
    prefixCls = _ref.prefixCls,
    groupName = _ref.groupName,
    commands = _ref.commands,
    children = _ref.children;
  var _useContext = (0, _react.useContext)(_Context.EditorContext),
    _useContext$barPopup = _useContext.barPopup,
    barPopup = _useContext$barPopup === void 0 ? {} : _useContext$barPopup;
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(prefixCls, "-toolbar-child ").concat(groupName && barPopup[groupName] ? 'active' : ''),
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      children: Array.isArray(commands) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_["default"], (0, _objectSpread2["default"])((0, _objectSpread2["default"])({
        commands: commands
      }, props), {}, {
        isChild: true
      })) : children
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [commands, barPopup, groupName, prefixCls]);
}
module.exports = exports.default;