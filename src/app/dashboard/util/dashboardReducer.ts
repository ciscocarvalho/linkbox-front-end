import DashboardFolder from "../DashboardFolder";
import DashboardItem from "../DashboardItem";
import DashboardLink from "../DashboardLink";
import { DashboardAction, TDashboard } from "../types";

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

const updateDashboard = (oldDashboard: TDashboard, updater: (newDashboard: TDashboard) => TDashboard) => {
  const newDashboard = { ...oldDashboard };
  return updater(newDashboard);
}

const removeOneFromClipboard = (dashboard: TDashboard, item: DashboardItem) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard = undoCutOne(newDashboard, item);
    newDashboard = undoCopyOne(newDashboard, item);
    return newDashboard;
  });
}

const unselectOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "inclusive") {
      newDashboard.selected = newDashboard.selected.filter(thisItem => thisItem.id !== item.id);
    } else {
      newDashboard = selectAll(newDashboard);
      newDashboard.selected = newDashboard.selected.filter(thisItem => thisItem.id !== item.id);
    }

    return newDashboard;
  });
}

const resetSelection = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return unselectMany(newDashboard, newDashboard.selected);
  })
}

const selectOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "inclusive") {
      newDashboard.selected.push(item);
    } else {
      newDashboard.selected = [item];
    }

    return newDashboard;
  });
}

const unselectMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = selectAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = unselectOne(newDashboard, item)
    });

    return newDashboard;
  });
}

const unselectAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return unselectMany(newDashboard, newDashboard.displayedItems);
  });
}

const selectMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = unselectAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = selectOne(newDashboard, item)
    });

    return newDashboard;
  });
}

const selectAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return selectMany(newDashboard, newDashboard.displayedItems);
  });
}

const removeOne = (dashboard: TDashboard, item: DashboardItem) => {
  return updateDashboard(dashboard, newDashboard => {
    const parent = item.getParent();

    if (!item || !parent) {
      return newDashboard;
    }

    parent.removeChild(item);
    item.setParent(null);
    newDashboard = undisplayOne(newDashboard, item);
    newDashboard = removeOneFromClipboard(newDashboard, item);
    newDashboard = unselectOne(newDashboard, item);

    return newDashboard;
  });
}

const removeMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  return updateDashboard(dashboard, newDashboard => {
    items.forEach(item => {
      newDashboard = removeOne(newDashboard, item);
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
    newDashboard = displayOne(newDashboard, item);
    return newDashboard;
  });
}

const displayOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (!newDashboard.displayedItems.includes(item)) {
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

const undisplayOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = displayAll(newDashboard);
    }

    newDashboard.displayedItems = newDashboard.displayedItems.filter(displayedItem => displayedItem.id !== item.id);

    return newDashboard;
  });
}

const resetDisplay = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undisplayMany(newDashboard, newDashboard.displayedItems);
  });
}

const displayFolder = (dashboard: TDashboard, folder: DashboardFolder) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard.displayedItems = folder.getChildren();
    return newDashboard;
  });
}

const cutOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    const parent = item.getParent();

    if (parent) {
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

const undoCopyOne = (dashboard: TDashboard, item: DashboardItem) => {
  return updateDashboard(dashboard, newDashboard => {
    const copied = newDashboard.clipboard.copied;
    newDashboard.clipboard.copied = copied.filter(itemCopied => itemCopied.id !== item.id);

    return newDashboard;
  });
}

const undoCopyMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  return updateDashboard(dashboard, newDashboard => {
    items.forEach(item => {
      newDashboard = undoCopyOne(newDashboard, item);
    });

    return newDashboard;
  });
}

const undoCopyAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCopyMany(newDashboard, newDashboard.clipboard.copied);
  });
}

const undoCutOne = (dashboard: TDashboard, item: DashboardItem) => {
  return updateDashboard(dashboard, newDashboard => {
    const itemsCut = newDashboard.clipboard.cut;

    if (!itemsCut.find(itemCut => itemCut.id === item.id)) {
      return newDashboard;
    }

    const parent = item.getParent();

    if (item && parent) {
      parent.addChild(item);
      newDashboard.clipboard.cut = itemsCut.filter(itemCut => itemCut.id !== item.id);
    }

    return newDashboard;
  });
}

const undoCutMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  return updateDashboard(dashboard, newDashboard => {
    items.forEach(item => {
      newDashboard = undoCutOne(newDashboard, item);
    });

    return newDashboard;
  });
}

const undoCutAll = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCutMany(newDashboard, newDashboard.clipboard.cut);
  });
}

const cutMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undoCutAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = cutOne(newDashboard, item)
    });

    return newDashboard;
  });
}

const copyOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "inclusive") {
      dashboard.clipboard.copied.push(item);
    } else {
      dashboard.clipboard.copied = [item];
    }

    return newDashboard;
  });
}

const copyMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undoCopyAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = copyOne(newDashboard, item);
    });

    return newDashboard;
  });
}

const undisplayMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = displayAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = undisplayOne(newDashboard, item);
    });

    return newDashboard;
  });
}

const undisplayAll = (dashboard: TDashboard) => {
  return undisplayMany(dashboard, dashboard.displayedItems);
}

const displayMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  return updateDashboard(dashboard, newDashboard => {
    if (behavior === "exclusive") {
      newDashboard = undisplayAll(newDashboard);
    }

    items.forEach(item => {
      newDashboard = displayOne(newDashboard, item)
    });

    return newDashboard;
  });
}

const displayAll = (dashboard: TDashboard) => {
  return displayFolder(dashboard, dashboard.currentFolder);
}

const resetClipboard = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard = resetClipboardCut(newDashboard);
    newDashboard = resetClipboardCopy(newDashboard);
    return newDashboard;
  });
}

const paste = (dashboard: TDashboard, folder: DashboardFolder) => {
  return updateDashboard(dashboard, newDashboard => {
    const { cut, copied } = newDashboard.clipboard;
    newDashboard = resetClipboard(newDashboard);

    cutItemsToFolder(cut, folder);
    newDashboard = displayMany(newDashboard, cut);

    const items = copyItemsToFolder(copied, folder);
    newDashboard = displayMany(newDashboard, items);

    return newDashboard;
  });
}

const openLink = (dashboard: TDashboard, link: DashboardLink) => {
  let { url } = link;

  if (!!url && !/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
  }

  window.open(url, "_blank", "noopener noreferrer");

  return dashboard;
}

const openFolder = (dashboard: TDashboard, folder: DashboardFolder) => {
  return updateDashboard(dashboard, newDashboard => {
    newDashboard.currentFolder = folder;
    newDashboard.parentFolder = newDashboard.currentFolder.getParent();
    newDashboard.selected = [];
    newDashboard = displayFolder(newDashboard, newDashboard.currentFolder);

    return newDashboard;
  });
}

const goBack = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    const parent = newDashboard.parentFolder;
    if (parent) {
      newDashboard = openFolder(newDashboard, parent);
    }
    return newDashboard;
  });
}

const resetClipboardCopy = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCopyMany(newDashboard, newDashboard.clipboard.copied);
  });
}

const resetClipboardCut = (dashboard: TDashboard) => {
  return updateDashboard(dashboard, newDashboard => {
    return undoCutMany(newDashboard, newDashboard.clipboard.cut);
  });
}

const edit = (dashboard: TDashboard, item: DashboardItem, updatedFields: Partial<DashboardItem>) => {
  return updateDashboard(dashboard, newDashboard => {
    item.update(updatedFields);
    return newDashboard;
  });
}

const moveOne = (dashboard: TDashboard, item: DashboardItem, folder: DashboardFolder) => {
  return updateDashboard(dashboard, newDashboard => {
    item.getParent()?.moveChildToAnotherFolder(item, folder);
    newDashboard = keepDisplayedInFolderOrder(newDashboard);

    return newDashboard;
  });
}

const moveMany = (dashboard: TDashboard, items: DashboardItem[], folder: DashboardFolder) => {
  return updateDashboard(dashboard, newDashboard => {
    items.forEach(item => {
      newDashboard = moveOne(newDashboard, item, folder);
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
      return removeOne(dashboard, action.item);
    }
    case "remove_many": {
      return removeMany(dashboard, action.items);
    }
    case "reset_selection": {
      return resetSelection(dashboard);
    }
    case "select": {
      return selectOne(dashboard, action.item, action.behavior);
    }
    case "unselect": {
      return unselectOne(dashboard, action.item, action.behavior);
    }
    case "select_many": {
      return selectMany(dashboard, action.items, action.behavior);
    }
    case "unselect_many": {
      return unselectMany(dashboard, action.items, action.behavior);
    }
    case "display": {
      return displayOne(dashboard, action.item, action.behavior);
    }
    case "undisplay": {
      return undisplayOne(dashboard, action.item, action.behavior);
    }
    case "reset_clipboard": {
      return resetClipboard(dashboard);
    }
    case "cut": {
      return cutOne(dashboard, action.item, action.behavior);
    }
    case "cut_many": {
      return cutMany(dashboard, action.items, action.behavior);
    }
    case "copy": {
      return copyOne(dashboard, action.item, action.behavior);
    }
    case "copy_many": {
      return copyMany(dashboard, action.items, action.behavior);
    }
    case "paste": {
      return paste(dashboard, action.folder);
    }
    case "open_link": {
      return openLink(dashboard, action.link);
    }
    case "open_folder": {
      return openFolder(dashboard, action.folder);
    }
    case "go_back": {
      return goBack(dashboard);
    }
    case "undisplay_many": {
      return undisplayMany(dashboard, action.items, action.behavior);
    }
    case "display_many": {
      return displayMany(dashboard, action.items, action.behavior);
    }
    case "reset_display": {
      return resetDisplay(dashboard);
    }
    case "display_folder": {
      return displayFolder(dashboard, action.folder);
    }
    case "reset_clipboard_copy": {
      return resetClipboardCopy(dashboard);
    }
    case "reset_clipboard_cut": {
      return resetClipboardCut(dashboard);
    }
    case "undo_copy": {
      return undoCopyOne(dashboard, action.item);
    }
    case "undo_cut": {
      return undoCutOne(dashboard, action.item);
    }
    case "edit": {
      return edit(dashboard, action.item, action.updatedFields);
    }
    case "move": {
      return moveOne(dashboard, action.item, action.folder);
    }
    case "move_many": {
      return moveMany(dashboard, action.items, action.folder);
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
