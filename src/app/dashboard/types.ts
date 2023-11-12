import { DOMAttributes } from "react";
import DashboardItem from "./DashboardItem";
import DashboardFolder from "./DashboardFolder";
import DashboardLink from "./DashboardLink";

export type DashboardItemID = DashboardItem["id"];

export type DashboardItemType = "folder" | "link";

export type OnClickEvent = DOMAttributes<HTMLElement>["onClick"];

export type DashboardAction = {
  type: "add";
  item: DashboardItem;
} | {
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
  type: "remove_many";
  items: DashboardItem[];
} | {
  type:
    "go_back" |
    "reset_selection" |
    "reset_display" |
    "reset_clipboard" |
    "reset_clipboard_copy" |
    "reset_clipboard_cut";
} | {
  type: "paste" | "open_folder" | "display_folder";
  folder: DashboardFolder;
} | {
  type: "open_link";
  link: DashboardLink;
} | {
  type: "edit";
  item: DashboardItem;
  updatedFields: Partial<DashboardFolder | DashboardLink>;
} | {
  type: "reposition";
  currentIndex: number;
  newIndex: number;
  strategy: "before" | "after";
} | {
  type: "reposition_many";
  indexes: number[];
  newIndex: number;
  strategy: "before" | "after";
} | {
  type: "move";
  item: DashboardItem;
  folder: DashboardFolder;
} | {
  type: "move_many";
  items: DashboardItem[];
  folder: DashboardFolder;
}

export type TDashboard = {
  displayedItems: DashboardItem[],
  selected: DashboardItem[],
  clipboard: { copied: DashboardItem[], cut: DashboardItem[] },
  currentFolder: DashboardFolder,
  parentFolder: DashboardFolder | null,
}
