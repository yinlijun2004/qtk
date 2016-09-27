import { Widget } from "../controls/widget";
export declare class TitleValue extends Widget {
    protected _title: string;
    protected _titleW: string;
    protected _valueW: string;
    protected _titleWidget: Widget;
    protected _valueWidget: Widget;
    protected _valueWidgetCreator: Function;
    constructor(type?: string);
    title: string;
    titleW: string;
    valueW: string;
    readonly titleWidget: Widget;
    readonly valueWidget: Widget;
    value: any;
    protected createValueWidget(options?: any): Widget;
    protected onInit(): void;
    reset(type: string): Widget;
    dispose(): void;
}
