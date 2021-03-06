"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget_factory_1 = require("./widget-factory");
var widget_recyclable_creator_1 = require("./widget-recyclable-creator");
var grid_layouter_1 = require("../layouters/grid-layouter");
var scroll_view_1 = require("./scroll-view");
/**
 * 网格视图。
 */
var GridView = (function (_super) {
    __extends(GridView, _super);
    function GridView() {
        _super.call(this, GridView.TYPE);
    }
    Object.defineProperty(GridView.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        /**
         * 列数。列数和列宽设置其中之一即可。
         */
        set: function (value) {
            this._cols = value;
            var layouter = this._childrenLayouter;
            layouter.cols = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "colWidth", {
        get: function () {
            return this._colWidth;
        },
        /**
         * 列宽。列数和列宽设置其中之一即可。
         */
        set: function (value) {
            this._colWidth = value;
            var layouter = this._childrenLayouter;
            layouter.colWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        /**
         * 行数。行数和行高设置其中之一即可。
         */
        set: function (value) {
            this._rows = value;
            var layouter = this._childrenLayouter;
            layouter.rows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "rowHeight", {
        get: function () {
            return this._rowHeight;
        },
        /**
         * 行高。行数和行高设置其中之一即可。
         */
        set: function (value) {
            this._rowHeight = value;
            var layouter = this._childrenLayouter;
            layouter.rowHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 每一网格周围的空白。
     */
    GridView.prototype.setItemMargins = function (margins) {
        var layouter = this._childrenLayouter;
        layouter.leftMargin = margins.left || margins.all || 0;
        layouter.rightMargin = margins.right || margins.all || 0;
        layouter.topMargin = margins.top || margins.all || 0;
        layouter.bottomMargin = margins.bottom || margins.all || 0;
        return this;
    };
    Object.defineProperty(GridView.prototype, "childrenLayouter", {
        get: function () {
            return this._childrenLayouter;
        },
        enumerable: true,
        configurable: true
    });
    GridView.prototype.doDrawChildren = function (ctx) {
        var top = this.offsetY;
        var bottom = top + this.h;
        this._children.forEach(function (child) {
            var visible = child.visible && child.y < bottom && (child.y + child.h) > top;
            if (visible) {
                child.draw(ctx);
            }
        });
        return this;
    };
    GridView.prototype.relayoutChildren = function () {
        this.ensureOptions();
        var r = _super.prototype.relayoutChildren.call(this);
        this.contentW = r.w + this.leftPadding + this.rightPadding;
        this.contentH = r.h + this.topPadding + this.bottomPadding;
        return r;
    };
    GridView.prototype.ensureOptions = function () {
        if (this.rows > 0 && this.cols > 0) {
            this.scrollerOptions.scrollingX = false;
            this.scrollerOptions.scrollingY = false;
            this.scrollBarStyle.vBarVisibility = scroll_view_1.ScrollerBarVisibility.INVISIBLE;
            this.scrollBarStyle.hBarVisibility = scroll_view_1.ScrollerBarVisibility.INVISIBLE;
        }
        else if (this.cols > 0) {
            this.scrollerOptions.scrollingX = false;
            this.scrollerOptions.scrollingY = true;
            this.scrollBarStyle.vBarVisibility = scroll_view_1.ScrollerBarVisibility.AUTO;
            this.scrollBarStyle.hBarVisibility = scroll_view_1.ScrollerBarVisibility.INVISIBLE;
        }
        else if (this.rows > 0) {
            this.scrollerOptions.scrollingX = true;
            this.scrollerOptions.scrollingY = false;
            this.scrollBarStyle.hBarVisibility = scroll_view_1.ScrollerBarVisibility.AUTO;
            this.scrollBarStyle.vBarVisibility = scroll_view_1.ScrollerBarVisibility.INVISIBLE;
        }
        else {
            this.scrollerOptions.scrollingX = false;
            this.scrollerOptions.scrollingY = true;
            this.scrollBarStyle.vBarVisibility = scroll_view_1.ScrollerBarVisibility.AUTO;
            this.scrollBarStyle.hBarVisibility = scroll_view_1.ScrollerBarVisibility.INVISIBLE;
        }
    };
    GridView.prototype.onToJson = function (json) {
        delete json.childrenLayouter;
    };
    GridView.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.relayoutChildren();
    };
    GridView.prototype.onReset = function () {
        _super.prototype.onReset.call(this);
        this._childrenLayouter = grid_layouter_1.GridLayouter.create({ cols: this.cols, rows: this.rows });
    };
    GridView.prototype.getDefProps = function () {
        return GridView.defProps;
    };
    GridView.create = function (options) {
        return GridView.recycleBinGridView.create(options);
    };
    GridView.defProps = Object.assign({}, scroll_view_1.ScrollView.defProps, { _cols: 3, _rows: 3, _rowHeight: 0, _colWidth: 0 });
    GridView.TYPE = "grid-view";
    GridView.recycleBinGridView = widget_recyclable_creator_1.WidgetRecyclableCreator.create(GridView);
    return GridView;
}(scroll_view_1.ScrollView));
exports.GridView = GridView;
;
widget_factory_1.WidgetFactory.register(GridView.TYPE, GridView.create);
