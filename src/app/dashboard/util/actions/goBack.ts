import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";

export const goBack = (
  currentFolder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const parent = currentFolder.getParent();

  if (parent) {
    dispatch({ type: "open_folder", folder: parent });
  }
};
