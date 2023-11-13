import DashboardFolder from "./DashboardFolder";
import { checkItemID } from "./util";

abstract class DashboardItem {
    private static items: DashboardItem[] = [];
    private static currentId = 0;
    private parent: DashboardFolder | null;
    readonly id;
    backgroundColor?: string;

    constructor() {
        DashboardItem.items.push(this);
        this.parent = null;
        this.id = DashboardItem.currentId;
        DashboardItem.currentId++;
    }

    setParent(parent: typeof this.parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    getId() {
        return this.id;
    }

    abstract update(...args: any): any;

    abstract clone(): DashboardItem;

    static getById(id: number) {
        return DashboardItem.items.find(item => checkItemID(item, id));
    }
}

export default DashboardItem;