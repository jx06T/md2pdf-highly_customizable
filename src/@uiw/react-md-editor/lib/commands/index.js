"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaTextApi = exports.TextAreaCommandOrchestrator = void 0;
Object.defineProperty(exports, "bold", {
  enumerable: true,
  get: function get() {
    return _bold.bold;
  }
});
Object.defineProperty(exports, "checkedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.checkedListCommand;
  }
});
Object.defineProperty(exports, "code", {
  enumerable: true,
  get: function get() {
    return _code.code;
  }
});
Object.defineProperty(exports, "codeBlock", {
  enumerable: true,
  get: function get() {
    return _code.codeBlock;
  }
});
Object.defineProperty(exports, "codeEdit", {
  enumerable: true,
  get: function get() {
    return _preview.codeEdit;
  }
});
Object.defineProperty(exports, "codeLive", {
  enumerable: true,
  get: function get() {
    return _preview.codeLive;
  }
});
Object.defineProperty(exports, "codePreview", {
  enumerable: true,
  get: function get() {
    return _preview.codePreview;
  }
});
Object.defineProperty(exports, "comment", {
  enumerable: true,
  get: function get() {
    return _comment.comment;
  }
});
Object.defineProperty(exports, "divider", {
  enumerable: true,
  get: function get() {
    return _divider.divider;
  }
});
Object.defineProperty(exports, "fullscreen", {
  enumerable: true,
  get: function get() {
    return _fullscreen.fullscreen;
  }
});
exports.getExtraCommands = exports.getCommands = void 0;
exports.getStateFromTextArea = getStateFromTextArea;
Object.defineProperty(exports, "group", {
  enumerable: true,
  get: function get() {
    return _group.group;
  }
});
Object.defineProperty(exports, "help", {
  enumerable: true,
  get: function get() {
    return _help.help;
  }
});
Object.defineProperty(exports, "hr", {
  enumerable: true,
  get: function get() {
    return _hr.hr;
  }
});
Object.defineProperty(exports, "image", {
  enumerable: true,
  get: function get() {
    return _image.image;
  }
});
Object.defineProperty(exports, "issue", {
  enumerable: true,
  get: function get() {
    return _issue.issue;
  }
});
Object.defineProperty(exports, "italic", {
  enumerable: true,
  get: function get() {
    return _italic.italic;
  }
});
Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function get() {
    return _link.link;
  }
});
Object.defineProperty(exports, "orderedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.orderedListCommand;
  }
});
Object.defineProperty(exports, "quote", {
  enumerable: true,
  get: function get() {
    return _quote.quote;
  }
});
Object.defineProperty(exports, "strikethrough", {
  enumerable: true,
  get: function get() {
    return _strikeThrough.strikethrough;
  }
});
Object.defineProperty(exports, "table", {
  enumerable: true,
  get: function get() {
    return _table.table;
  }
});
Object.defineProperty(exports, "title", {
  enumerable: true,
  get: function get() {
    return _title.title;
  }
});
Object.defineProperty(exports, "title1", {
  enumerable: true,
  get: function get() {
    return _title2.title1;
  }
});
Object.defineProperty(exports, "title2", {
  enumerable: true,
  get: function get() {
    return _title3.title2;
  }
});
Object.defineProperty(exports, "title3", {
  enumerable: true,
  get: function get() {
    return _title4.title3;
  }
});
Object.defineProperty(exports, "title4", {
  enumerable: true,
  get: function get() {
    return _title5.title4;
  }
});
Object.defineProperty(exports, "title5", {
  enumerable: true,
  get: function get() {
    return _title6.title5;
  }
});
Object.defineProperty(exports, "title6", {
  enumerable: true,
  get: function get() {
    return _title7.title6;
  }
});
Object.defineProperty(exports, "unorderedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.unorderedListCommand;
  }
});
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _InsertTextAtPosition = require("../utils/InsertTextAtPosition");
var _bold = require("./bold");
var _code = require("./code");
var _comment = require("./comment");
var _divider = require("./divider");
var _fullscreen = require("./fullscreen");
var _group = require("./group");
var _hr = require("./hr");
var _image = require("./image");
var _italic = require("./italic");
var _link = require("./link");
var _list = require("./list");
var _preview = require("./preview");
var _quote = require("./quote");
var _strikeThrough = require("./strikeThrough");
var _title = require("./title");
var _title2 = require("./title1");
var _title3 = require("./title2");
var _title4 = require("./title3");
var _title5 = require("./title4");
var _title6 = require("./title5");
var _title7 = require("./title6");
var _table = require("./table");
var _issue = require("./issue");
var _help = require("./help");
var getCommands = exports.getCommands = function getCommands() {
  return [_bold.bold, _italic.italic, _strikeThrough.strikethrough, _hr.hr, (0, _group.group)([_title2.title1, _title3.title2, _title4.title3, _title5.title4, _title6.title5, _title7.title6], {
    name: 'title',
    groupName: 'title',
    buttonProps: {
      'aria-label': 'Insert title',
      title: 'Insert title'
    }
  }), _divider.divider, _link.link, _quote.quote, _code.code, _code.codeBlock, _comment.comment, _image.image, _table.table, _divider.divider, _list.unorderedListCommand, _list.orderedListCommand, _list.checkedListCommand, _divider.divider, _help.help];
};
var getExtraCommands = exports.getExtraCommands = function getExtraCommands() {
  return [_preview.codeEdit, _preview.codeLive, _preview.codePreview, _divider.divider, _fullscreen.fullscreen];
};
function getStateFromTextArea(textArea) {
  var _textArea$value;
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd
    },
    text: textArea.value,
    selectedText: (_textArea$value = textArea.value) === null || _textArea$value === void 0 ? void 0 : _textArea$value.slice(textArea.selectionStart, textArea.selectionEnd)
  };
}
var TextAreaTextApi = exports.TextAreaTextApi = /*#__PURE__*/function () {
  function TextAreaTextApi(textArea) {
    (0, _classCallCheck2["default"])(this, TextAreaTextApi);
    (0, _defineProperty2["default"])(this, "textArea", void 0);
    this.textArea = textArea;
  }

  /**
   * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
   * selection start and selection end will be the same and will both point to the end
   * @param text Text that should replace the current selection
   */
  return (0, _createClass2["default"])(TextAreaTextApi, [{
    key: "replaceSelection",
    value: function replaceSelection(text) {
      (0, _InsertTextAtPosition.insertTextAtPosition)(this.textArea, text);
      return getStateFromTextArea(this.textArea);
    }

    /**
     * Selects the specified text range
     * @param selection
     */
  }, {
    key: "setSelectionRange",
    value: function setSelectionRange(selection) {
      this.textArea.focus();
      this.textArea.selectionStart = selection.start;
      this.textArea.selectionEnd = selection.end;
      return getStateFromTextArea(this.textArea);
    }
  }]);
}();
var TextAreaCommandOrchestrator = exports.TextAreaCommandOrchestrator = /*#__PURE__*/function () {
  function TextAreaCommandOrchestrator(textArea) {
    (0, _classCallCheck2["default"])(this, TextAreaCommandOrchestrator);
    (0, _defineProperty2["default"])(this, "textArea", void 0);
    (0, _defineProperty2["default"])(this, "textApi", void 0);
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }
  return (0, _createClass2["default"])(TextAreaCommandOrchestrator, [{
    key: "getState",
    value: function getState() {
      if (!this.textArea) return false;
      return getStateFromTextArea(this.textArea);
    }
  }, {
    key: "executeCommand",
    value: function executeCommand(command, dispatch, state, shortcuts) {
      command.execute && command.execute((0, _objectSpread2["default"])({
        command: command
      }, getStateFromTextArea(this.textArea)), this.textApi, dispatch, state, shortcuts);
    }
  }]);
}();