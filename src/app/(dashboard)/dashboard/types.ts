import { DOMAttributes } from "react";

type DashboardItemBase = {
  _id: string;
  backgroundColor?: string;
}

export type DashboardLink = DashboardItemBase & {
  url: string;
  title: string;
}

export type DashboardFolder = DashboardItemBase & {
  name: string;
  items: DashboardItem[];
}

export type DashboardItem = DashboardLink | DashboardFolder;

export type DashboardItemWithData = {
  item: DashboardItem;
  type: "folder" | "link";
  dashboard: Omit<Dashboard, "tree"> & { tree: Omit<Pick<Dashboard, "tree">["tree"], "items"> };
  parent: DashboardFolder | null;
  path: string;
  location: string[];
}

export type DashboardItemCandidate = Omit<DashboardItem, "_id">;
export type DashboardLinkCandidate = Omit<DashboardLink, "_id">;
export type DashboardFolderCandidate = Omit<DashboardFolder, "_id">;

export type DashboardItemID = DashboardItem["_id"];

export type DashboardItemType = "folder" | "link";

export type Dashboard = {
  name: string;
  tree: {
    items: DashboardFolder["items"];
    _id: string;
  };
  _id: string;
}

export type OnClickEvent = DOMAttributes<HTMLElement>["onClick"];

export type DashboardView = {
  displayedItems: DashboardItem[],
  selected: DashboardItem[],
  clipboard: { copied: DashboardItem[], cut: DashboardItem[] },
  currentFolder: DashboardFolder,
  dataOfCurrentFolder: Omit<DashboardItemWithData, "item" | "type">;
  updatingItem?: DashboardItem;
}

export type DashboardAction = {
  type: "remove" | "undo_copy" | "undo_cut";
  item: DashboardItem;
} | {
  type: "select" | "unselect" | "display" | "undisplay" | "copy" | "cut";
  item: DashboardItem;
  behavior?: "inclusive" | "exclusive";
} | {
  type:
    "select_many" |
    "unselect_many" |
    "copy_many" |
    "cut_many" |
    "undisplay_many" |
    "display_many";
  items: DashboardItem[];
  behavior?: "inclusive" | "exclusive";
} | {
  type:
    "reset_selection" |
    "reset_display" |
    "reset_clipboard" |
    "reset_clipboard_copy" |
    "reset_clipboard_cut";
} | {
  type: "open_folder" | "display_folder";
  folder: DashboardFolder;
  data: DashboardView["dataOfCurrentFolder"];
} | {
  type: "open_link";
  link: DashboardLink;
} | {
  type: "change_updating_item";
  item?: DashboardItem;
} | {
  type: "refresh";
}
