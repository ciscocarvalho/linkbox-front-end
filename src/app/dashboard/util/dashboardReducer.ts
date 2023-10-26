import DashboardFolder from "../DashboardFolder";
import DashboardItem from "../DashboardItem";
import DashboardLink from "../DashboardLink";
import { DashboardAction, DashboardItemID, TDashboard } from "../types";
import { mapItemsToItemIDs } from "../util";

type Behavior = "inclusive" | "exclusive";

const DEFAULT_BEHAVIOR = "inclusive";

const removeItemFromParent = (item: DashboardItem) => {
  const parent = item.getParent();
  parent?.removeChild(item);
  item.setParent(null);
}

const cutItemsToFolder = (items: DashboardItem[], folder: DashboardFolder) => {
  items.forEach(item => {
    removeItemFromParent(item);
  });

  items.forEach(item => {
    folder.addChild(item);
    item.setParent(folder);
  });
}

const copyItemsToFolder = (items: DashboardItem[], folder: DashboardFolder) => {
  const copiedItems = items.map(item => item.clone());
  copiedItems.forEach(item => cutItemsToFolder([item], folder));
  return copiedItems;
}

const traverseUpFolder = (folder: DashboardFolder, fn: (folder: DashboardFolder) => boolean | void) => {
  let currentFolder = folder;

  while (true) {
    const stopTraversal = fn(currentFolder);

    if (stopTraversal) {
      break;
    }

    const parent = currentFolder.getParent();

    if (parent) {
      currentFolder = parent;
    } else {
      break;
    }
  }
}

const traverseDownFolder = (folder: DashboardFolder, fn: (folder: DashboardFolder) => boolean | void) => {
  let currentFolder = folder;

  const stopTraversal = fn(currentFolder);

  if (stopTraversal) {
    return;
  }

  const children = currentFolder.getChildren();
  const subfolders = children.filter((item: DashboardItem) => item instanceof DashboardFolder);

  for (let subfolder of subfolders as DashboardFolder[]) {
    traverseDownFolder(subfolder, fn);
  }
}

const getDashboardRoot = (dashboard: TDashboard) => {
  let root = dashboard.currentFolder;

  traverseUpFolder(root, subFolder => {
    const parent = subFolder.getParent();
    if (parent) {
      root = parent;
    } else {
      return true;
    }
  })

  return root;
}

const traverseDashboard = (dashboard: TDashboard, fn: (folder: DashboardFolder) => boolean | void) => {
  const root = getDashboardRoot(dashboard);
  traverseDownFolder(root, fn);
}

const isRoot = (folder: DashboardFolder) => {
  return folder.getParent() === null;
}

const findInDashboard = (dashboard: TDashboard, predicate: Function) => {
  let result: DashboardItem | null = null;

  traverseDashboard(dashboard, (folder) => {
    let item;

    if (isRoot(folder)) {
      item = [folder].find((item) => predicate(item));

      if (item) {
        result = item;
        return;
      }
    }

    item = folder.getChildren().find((item) => predicate(item));

    if (item) {
      result = item;
    }
  });

  return result as DashboardItem | null;
}

const updateDashboard = (oldDashboard: TDashboard, updater: (newDashboard: TDashboard) => TDashboard) => {
  const newDashboard = { ...oldDashboard };
  return updater(newDashboard);
}

const removeOneFromClipboard = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard = undoCutOne(newDashboard, itemID);
    newDashboard = undoCopyOne(newDashboard, itemID);
    return newDashboard;
  });
}

const unselectOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "inclusive") {
      newDashboard.selected = newDashboard.selected.filter(item => item.id !== itemID);
    } else {
      newDashboard = selectAll(newDashboard);
      newDashboard.selected = newDashboard.selected.filter(item => item.id !== itemID);
    }

    return newDashboard;
  });
}

const resetSelection = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return unselectMany(newDashboard, mapItemsToItemIDs(newDashboard.selected));
  })
}

const selectOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);

    if (!item) {
      return newDashboard;
    } else if (behavior === "inclusive") {
      newDashboard.selected.push(item);
    } else {
      newDashboard.selected = [item];
    }

    return newDashboard;
  });
}

const unselectMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = selectAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = unselectOne(newDashboard, itemID) });
    return newDashboard;
  });
}

const unselectAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return unselectMany(newDashboard, mapItemsToItemIDs(newDashboard.displayedItems));
  });
}

const selectMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = unselectAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = selectOne(newDashboard, itemID) });

    return newDashboard;
  });
}

const selectAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return selectMany(newDashboard, mapItemsToItemIDs(newDashboard.displayedItems));
  });
}

const findByIDInDashboard = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return findInDashboard(dashboard, (item: DashboardItem) => {
    return item.id === itemID;
  });
}

const removeOne = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);
    const parent = item?.getParent();

    if (!item || !parent) {
      return newDashboard;
    }

    parent.removeChild(item);
    item.setParent(null);
    newDashboard = undisplayOne(newDashboard, item.id);
    newDashboard = removeOneFromClipboard(newDashboard, item.id);
    newDashboard = unselectOne(newDashboard, item.id);

    return newDashboard;
  });
}

const removeMany = (dashboard: TDashboard, itemIDs: DashboardItemID[]) => {
  return updateDashboard(dashboard, newDashboard => {
    itemIDs.forEach(itemID => {
      newDashboard = removeOne(newDashboard, itemID);
    });
    return newDashboard;
  })
}

const keepDisplayedInFolderOrder = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    const { currentFolder, displayedItems } = newDashboard;
    const childrenOfCurrentFolder = currentFolder.getChildren();

    newDashboard.displayedItems = childrenOfCurrentFolder.filter(child => {
      const index = displayedItems.findIndex(displayedItem => displayedItem.id === child.id);
      return index !== -1;
    })

    return newDashboard;
  })
}

const addOne = (dashboard: TDashboard, item: DashboardItem) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard.currentFolder.addChild(item);
    item.setParent(newDashboard.currentFolder);
    newDashboard = displayOne(newDashboard, item.id);
    return newDashboard;
  });
}

const displayOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);

    if (item && !newDashboard.displayedItems.includes(item)) {
      if (behavior === "inclusive") {
        newDashboard.displayedItems.push(item);
      } else {
        newDashboard = undisplayAll(newDashboard);
        newDashboard.displayedItems = [item];
      }
    }

    newDashboard = keepDisplayedInFolderOrder(newDashboard);

    return newDashboard;
  });
}

const undisplayOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = displayAll(newDashboard);
    }

    newDashboard.displayedItems = newDashboard.displayedItems.filter(item => item.id !== itemID);

    return newDashboard;
  });
}

const resetDisplay = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undisplayMany(newDashboard, mapItemsToItemIDs(newDashboard.displayedItems));
  });
}

const displayFolder = (dashboard: TDashboard, folderID: DashboardFolder["id"]) => {
  return updateDashboard(dashboard, newDashboard => {
    const folder = findByIDInDashboard(newDashboard, folderID) as DashboardFolder;

    if (!folder) {
      return newDashboard;
    }

    newDashboard.displayedItems = folder.getChildren();
    return newDashboard;
  });
}

const cutOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);
    const parent = item?.getParent();

    if (item && parent) {
      parent.removeChild(item);
      if (behavior === "inclusive") {
        newDashboard.clipboard.cut.push(item);
      } else {
        newDashboard.clipboard.cut = [item];
      }
    }

    return newDashboard;
  });
}

const undoCopyOne = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);

    if (item) {
      const copied = newDashboard.clipboard.copied;
      newDashboard.clipboard.copied = copied.filter(itemCopied => itemCopied.id !== item.id);
    }

    return newDashboard;
  });
}

const undoCopyMany = (dashboard: TDashboard, itemIDs: DashboardItemID[]) => {
  return updateDashboard(dashboard, newDashboard => {
    itemIDs.forEach(itemID => { newDashboard = undoCopyOne(newDashboard, itemID) });
    return newDashboard;
  });
}

const undoCopyAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCopyMany(newDashboard, mapItemsToItemIDs(newDashboard.clipboard.copied));
  });
}

const undoCutOne = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return updateDashboard(dashboard, newDashboard => {
    const itemsCut = newDashboard.clipboard.cut;
    const item = itemsCut.find(itemCut => itemCut.id === itemID);
    const parent = item?.getParent();

    if (item && parent) {
      parent.addChild(item);
      newDashboard.clipboard.cut = itemsCut.filter(itemCut => itemCut.id !== item.id);
    }

    return newDashboard;
  });
}

const undoCutMany = (dashboard: TDashboard, itemIDs: DashboardItemID[]) => {
  return updateDashboard(dashboard, newDashboard => {
    itemIDs.forEach(itemID => { newDashboard = undoCutOne(newDashboard, itemID) });
    return newDashboard;
  });
}

const undoCutAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCutMany(newDashboard, mapItemsToItemIDs(newDashboard.clipboard.cut));
  });
}

const cutMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undoCutAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = cutOne(newDashboard, itemID) });

    return newDashboard;
  });
}

const copyOne = (dashboard: TDashboard, itemID: DashboardItemID, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);

    if (item) {
      if (behavior === "inclusive") {
        dashboard.clipboard.copied.push(item);
      } else {
        dashboard.clipboard.copied = [item];
      }
    }

    return newDashboard;
  });
}

const copyMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undoCopyAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = copyOne(newDashboard, itemID) });
    return newDashboard;
  });
}

const undisplayMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = displayAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = undisplayOne(newDashboard, itemID) });

    return newDashboard;
  });
}

const undisplayAll = (dashboard: TDashboard) => {
  return undisplayMany(dashboard, mapItemsToItemIDs(dashboard.displayedItems));
}

const displayMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undisplayAll(newDashboard);
    }

    itemIDs.forEach(itemID => { newDashboard = displayOne(newDashboard, itemID) });

    return newDashboard;
  });
}

const displayAll = (dashboard: TDashboard) => {
  return displayFolder(dashboard, dashboard.currentFolder.id);
}

const resetClipboard = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard = resetClipboardCut(newDashboard);
    newDashboard = resetClipboardCopy(newDashboard);
    return newDashboard;
  });
}

const paste = (dashboard: TDashboard, folderID: DashboardFolder["id"]) => {
  return updateDashboard(dashboard, newDashboard => {
    const folder = findByIDInDashboard(newDashboard, folderID) as DashboardFolder;

    if (!folder) {
      return newDashboard;
    }

    const { cut, copied } = newDashboard.clipboard;
    newDashboard = resetClipboard(newDashboard);

    cutItemsToFolder(cut, folder);
    newDashboard = displayMany(newDashboard, mapItemsToItemIDs(cut));

    const items = copyItemsToFolder(copied, folder);
    newDashboard = displayMany(newDashboard, mapItemsToItemIDs(items));

    return newDashboard;
  });
}

const openLink = (dashboard: TDashboard, linkID: DashboardLink["id"]) => {
  const link = findByIDInDashboard(dashboard, linkID) as DashboardLink;

  if (!link) {
    return dashboard;
  }

  let { url } = link;

  if (!!url && !/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
  }

  window.open(url, "_blank", "noopener noreferrer");

  return dashboard;
}

const openFolder = (dashboard: TDashboard, folderID: DashboardFolder["id"]) => {
  return updateDashboard(dashboard, newDashboard => {
    const folder = findByIDInDashboard(newDashboard, folderID) as DashboardFolder;

    if (folder) {
      newDashboard.currentFolder = folder;
      newDashboard.parentFolder = newDashboard.currentFolder.getParent();
      newDashboard.selected = [];
      newDashboard = displayFolder(newDashboard, newDashboard.currentFolder.id);
    }

    return newDashboard;
  });
}

const goBack = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    const parentID = newDashboard.parentFolder?.id;
    if (parentID !== undefined) {
      newDashboard = openFolder(newDashboard, parentID);
    }
    return newDashboard;
  });
}

const resetClipboardCopy = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCopyMany(newDashboard, mapItemsToItemIDs(newDashboard.clipboard.copied));
  });
}

const resetClipboardCut = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCutMany(newDashboard, mapItemsToItemIDs(newDashboard.clipboard.cut));
  });
}

const edit = (dashboard: TDashboard, itemID: DashboardItemID, updatedFields: Partial<DashboardItem>) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);

    if (item) {
      item.update(updatedFields);
    }

    return newDashboard;
  });
}

const moveOne = (dashboard: TDashboard, itemID: DashboardItemID, folderID: DashboardFolder["id"]) => {
  return updateDashboard(dashboard, newDashboard => {
    const item = findByIDInDashboard(newDashboard, itemID);
    const folder = findByIDInDashboard(newDashboard, folderID) as DashboardFolder;

    if (!item || !folder) {
      return newDashboard;
    }

    item.getParent()?.moveChildToAnotherFolder(item, folder);
    newDashboard = keepDisplayedInFolderOrder(newDashboard);

    return newDashboard;
  });
}

const moveMany = (dashboard: TDashboard, itemIDs: DashboardItemID[], folderID: DashboardFolder["id"]) => {
  return updateDashboard(dashboard, newDashboard => {
    itemIDs.forEach(itemID => {
      newDashboard = moveOne(newDashboard, itemID, folderID);
    });
    return newDashboard;
  })
}

const repositionOne = (dashboard: TDashboard, currentIndex: number, newIndex: number, strategy: "before" | "after") => {
  return updateDashboard(dashboard, newDashboard => {
    const { currentFolder } = newDashboard;
    currentFolder.repositionChild(currentIndex, newIndex, strategy);
    newDashboard = keepDisplayedInFolderOrder(newDashboard);
    return newDashboard;
  });
};

const repositionMany = (dashboard: TDashboard, indexes: number[], newIndex: number, strategy: "before" | "after") => {
  return updateDashboard(dashboard, newDashboard => {
    const { currentFolder } = newDashboard;
    const children = currentFolder.getChildren();
    const smallestIndex = Math.min(...indexes);
    const movingBack = newIndex <= smallestIndex;

    if (movingBack) {
      indexes = indexes.toReversed();
    }

    const items = indexes.map(index => children[index]);

    const getItemIndex = (item: DashboardItem) => {
      const children = currentFolder.getChildren();
      return children.findIndex(child => child.id === item.id);
    }

    items.forEach(item => {
      const index = getItemIndex(item);
      newDashboard = repositionOne(newDashboard, index, newIndex, strategy);
    });

    return newDashboard;
  })
};

export const dashboardReducer = (dashboard: TDashboard, action: DashboardAction) => {
  switch (action.type) {
    case "add": {
      return addOne(dashboard, action.item)
    }
    case "remove": {
      return removeOne(dashboard, action.itemID);
    }
    case "remove_many": {
      return removeMany(dashboard, action.itemIDs);
    }
    case "reset_selection": {
      return resetSelection(dashboard);
    }
    case "select": {
      return selectOne(dashboard, action.itemID, action.behavior);
    }
    case "unselect": {
      return unselectOne(dashboard, action.itemID, action.behavior);
    }
    case "select_many": {
      return selectMany(dashboard, action.itemIDs, action.behavior);
    }
    case "unselect_many": {
      return unselectMany(dashboard, action.itemIDs, action.behavior);
    }
    case "display": {
      return displayOne(dashboard, action.itemID, action.behavior);
    }
    case "undisplay": {
      return undisplayOne(dashboard, action.itemID, action.behavior);
    }
    case "reset_clipboard": {
      return resetClipboard(dashboard);
    }
    case "cut": {
      return cutOne(dashboard, action.itemID, action.behavior);
    }
    case "cut_many": {
      return cutMany(dashboard, action.itemIDs, action.behavior);
    }
    case "copy": {
      return copyOne(dashboard, action.itemID, action.behavior);
    }
    case "copy_many": {
      return copyMany(dashboard, action.itemIDs, action.behavior);
    }
    case "paste": {
      return paste(dashboard, action.folderID);
    }
    case "open_link": {
      return openLink(dashboard, action.linkID);
    }
    case "open_folder": {
      return openFolder(dashboard, action.folderID);
    }
    case "go_back": {
      return goBack(dashboard);
    }
    case "undisplay_many": {
      return undisplayMany(dashboard, action.itemIDs, action.behavior);
    }
    case "display_many": {
      return displayMany(dashboard, action.itemIDs, action.behavior);
    }
    case "reset_display": {
      return resetDisplay(dashboard);
    }
    case "display_folder": {
      return displayFolder(dashboard, action.folderID);
    }
    case "reset_clipboard_copy": {
      return resetClipboardCopy(dashboard);
    }
    case "reset_clipboard_cut": {
      return resetClipboardCut(dashboard);
    }
    case "undo_copy": {
      return undoCopyOne(dashboard, action.itemID);
    }
    case "undo_cut": {
      return undoCutOne(dashboard, action.itemID);
    }
    case "edit": {
      return edit(dashboard, action.itemID, action.updatedFields);
    }
    case "move": {
      return moveOne(dashboard, action.itemID, action.folderID);
    }
    case "move_many": {
      return moveMany(dashboard, action.itemIDs, action.folderID);
    }
    case "reposition": {
      return repositionOne(dashboard, action.currentIndex, action.newIndex, action.strategy );
    }
    case "reposition_many": {
      return repositionMany(dashboard, action.indexes, action.newIndex, action.strategy );
    }
    default: {
      return dashboard;
    }
  }
};
