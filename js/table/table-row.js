"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget_1 = require("../controls/widget");
var widget_factory_1 = require("../controls/widget-factory");
var recyclable_creator_1 = require("../recyclable-creator");
/**
 * 表格
 */
var TableRow = (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        _super.call(this, TableRow.TYPE);
    }
    TableRow.prototype.onReset = function () {
        _super.prototype.onReset.call(this);
    };
    TableRow.prototype.relayoutChildren = function () {
        var tableClient = (this.parent);
        if (!this.w || !this.h || !tableClient) {
            return;
        }
        var colsWidth = tableClient.colsWidth;
        var h = this.clientH;
        var x = this.leftPadding;
        var y = this.rightPadding;
        this.children.forEach(function (child, index) {
            var w = colsWidth[index] || 100;
            child.moveResizeTo(x, y, w, h);
            x += w;
        });
        this.w = x + this.rightPadding;
        return null;
    };
    TableRow.create = function (options) {
        return TableRow.recycleBin.create().reset(TableRow.TYPE, options);
    };
    TableRow.TYPE = "table-row";
    TableRow.recycleBin = new recyclable_creator_1.RecyclableCreator(function () { return new TableRow(); });
    return TableRow;
}(widget_1.Widget));
exports.TableRow = TableRow;
;
widget_factory_1.WidgetFactory.register(TableRow.TYPE, TableRow.create);
