import DashboardFolder from "../DashboardFolder";
import DashboardItem from "../DashboardItem";
import { DashboardItemID, TDashboard } from "../types";
import { getChildren } from "./services/getChildren";

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

  const children = getChildren(currentFolder);
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

export const findInDashboard = (dashboard: TDashboard, predicate: Function) => {
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

    item = getChildren(folder).find((item) => predicate(item));

    if (item) {
      result = item;
    }
  });

  return result as DashboardItem | null;
}

export const findByIDInDashboard = (dashboard: TDashboard, itemID: DashboardItemID) => {
  return findInDashboard(dashboard, (item: DashboardItem) => {
    return item.id === itemID;
  });
}
