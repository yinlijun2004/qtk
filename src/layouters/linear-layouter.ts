import {Rect} from '../rect';
import {Align, Orientation} from '../consts';
import {Direction} from '../consts';
import {stableSort} from "../utils";
import {Widget} from '../controls/widget';
import {Layouter, LayouterFactory} from './layouter';

const TYPE = "LinearLayouter";

/**
 * VLinear布局器。
 */
export class LinearLayouter extends Layouter {
	public spacing : number;
	public orientation : Orientation;

	public get type() : string {
		return TYPE;
	}
	
	/**
	 * 设置参数。
	 */
	public setOptions(options:any) : any {
		this.spacing = options.spacing || 0;
		this.orientation = options.orientation || Orientation.V;

		return this;
	}

	public layoutChildren(widget:Widget, children:Array<Widget>, rect:Rect) : Rect {
		var r = rect.clone();
		
		var arr = children.filter(function(child) {
			return child.z > 0;
		});
		stableSort(arr, function(a, b) {return a.z - b.z;});
		arr.forEach(child => {
			if(r.w > 0 &&  r.h > 0) {
				this.layoutChild(child, r);
			}
		});
		
		arr = children.filter(function(child) {
			return child.z === 0;
		});
		arr.forEach(child => {
			if(r.w > 0 &&  r.h > 0) {
				this.layoutChild(child, r);
			}
		});

		arr = children.filter(function(child) {
			return child.z < 0;
		});
		stableSort(arr, function(a, b) {return b.z - a.z;});
		arr.forEach(child => {
			if(r.w > 0 &&  r.h > 0) {
				this.layoutChild(child, r);
			}
		});

		r.dispose();

		return rect;
	}

	public layoutChild(child:Widget, r:Rect) {
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;
		var z = child.z;
		var param = <LinearLayouterParam>child.layoutParam || LinearLayouterParam.defParam;

		if(param && param.type === TYPE && child.visible) {
			var spacing = param.spacing || this.spacing;
			h = Math.min(r.h, param.h ? Layouter.evalValue(param.h, r.h) : child.h);
			w = Math.min(r.w, param.w ? Layouter.evalValue(param.w, r.w) : child.w);
	
			if(this.orientation === Orientation.V) {
				switch(param.align) {
					case Align.LEFT: {
						x = r.x;
						break;
					}
					case Align.RIGHT: {
						x = r.x + r.w - w;
						break;
					}
					default: {
						x = r.x + ((r.w - w) >> 1);
						break;
					}
				}
				
				var spacingH = spacing + h;
				if(z >= 0) {
					y = r.y + spacing;
					r.y += spacingH;
				}else{
					y = r.y + r.h - spacingH;
				}
				r.h -= spacingH;
			}else{
				switch(param.align) {
					case Align.TOP: {
						y = r.y;
						break;
					}
					case Align.BOTTOM: {
						y = r.y + r.h - h;
						break;
					}
					default: {
						y = r.y + ((r.h - h) >> 1);
						break;
					}
				}
				var spacingW = spacing + w;
				if(z >= 0) {
					x = r.x + spacing;
					r.x += spacingW;
				}else{
					x = r.x + r.w - spacingW;
				}
				r.w -= spacingW;
			}

			child.moveResizeTo(x, y, w, h);
			child.relayoutChildren();
		}
	}


	public static createV(options:any) : LinearLayouter {
		var layouter = new LinearLayouter();
		layouter.setOptions(options);
		layouter.orientation = Orientation.V;

		return layouter;
	}

	public static createH(options:any) : LinearLayouter {
		var layouter = new LinearLayouter();
		layouter.setOptions(options);
		layouter.orientation = Orientation.H;

		return layouter;
	}
};

LayouterFactory.register(TYPE, LinearLayouter.createV);

/**
 * VLinear布局器的参数。
 * 
 * 如果父控件使用LinearLayouter布局器，则子控件需要把layoutParam设置为LinearLayouterParam。
 * 
 * 对于w参数：
 * *.如果以px结尾，则直接取它的值。
 * *.如果以%结尾，则表示剩余空间的宽度/高度的百分比。
 *
 */
export class LinearLayouterParam {
	public type : string;
	public w : string;
	public h : string;
	public align : Align;
	public spacing : number;

	constructor(w:string, h:string, spacing:number, align:Align) {
		this.type = TYPE;
		this.w = w;
		this.h = h;
		this.align = align;
		this.spacing = spacing;
	}

	public static defParam = LinearLayouterParam.create(null);
	static create(opts:any) : LinearLayouterParam {
		var options = opts || {};
		return new LinearLayouterParam(options.w, options.h, options.spacing||0, options.align||Align.C);
	}
};
