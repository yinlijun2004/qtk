
import Events = require("../events");
import {KeyEvent} from "../key-event";
import {Widget} from "../controls/widget";
import {Behavior, BehaviorFactory} from "./behavior";
import inputEventAdapter = require("../input-event-adapter");

/**
 * 让Widget具有拖放功能的拖动功能。
 * 
 */
export class Draggable extends Behavior {
	private dragging : boolean;
	private onDrawDragging : Function;

	protected init(options:any) {
		this.onDrawDragging = function(evt:Events.DrawEvent) {
			var ctx = evt.ctx;
			var win = evt.widget;
			var p = win.pointerPosition;
			var e = Events.DragEvent.get(Events.DRAGSTART);
			var image = e.dataTransfer.dragImage;
			
			if(image) {
				if(image.draw) {
					image.draw(ctx, p.x, p.y);
				}
			}else{
				ctx.fillStyle = "green";
				ctx.fillRect(p.x, p.y, 10, 10);
			}
		}
	}

	protected onCancelled() {
		var widget = this.widget;
		widget.win.requestRedraw();
		Events.DragEvent.isDragging = false;
		widget.win.off(Events.AFTER_DRAW, this.onDrawDragging);
		widget.dispatchEvent(Events.DragEvent.get(Events.DRAGEND));
	}

	protected onKeyDownGlobal(evt:CustomEvent) {
		var keyCode = evt.detail.keyCode;
		if(keyCode === KeyEvent.VK_ESCAPE && this.dragging) {
			this.dragging = false;
			this.onCancelled();
		}
	}

	protected onPointerDown(evt:Events.PointerEvent){
		this.widget.win.on(Events.AFTER_DRAW, this.onDrawDragging);
	}
	
	protected onPointerUp(evt:Events.PointerEvent){
		if(this.dragging) {
			this.dragging = false;
			Events.DragEvent.isDragging = false;
			this.widget.dispatchEvent(Events.DragEvent.get(Events.DRAGEND));
			this.widget.win.off(Events.AFTER_DRAW, this.onDrawDragging);
		}
	}

	protected onPointerMove(evt:Events.PointerEvent){
		if(evt.pointerDown && !this.dragging) {
			this.dragging = true;
			Events.DragEvent.isDragging = true;
			this.widget.dispatchEvent(Events.DragEvent.get(Events.DRAGSTART));
		}

		if(evt.pointerDown) {
			this.widget.win.requestRedraw();
		}
	}

	constructor(widget:Widget, options:any) {
		super(Draggable.TYPE, widget, options);
	};

	public static TYPE = "draggable";
}

BehaviorFactory.register(Draggable.TYPE, function(widget:Widget, options:any) {
	return new Draggable(widget, options);
});


