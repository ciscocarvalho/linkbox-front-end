import DashboardFolder from "../DashboardFolder";
import DashboardItem from "../DashboardItem";
import DashboardLink from "../DashboardLink";
import { DashboardAction, TDashboard } from "../types";
import { getChildren } from "./services/getChildren";

type Behavior = "inclusive" | "exclusive";

const DEFAULT_BEHAVIOR = "inclusive";

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
  dashboard = undisplayOne(dashboard, item);
  dashboard = removeOneFromClipboard(dashboard, item);
  dashboard = unselectOne(dashboard, item);
  return dashboard;
}

const refresh = (dashboard: TDashboard) => {
  return displayFolder(dashboard, dashboard.currentFolder);
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
  dashboard.displayedItems = getChildren(folder);
  return dashboard;
}

const cutOne = (dashboard: TDashboard, item: DashboardItem, behavior: Behavior = DEFAULT_BEHAVIOR) => {
  if (behavior === "inclusive") {
    dashboard.clipboard.cut.push(item);
  } else {
    dashboard.clipboard.cut = [item];
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
  dashboard.clipboard.cut = itemsCut.filter(itemCut => itemCut.id !== item.id);
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
  dashboard.selected = [];
  dashboard = displayFolder(dashboard, dashboard.currentFolder);

  return dashboard;
}

const resetClipboardCopy = (dashboard: TDashboard) => {
  return undoCopyMany(dashboard, dashboard.clipboard.copied);
}

const resetClipboardCut = (dashboard: TDashboard) => {
  return undoCutMany(dashboard, dashboard.clipboard.cut);
}

export const dashboardReducer = (dashboard: TDashboard, action: DashboardAction) => {
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
      return openFolder(dashboard, action.folder);
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
    default: {
      return dashboard;
    }
  }
};
