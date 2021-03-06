
import {Widget} from "./widget";
import {WidgetFactory} from "./widget-factory";
import {WidgetRecyclableCreator} from "./widget-recyclable-creator";

export class Page extends Widget {
	constructor(type?:string) {
		super(type||Page.TYPE);
	}

	public static TYPE = "page";
	private static recycleBin = WidgetRecyclableCreator.create(Page);
	public static create(options?:any) : Page {
		return <Page>Page.recycleBin.create(options);
	}
};

WidgetFactory.register(Page.TYPE, Page.create);

