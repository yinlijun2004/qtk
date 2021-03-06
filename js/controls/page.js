"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget_1 = require("./widget");
var widget_factory_1 = require("./widget-factory");
var widget_recyclable_creator_1 = require("./widget-recyclable-creator");
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(type) {
        _super.call(this, type || Page.TYPE);
    }
    Page.create = function (options) {
        return Page.recycleBin.create(options);
    };
    Page.TYPE = "page";
    Page.recycleBin = widget_recyclable_creator_1.WidgetRecyclableCreator.create(Page);
    return Page;
}(widget_1.Widget));
exports.Page = Page;
;
widget_factory_1.WidgetFactory.register(Page.TYPE, Page.create);
