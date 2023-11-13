import DashboardFolder from "./DashboardFolder";
import DashboardItem from "./DashboardItem";
import DashboardLink from "./DashboardLink";
import { DashboardItemID, DashboardItemType } from "./types";

export const getItemType = (item: DashboardItem) => item instanceof DashboardLink ? "link" : "folder";

export const inputFolderInfo = (defaultName?: string) => {
    const name = prompt("Nome: ", defaultName);
    if (name === null || !name.trim()) return null;

    return { name }
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
      item = new DashboardLink(linkInfo.title, linkInfo.url);
    }
  } else {
    const folderInfo = inputFolderInfo();

    if (folderInfo) {
      item = new DashboardFolder(folderInfo.name);
    }
  };

  return item;
}

export const itemIsFolder = (item: DashboardItem): item is DashboardFolder => item instanceof DashboardFolder;

export const itemIsLink = (item: DashboardItem): item is DashboardLink => item instanceof DashboardLink;

export const getItemID = (item: DashboardItem) => {
  return item.id;
};

export const checkItemID = (item: DashboardItem, id: DashboardItemID) => {
  return item.id === id;
};

export const compareItems = (a: DashboardItem, b: DashboardItem) => {
  return a.id === b.id;
};