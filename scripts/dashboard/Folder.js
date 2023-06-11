import ManageableItem from "./ManageableItem.js";

class Folder extends ManageableItem {
    #children = [];

    constructor(name, backgroundColor, children) {
        super();

        this.name = name;
        this.backgroundColor = backgroundColor

        if (Array.isArray(children)) {
            this.#setChildren(children);
        }
    }

    #setChildren(children) {
        this.#children = children
    }

    getChildren() {
        return this.#children;
    }

    removeChild(child) {
        this.#setChildren(this.getChildren().filter(v => v !== child))
    }

    addChild(child) {
        this.getChildren().push(child);
    }
}

export default Folder;