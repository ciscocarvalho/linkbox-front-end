import { DashboardFolder, DashboardItem, DashboardItemID, DashboardItemType, DashboardLink } from "./types";

export const getItemType = (item: DashboardItem) => "url" in item ? "link" : "folder";

export const inputFolderInfo = (defaultName?: string) => {
    const name = prompt("Nome: ", defaultName);
    if (name === null || !name.trim()) return null;

    return { name, items: [] }
}

export const inputLinkInfo = (defaultUrl?: string, defaultTitle?: string) => {
    const url = prompt("Url: ", defaultUrl);
    if (url === null || !url.trim()) return null;
    const title = prompt("Título: ", defaultTitle);
    if (title === null || !title.trim()) return null;

    return { title, url }
}

export const inputItemType = (): DashboardItemType | null => {
    const promptLines = ["O que você quer adicionar?", "1 - Pasta", "2 - Link"];
    let answer = parseInt(prompt(promptLines.join("\n")) ?? "");

    if (isNaN(answer)) {
      return null;
    }

    return ["folder", "link"][answer - 1] as DashboardItemType;
}

export const inputNewItem = () => {
  let item = null;
  const itemType = inputItemType();

  if (!itemType) {
    return item
  } else if (itemType === "link") {
    const linkInfo = inputLinkInfo();

    if (linkInfo) {
      item = linkInfo;
    }
  } else {
    const folderInfo = inputFolderInfo();

    if (folderInfo) {
      item = folderInfo;
    }
  };

  return item;
}

export const itemIsFolder = (item: DashboardItem): item is DashboardFolder => getItemType(item) === "folder";

export const itemIsLink = (item: DashboardItem): item is DashboardLink => getItemType(item) === "link"

export const includesItem = (arr: DashboardItem[], item: DashboardItem) => {
  return arr.findIndex(v => compareItems(v, item)) !== -1
}

export const getItemID = (item: DashboardItem) => {
  return item._id;
};

export const checkItemID = (item: DashboardItem, id: DashboardItemID) => {
  return item._id === id;
};

export const compareItems = (a: DashboardItem, b: DashboardItem) => {
  return a._id === b._id;
};