
import {Rect} from "../rect";
import {Style} from "../style";
import {Widget} from "./widget";
var Events = require("../events");
import {Button} from "./button";
import {Graphics} from "../graphics";
import {WidgetFactory} from "./widget-factory";
import {ImageTile, ImageDrawType} from "../image-tile";
import {RecyclableCreator} from "../recyclable-creator";
import {ProgressBarType, ProgressBar} from "./progress-bar";

export class Slider extends ProgressBar {
	protected dragger : Widget;
	constructor(type?:string) {
		super(type || Slider.TYPE);
	}
	
	public onDraggerMoved(){
		if(this.barType === ProgressBarType.V) {
			var h = this.dragger.h;
			var y = this.h - this.dragger.y;
			if(y < 2*h) {
				y -= h;
			}else if(y < (this.h - h)) {
				y -= h >> 1;
			}else {
			//	y = y;
			}

			this._value = y/this.h;
		}else{
			var w = this.dragger.w;
			var x = this.dragger.x;
			if(x < w) {
			//	x = x;
			}else if(x < (this.w - 2*w)) {
				x += w >> 1;
			}else {
				x += w;
			}

			this._value = x/this.w;
		}
		this.requestRedraw();
	}

	public relayoutChildren() : Rect {
		var dragger = this.dragger;
		if(dragger) {
			if(this.barType === ProgressBarType.V) {
				dragger.w = this.w;
				dragger.h = this.w;
				dragger.x = 0;
				dragger.y = (1-this.value) * this.h;
				dragger.useBehavior("movable", {xMovable:false, yLimit:true, yMin:0, yMax:this.h-this.w});
			}else{
				dragger.w = this.h;
				dragger.h = this.h;
				dragger.y = 0;
				dragger.x = this.value * this.w;
				dragger.useBehavior("movable", {yMovable:false, xLimit:true, xMin:0, xMax:this.w-this.h});
			}
		}

		return null;
	}

	protected onInit() {
		super.onInit();
		this.dragger = Button.create();
		this.addChild(this.dragger);
		this.dragger.styleType  = "slider-dragger";
		this.dragger.on(Events.CHANGE, evt => {
			 var attr = evt.attr;
			if(attr === "x" || attr === "y") {
				this.onDraggerMoved();
			}
		});
	}

	protected setAttr(attr:string, newValue:any, notify:boolean) : Widget {
		super.setAttr(attr, newValue, notify);
		if(attr === "w" || attr === "h" || attr === "value") {
			this.relayoutChildren();
		}

		return this;
	}
	
	protected drawColorBackground(ctx:any, style:Style) : Widget {
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		if(this.barType === ProgressBarType.V) {
			x1 = x2 = this.w >> 1;
			y1 = 0;
			y2 = this.h;
		}else{
			y1 = y2 = this.h >> 1;
			x1 = 0;
			x2 = this.w;
		}
		Graphics.drawLine(ctx, style.backGroundColor, style.lineWidth, x1, y1, x2, y2);
	
		return this;
	}

	protected drawColorForeGround(ctx:any, style:Style) : Widget {
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		if(this.barType === ProgressBarType.V) {
			x1 = x2 = this.w >> 1;
			y1 = this.h;
			y2 = this.h * (1 - this.value);
		}else{
			y1 = y2 = this.h >> 1;
			x1 = 0;
			x2 = this.w * this.value;
		}
		Graphics.drawLine(ctx, style.foreGroundColor, style.lineWidth, x1, y1, x2, y2);
	
		return this;
	}

	public dispose() {
		super.dispose();
		Slider.r.recycle(this);
	}

	public static TYPE = "slider";
	private static r = new RecyclableCreator<Slider>(function() {return new Slider()});
	public static create() : Widget {
		return Slider.r.create().reset(Slider.TYPE);
	}
};

WidgetFactory.register(Slider.TYPE, Slider.create);
