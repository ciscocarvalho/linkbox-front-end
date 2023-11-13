import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";

export const reposition = (
  currentFolder: DashboardFolder,
  currentIndex: number,
  newIndex: number,
  strategy: "before" | "after",
  dispatch: Dispatch<DashboardAction>
) => {
  currentFolder.repositionChild(currentIndex, newIndex, strategy);

  dispatch({ type: "refresh" });
};
