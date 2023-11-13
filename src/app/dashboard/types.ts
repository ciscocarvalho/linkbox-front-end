import { DOMAttributes } from "react";

export type DashboardItem = {
  _id: string;
  backgroundColor?: string;
}

export type DashboardLink = DashboardItem & {
  url: string;
  title: string;
}

export type DashboardFolder = DashboardItem & {
  name: string;
  items: DashboardItem[];
}

export type DashboardItemID = DashboardItem["_id"];

export type DashboardItemType = "folder" | "link";

export type OnClickEvent = DOMAttributes<HTMLElement>["onClick"];

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
} | {
  type: "open_link";
  link: DashboardLink;
} | {
  type: "refresh";
}

export type DashboardView = {
  displayedItems: DashboardItem[],
  selected: DashboardItem[],
  clipboard: { copied: DashboardItem[], cut: DashboardItem[] },
  currentFolder: DashboardFolder,
}
