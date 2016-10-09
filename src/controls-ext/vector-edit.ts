
import {Rect} from "../rect";
import {Style} from "../style";
import {Point} from "../point";
import {Label} from "../controls/label";
import {Edit} from "../controls/edit";
import {Button} from "../controls/button";
import {Widget} from "../controls/widget";
import Events = require("../events");
import {WidgetFactory} from "../controls/widget-factory";
import {RecyclableCreator} from "../recyclable-creator";

/**
 * 范围编辑器。
 */
export class VectorEdit extends Widget {
	protected _d : number;

	protected _xLabel : Label;
	protected _xEditor : Edit;
	protected _yLabel : Label;
	protected _yEditor : Edit;
	protected _zLabel : Label;
	protected _zEditor : Edit;
	
	public get inputable() {
		return true;
	}

	/**
	 * dimension
	 */
	public get d() : number {
		return this._d;
	}
	
	public set d(value:number){
		this._d = value;;
	}

	public get xEditor() : Edit {
		return this._xEditor;
	}

	public get yEditor() : Edit {
		return this._yEditor;
	}
	
	public get zEditor() : Edit {
		return this._zEditor;
	}

	public set value(value:any) {
		this._value = value;
		if(this._xEditor) {
			this._xEditor.value = value.x;
		}
		if(this._yEditor) {
			this._yEditor.value = value.y;
		}
		if(this._zEditor) {
			this._zEditor.value = value.z;
		}
	}

	public get value() : any {
		if(!this._value) {
			this._value = {};
		}
		if(this._xEditor) {
			this._value.x = this._xEditor.value;
		}

		if(this._yEditor) {
			this._value.y  = this._yEditor.value;
		}
		if(this._zEditor) {
			this._value.z  = this._zEditor.value;
		}

		return this._value;
	}
	
	protected onToJson(json:any) {
		delete json._value;
	}

	public relayoutChildren() : Rect {
		this.requestRedraw();
		if(this.w && this.h) {
			var x = this.leftPadding;
			var y = this.topPadding;
			var h = this.clientH;
			var iw = this.clientW/this.d;
			
			var labelW = 15;
			var editW = iw - labelW;

			this._xLabel.moveResizeTo(x, y, labelW, h, 0);
			x += labelW;
			this._xEditor.moveResizeTo(x, y, editW, h, 0);
			x += editW;
			
			this._yLabel.moveResizeTo(x, y, labelW, h, 0);
			x += labelW;
			this._yEditor.moveResizeTo(x, y, editW, h, 0);
			x += editW;
			
			if(this.d > 2) {
				this._zLabel.moveResizeTo(x, y, labelW, h, 0);
				x += labelW;
				this._zEditor.moveResizeTo(x, y, editW, h, 0);
				x += editW;
			}
		}

		return this.getLayoutRect();
	}

	public dispose() {
		this._xEditor = null;
		this._yEditor = null;
		this._zEditor = null;
		this._xLabel = null;
		this._yLabel = null;
		this._zLabel = null;

		super.dispose();
	}

	protected forwardChangeEvent(evt:Events.ChangeEvent) {
		var e = this.eChangeEvent;
		e.init(evt.type, {value:this.value});
		this.dispatchEvent(e);
	}
	protected onCreated() {
		super.onCreated();
		
		this.padding = 0;
		var value = this._value || {x:0, y:0, z:0};
		this.d = Math.max(2, Math.min(3, this.d || 2));

		this._xLabel = Label.create({text:"X"});
		this.addChild(this._xLabel, false);
		this._xEditor = Edit.create({multiLineMode:false, value:value.x, inputType:"number"});
		this.addChild(this._xEditor, false);
		this._xEditor.on(Events.CHANGE, evt => {
			this.forwardChangeEvent(evt);
		});
		this._xEditor.on(Events.CHANGING, evt => {
			this.forwardChangeEvent(evt);
		});

		this._yLabel = Label.create({text:"Y"});
		this.addChild(this._yLabel, false);
		this._yEditor = Edit.create({multiLineMode:false, value:value.y, inputType:"number"});
		this.addChild(this._yEditor, false);
		this._yEditor.on(Events.CHANGE, evt => {
			this.forwardChangeEvent(evt);
		});
		this._yEditor.on(Events.CHANGING, evt => {
			this.forwardChangeEvent(evt);
		});
	
		if(this.d > 2) {
			this._zLabel = Label.create({multiLineMode:false, value:value.z, text:"Z"});
			this.addChild(this._zLabel, false);
			this._zEditor = Edit.create({inputType:"number"});
			this.addChild(this._zEditor, false);
			this._zEditor.on(Events.CHANGE, evt => {
				this.forwardChangeEvent(evt);
			});
			this._zEditor.on(Events.CHANGING, evt => {
				this.forwardChangeEvent(evt);
			});
		}

		this.relayoutChildren();
	}

	constructor() {
		super(VectorEdit.TYPE);
	}
	
	protected static defProps = Object.assign({}, Widget.defProps, {_d:2});
	protected getDefProps() : any {
		return VectorEdit.defProps;
	}

	public static TYPE = "vector.edit";
	private static rBin = new RecyclableCreator<VectorEdit>(function() {
		return new VectorEdit()});
	public static create(options?:any) : VectorEdit {
		return <VectorEdit>VectorEdit.rBin.create().reset(VectorEdit.TYPE, options);
	}
};

WidgetFactory.register(VectorEdit.TYPE, VectorEdit.create);
