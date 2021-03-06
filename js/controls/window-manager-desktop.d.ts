import { Widget } from "./widget";
import Events = require("../events");
import { WindowManager } from "./window-manager";
import { IWindowManager } from "./iwindow-manager";
export declare class WindowManagerDesktop extends WindowManager implements IWindowManager {
    constructor();
    createCanvas(): Widget;
    protected onWindowCreated(evt: Events.WindowEvent): void;
    static TYPE: string;
    private static recycleBin;
    static create(options?: any): WindowManagerDesktop;
}
