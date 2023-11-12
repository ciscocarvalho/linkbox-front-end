import DashboardItem from "./DashboardItem";
import { reorderArray } from "./reorderArray";

class DashboardFolder extends DashboardItem {
    name?: string;
    private children: DashboardItem[] = [];

    constructor(name?: string, backgroundColor?: string, children?: DashboardItem[]) {
        super();

        this.name = name;
        this.backgroundColor = backgroundColor;

        if (Array.isArray(children)) {
            this.setChildren(children);
        }
    }

    clone() {
        const clonedFolder = new DashboardFolder(this.name, this.backgroundColor, this.getChildren());
        clonedFolder.setParent(this.getParent());
        return clonedFolder;
    }

    isRoot() {
        return !this.getParent();
    }

    private setChildren(children: DashboardItem[]) {
        this.children = children
    }

    update(updatedFields: Partial<DashboardFolder>) {
        if (updatedFields.name) {
            this.name = updatedFields.name;
        }

        if (updatedFields.backgroundColor) {
            this.backgroundColor = updatedFields.backgroundColor;
        }
    }

    getChildren() {
        return [...this.children];
    }

    remove() {
    }

    removeChild(child: DashboardItem) {
        this.setChildren(this.children.filter(v => v !== child))
        child.setParent(null);
    }

    moveChildToAnotherFolder(child: DashboardItem, folder: DashboardFolder) {
        if (!this.contains(child)) return;

        this.removeChild(child);
        folder.addChild(child);
    }

    addChild(child: DashboardItem) {
        this.children.push(child);
        child.setParent(this);
    }

    getChildIndex(child: DashboardItem) {
        const targetChild = child;
        return this.children.findIndex(child => child === targetChild);
    }

    repositionChild(currentIndex: number, newIndex: number, strategy: "before" | "after") {
        reorderArray(this.children, currentIndex, newIndex, strategy);
    }

    contains(item: DashboardItem) {
        for (const child of this.children) {
            if (child === item) return true;
        }

        return false;
    }
}

export default DashboardFolder;