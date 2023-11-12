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

const removeOneFromClipboard = (dashboard: TDashboard, item: DashboardItem) => {
  dashboard = undoCutOne(dashboard, item);
  dashboard = undoCopyOne(dashboard, item);
  return dashboard;
}

const unselectOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "inclusive") {
    dashboard.selected = dashboard.selected.filter(thisItem => thisItem.id !== item.id);
  } else {
    dashboard = selectAll(dashboard);
    dashboard.selected = dashboard.selected.filter(thisItem => thisItem.id !== item.id);
  }

  return dashboard;
}

const resetSelection = (dashboard: TDashboard) => {
  return unselectMany(dashboard, dashboard.selected);
}

const selectOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "inclusive") {
    dashboard.selected.push(item);
  } else {
    dashboard.selected = [item];
  }

  return dashboard;
}

const unselectMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = selectAll(dashboard);
  }

  items.forEach(item => {
    dashboard = unselectOne(dashboard, item)
  });

  return dashboard;
}

const unselectAll = (dashboard: TDashboard) => {
  return unselectMany(dashboard, dashboard.displayedItems);
}

const selectMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = unselectAll(dashboard);
  }

  items.forEach(item => {
    dashboard = selectOne(dashboard, item)
  });

  return dashboard;
}

const selectAll = (dashboard: TDashboard) => {
  return selectMany(dashboard, dashboard.displayedItems);
}

const removeOne = (dashboard: TDashboard, item: DashboardItem) => {
  const parent = item.getParent();

  if (!item || !parent) {
    return dashboard;
  }

  parent.removeChild(item);
  item.setParent(null);
  dashboard = undisplayOne(dashboard, item);
  dashboard = removeOneFromClipboard(dashboard, item);
  dashboard = unselectOne(dashboard, item);

  return dashboard;
}

const removeMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  items.forEach(item => {
    dashboard = removeOne(dashboard, item);
  });
  return dashboard;
}

const keepDisplayedInFolderOrder = (dashboard: TDashboard) => {
  const { currentFolder, displayedItems } = dashboard;
  const childrenOfCurrentFolder = currentFolder.getChildren();

  dashboard.displayedItems = childrenOfCurrentFolder.filter(child => {
    const index = displayedItems.findIndex(displayedItem => displayedItem.id === child.id);
    return index !== -1;
  })

  return dashboard;
}

const addOne = (dashboard: TDashboard, item: DashboardItem) => {
  dashboard.currentFolder.addChild(item);
  item.setParent(dashboard.currentFolder);
  dashboard = displayOne(dashboard, item);
  return dashboard;
}

const displayOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (!dashboard.displayedItems.includes(item)) {
    if (behavior === "inclusive") {
      dashboard.displayedItems.push(item);
    } else {
      dashboard = undisplayAll(dashboard);
      dashboard.displayedItems = [item];
    }
  }

  dashboard = keepDisplayedInFolderOrder(dashboard);

  return dashboard;
}

const undisplayOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = displayAll(dashboard);
  }

  dashboard.displayedItems = dashboard.displayedItems.filter(displayedItem => displayedItem.id !== item.id);

  return dashboard;
}

const resetDisplay = (dashboard: TDashboard) => {
  return undisplayMany(dashboard, dashboard.displayedItems);
}

const displayFolder = (dashboard: TDashboard, folder: DashboardFolder) => {
  dashboard.displayedItems = folder.getChildren();
  return dashboard;
}

const cutOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  const parent = item.getParent();

  if (parent) {
    parent.removeChild(item);
    if (behavior === "inclusive") {
      dashboard.clipboard.cut.push(item);
    } else {
      dashboard.clipboard.cut = [item];
    }
  }

  return dashboard;
}

const undoCopyOne = (dashboard: TDashboard, item: DashboardItem) => {
  const copied = dashboard.clipboard.copied;
  dashboard.clipboard.copied = copied.filter(itemCopied => itemCopied.id !== item.id);

  return dashboard;
}

const undoCopyMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  items.forEach(item => {
    dashboard = undoCopyOne(dashboard, item);
  });

  return dashboard;
}

const undoCopyAll = (dashboard: TDashboard) => {
  return undoCopyMany(dashboard, dashboard.clipboard.copied);
}

const undoCutOne = (dashboard: TDashboard, item: DashboardItem) => {
  const itemsCut = dashboard.clipboard.cut;

  if (!itemsCut.find(itemCut => itemCut.id === item.id)) {
    return dashboard;
  }

  const parent = item.getParent();

  if (item && parent) {
    parent.addChild(item);
    dashboard.clipboard.cut = itemsCut.filter(itemCut => itemCut.id !== item.id);
  }

  return dashboard;
}

const undoCutMany = (dashboard: TDashboard, items: DashboardItem[]) => {
  items.forEach(item => {
    dashboard = undoCutOne(dashboard, item);
  });

  return dashboard;
}

const undoCutAll = (dashboard: TDashboard) => {
  return undoCutMany(dashboard, dashboard.clipboard.cut);
}

const cutMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = undoCutAll(dashboard);
  }

  items.forEach(item => {
    dashboard = cutOne(dashboard, item)
  });

  return dashboard;
}

const copyOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "inclusive") {
    dashboard.clipboard.copied.push(item);
  } else {
    dashboard.clipboard.copied = [item];
  }

  return dashboard;
}

const copyMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = undoCopyAll(dashboard);
  }

  items.forEach(item => {
    dashboard = copyOne(dashboard, item);
  });

  return dashboard;
}

const undisplayMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = displayAll(dashboard);
  }

  items.forEach(item => {
    dashboard = undisplayOne(dashboard, item);
  });

  return dashboard;
}

const undisplayAll = (dashboard: TDashboard) => {
  return undisplayMany(dashboard, dashboard.displayedItems);
}

const displayMany = (dashboard: TDashboard, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = undisplayAll(dashboard);
  }

  items.forEach(item => {
    dashboard = displayOne(dashboard, item)
  });

  return dashboard;
}

const displayAll = (dashboard: TDashboard) => {
  return displayFolder(dashboard, dashboard.currentFolder);
}

const resetClipboard = (dashboard: TDashboard) => {
  dashboard = resetClipboardCut(dashboard);
  dashboard = resetClipboardCopy(dashboard);
  return dashboard;
}

const paste = (dashboard: TDashboard, folder: DashboardFolder) => {
  const { cut, copied } = dashboard.clipboard;
  dashboard = resetClipboard(dashboard);

  cutItemsToFolder(cut, folder);
  dashboard = displayMany(dashboard, cut);

  const items = copyItemsToFolder(copied, folder);
  dashboard = displayMany(dashboard, items);

  return dashboard;
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
  dashboard.currentFolder = folder;
  dashboard.parentFolder = dashboard.currentFolder.getParent();
  dashboard.selected = [];
  dashboard = displayFolder(dashboard, dashboard.currentFolder);

  return dashboard;
}

const goBack = (dashboard: TDashboard) => {
  const parent = dashboard.parentFolder;
  if (parent) {
    dashboard = openFolder(dashboard, parent);
  }
  return dashboard;
}

const resetClipboardCopy = (dashboard: TDashboard) => {
  return undoCopyMany(dashboard, dashboard.clipboard.copied);
}

const resetClipboardCut = (dashboard: TDashboard) => {
  return undoCutMany(dashboard, dashboard.clipboard.cut);
}

const edit = (dashboard: TDashboard, item: DashboardItem, updatedFields: Partial<DashboardItem>) => {
  item.update(updatedFields);
  return dashboard;
}

const moveOne = (dashboard: TDashboard, item: DashboardItem, folder: DashboardFolder) => {
  item.getParent()?.moveChildToAnotherFolder(item, folder);
  dashboard = keepDisplayedInFolderOrder(dashboard);

  return dashboard;
}

const moveMany = (dashboard: TDashboard, items: DashboardItem[], folder: DashboardFolder) => {
  items.forEach(item => {
    dashboard = moveOne(dashboard, item, folder);
  });
  return dashboard;
}

const repositionOne = (dashboard: TDashboard, currentIndex: number, newIndex: number, strategy: "before" | "after") => {
  const { currentFolder } = dashboard;
  currentFolder.repositionChild(currentIndex, newIndex, strategy);
  dashboard = keepDisplayedInFolderOrder(dashboard);
  return dashboard;
};

const repositionMany = (dashboard: TDashboard, indexes: number[], newIndex: number, strategy: "before" | "after") => {
  const { currentFolder } = dashboard;
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
    dashboard = repositionOne(dashboard, index, newIndex, strategy);
  });

  return dashboard;
};

export const dashboardReducer = (dashboard: TDashboard, action: DashboardAction) => {
  dashboard = { ...dashboard };

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
