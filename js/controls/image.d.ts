import { Style } from "../style";
import { WidgetState, Widget } from "./widget";
import { ImageTile, ImageDrawType } from "../image-tile";
/**
 * 图片控件。
 */
export declare class Image extends Widget {
    private _style;
    constructor();
    image: ImageTile;
    drawType: ImageDrawType;
    value: string;
    setStyle(state: WidgetState, style: Style): Widget;
    reset(type: string): Widget;
    getStyle(): Style;
    static TYPE: string;
    private static recycleBin;
    static create(options?: any): Image;
}