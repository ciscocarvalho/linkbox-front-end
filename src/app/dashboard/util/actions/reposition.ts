import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { repositionItem } from "../services/repositionItem";

export const reposition = (
  currentFolder: DashboardFolder,
  currentIndex: number,
  newIndex: number,
  strategy: "before" | "after",
  dispatch: Dispatch<DashboardAction>
) => {
  repositionItem(currentFolder, currentIndex, newIndex, strategy);
  dispatch({ type: "refresh" });
};
