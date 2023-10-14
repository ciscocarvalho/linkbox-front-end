import DashboardItem from "./DashboardItem";

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
    }

    moveChildToAnotherFolder(child: DashboardItem, folder: DashboardFolder) {
        if (!this.contains(child)) return;

        folder.addChild(child);
        this.removeChild(child);
    }

    addChild(child: DashboardItem) {
        this.children.push(child);
    }

    getChildIndex(child: DashboardItem) {
        const targetChild = child;
        return this.children.findIndex(child => child === targetChild);
    }

    moveChild(child: DashboardItem, index: number) {
        let children = this.children;
        const childIndex = this.getChildIndex(child);
        if (childIndex === index) return;
        children[childIndex] = null as any;

        let leftChildren = children.slice(0, index);
        let rightChildren = children.slice(index);

        children = [...leftChildren, child, ...rightChildren];
        children = children.filter(child => child !== null);

        this.setChildren(children);
    }

    contains(item: DashboardItem) {
        for (const child of this.children) {
            if (child === item) return true;
        }

        return false;
    }
}

export default DashboardFolder;