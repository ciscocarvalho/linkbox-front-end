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
  itemID: DashboardItemID;
} | {
  type: "select" | "unselect" | "display" | "undisplay" | "copy" | "cut";
  itemID: DashboardItemID;
  behavior?: "inclusive" | "exclusive";
} | {
  type:
    "select_many" |
    "unselect_many" |
    "copy_many" |
    "cut_many" |
    "undisplay_many" |
    "display_many";
  itemIDs: DashboardItemID[];
  behavior?: "inclusive" | "exclusive";
} | {
  type: "remove_many";
  itemIDs: DashboardItemID[];
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
  folderID: DashboardFolder["id"];
} | {
  type: "open_link";
  linkID: DashboardFolder["id"];
} | {
  type: "edit";
  itemID: DashboardItemID;
  updatedFields: Partial<DashboardFolder | DashboardLink>;
}

export type TDashboard = {
  displayedItems: DashboardItem[],
  selected: DashboardItem[],
  clipboard: { copied: DashboardItem[], cut: DashboardItem[] },
  currentFolder: DashboardFolder,
  parentFolder: DashboardFolder | null,
}
