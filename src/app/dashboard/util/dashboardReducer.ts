import { DashboardAction, DashboardFolder, DashboardItem, DashboardLink, DashboardView } from "../types";
import { arraySwap, checkItemID, compareItems, getItemID, includesItem, itemIsInFolder } from "../util";
import { getChildren } from "./actions/getChildren";

type Behavior = "inclusive" | "exclusive";

const DEFAULT_BEHAVIOR = "inclusive";

const removeOneFromClipboard = (
  dashboard: DashboardView,
  item: DashboardItem
) => {
  dashboard = undoCutOne(dashboard, item);
  dashboard = undoCopyOne(dashboard, item);
  return dashboard;
};

const unselectOne = (
  dashboard: DashboardView,
  item: DashboardItem,
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = selectAll(dashboard);
  }

  dashboard.selected = dashboard.selected.filter(
    (thisItem) => !compareItems(thisItem, item)
  );

  return dashboard;
};

const resetSelection = (dashboard: DashboardView) => {
  return unselectMany(dashboard, dashboard.selected);
};

const selectOne = (
  dashboard: DashboardView,
  item: DashboardItem,
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "inclusive") {
    if (!includesItem(dashboard.selected, item)) {
      dashboard.selected.push(item);
    }
  } else {
    dashboard.selected = [item];
  }

  return dashboard;
};

const unselectMany = (
  dashboard: DashboardView,
  items: DashboardItem[],
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = selectAll(dashboard);
  }

  items.forEach((item) => {
    dashboard = unselectOne(dashboard, item);
  });

  return dashboard;
};

const unselectAll = (dashboard: DashboardView) => {
  return unselectMany(dashboard, dashboard.displayedItems);
};

const selectMany = (
  dashboard: DashboardView,
  items: DashboardItem[],
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = unselectAll(dashboard);
  }

  items.forEach((item) => {
    dashboard = selectOne(dashboard, item);
  });

  return dashboard;
};

const selectAll = (dashboard: DashboardView) => {
  return selectMany(dashboard, dashboard.displayedItems);
};

const removeOne = (dashboard: DashboardView, item: DashboardItem) => {
  dashboard = undisplayOne(dashboard, item);
  dashboard = removeOneFromClipboard(dashboard, item);
  dashboard = unselectOne(dashboard, item);
  return dashboard;
};

const refresh = (dashboard: DashboardView) => {
  return displayFolder(dashboard, dashboard.currentFolder);
};

const changeUpdatingItem = (dashboard: DashboardView, item?: DashboardItem) => {
  dashboard.updatingItem = item;
  return dashboard;
}

const displayOne = (
  dashboard: DashboardView,
  item: DashboardItem,
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = undisplayAll(dashboard);
    dashboard.displayedItems = [item];
  } else if (!includesItem(dashboard.displayedItems, item)) {
    const currentFolder = dashboard.currentFolder;
    const inCurrentFolder = itemIsInFolder(item, currentFolder);

    if (inCurrentFolder) {
      const parentChildren = getChildren(currentFolder);
      const index = parentChildren.findIndex((child) => checkItemID(child, getItemID(item)));
      const displayedItems = dashboard.displayedItems;
      displayedItems.unshift(item);

      for (let i = 0; i < Math.min(index, displayedItems.length - 1); i++) {
        arraySwap(displayedItems, i, i + 1);
      }

    } else {
      dashboard.displayedItems.push(item);
    }
  }

  return dashboard;
};

const undisplayOne = (dashboard: DashboardView, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = displayAll(dashboard);
  }

  dashboard.displayedItems = dashboard.displayedItems.filter(displayedItem => !compareItems(displayedItem, item));

  return dashboard;
}

const resetDisplay = (dashboard: DashboardView) => {
  return undisplayMany(dashboard, dashboard.displayedItems);
}

const displayFolder = (dashboard: DashboardView, folder: DashboardFolder) => {
  dashboard.currentFolder = folder;
  dashboard.displayedItems = getChildren(folder);
  return dashboard;
}

const cutOne = (
  dashboard: DashboardView,
  item: DashboardItem,
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = displayMany(dashboard, dashboard.clipboard.cut, "inclusive");
    dashboard.clipboard.cut = [item];
    dashboard = undisplayOne(dashboard, item);
  } else if (!includesItem(dashboard.clipboard.cut, item)) {
    dashboard.clipboard.cut.push(item);
    dashboard = undisplayOne(dashboard, item, "inclusive");
  }

  return dashboard;
};

const undoCopyOne = (dashboard: DashboardView, item: DashboardItem) => {
  const copied = dashboard.clipboard.copied;
  dashboard.clipboard.copied = copied.filter(
    (itemCopied) => !compareItems(itemCopied, item)
  );
  return dashboard;
};

const undoCopyMany = (dashboard: DashboardView, items: DashboardItem[]) => {
  items.forEach((item) => {
    dashboard = undoCopyOne(dashboard, item);
  });

  return dashboard;
};

const undoCopyAll = (dashboard: DashboardView) => {
  return undoCopyMany(dashboard, dashboard.clipboard.copied);
};

const undoCutOne = (dashboard: DashboardView, item: DashboardItem) => {
  const itemsCut = dashboard.clipboard.cut;
  const affected: DashboardItem[] = [];

  dashboard.clipboard.cut = itemsCut.filter(
    (itemCut) => {
      const shouldRemove = compareItems(itemCut, item)

      if (shouldRemove) {
        affected.push(itemCut);
      }

      return !shouldRemove;
    }
  );

  affected.forEach((item) => {
    if (itemIsInFolder(item, dashboard.currentFolder)) {
      dashboard = displayOne(dashboard, item, "inclusive");
    }
  })

  return dashboard;
};

const undoCutMany = (dashboard: DashboardView, items: DashboardItem[]) => {
  items.forEach((item) => {
    dashboard = undoCutOne(dashboard, item);
  });

  return dashboard;
};

const undoCutAll = (dashboard: DashboardView) => {
  return undoCutMany(dashboard, dashboard.clipboard.cut);
};

const cutMany = (
  dashboard: DashboardView,
  items: DashboardItem[],
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard = undoCutAll(dashboard);
  }

  items.forEach((item) => {
    dashboard = cutOne(dashboard, item);
  });

  return dashboard;
};

const copyOne = (
  dashboard: DashboardView,
  item: DashboardItem,
  behavior: Behavior = DEFAULT_BEHAVIOR
) => {
  if (behavior === "exclusive") {
    dashboard.clipboard.copied = [item];
  } else if (!includesItem(dashboard.clipboard.copied, item)) {
    dashboard.clipboard.copied.push(item);
  }

  return dashboard;
};

const copyMany = (dashboard: DashboardView, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = undoCopyAll(dashboard);
  }

  items.forEach(item => {
    dashboard = copyOne(dashboard, item);
  });

  return dashboard;
}

const undisplayMany = (dashboard: DashboardView, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = displayAll(dashboard);
  }

  items.forEach(item => {
    dashboard = undisplayOne(dashboard, item);
  });

  return dashboard;
}

const undisplayAll = (dashboard: DashboardView) => {
  return undisplayMany(dashboard, dashboard.displayedItems);
}

const displayMany = (dashboard: DashboardView, items: DashboardItem[], behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "exclusive") {
    dashboard = undisplayAll(dashboard);
  }

  items.forEach(item => {
    dashboard = displayOne(dashboard, item)
  });

  return dashboard;
}

const displayAll = (dashboard: DashboardView) => {
  return displayFolder(dashboard, dashboard.currentFolder);
}

const resetClipboard = (dashboard: DashboardView) => {
  dashboard = resetClipboardCut(dashboard);
  dashboard = resetClipboardCopy(dashboard);
  return dashboard;
}

const openLink = (dashboard: DashboardView, link: DashboardLink) => {
  let { url } = link;

  if (!!url && !/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
  }

  window.open(url, "_blank", "noopener noreferrer");

  return dashboard;
}

const openFolder = (dashboard: DashboardView, folder: DashboardFolder, folderData: DashboardView["dataOfCurrentFolder"]) => {
  dashboard.currentFolder = folder;
  dashboard.selected = [];
  dashboard.dataOfCurrentFolder = folderData;
  dashboard = displayFolder(dashboard, dashboard.currentFolder);

  return dashboard;
}

const resetClipboardCopy = (dashboard: DashboardView) => {
  return undoCopyMany(dashboard, dashboard.clipboard.copied);
}

const resetClipboardCut = (dashboard: DashboardView) => {
  return undoCutMany(dashboard, dashboard.clipboard.cut);
}

export const dashboardReducer = (dashboard: DashboardView, action: DashboardAction) => {
  dashboard = { ...dashboard };

  switch (action.type) {
    case "remove": {
      return removeOne(dashboard, action.item);
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
    case "open_link": {
      return openLink(dashboard, action.link);
    }
    case "open_folder": {
      return openFolder(dashboard, action.folder, action.data);
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
    case "refresh": {
      return refresh(dashboard);
    }
    case "change_updating_item": {
      return changeUpdatingItem(dashboard, action.item);
    }
    default: {
      return dashboard;
    }
  }
};
