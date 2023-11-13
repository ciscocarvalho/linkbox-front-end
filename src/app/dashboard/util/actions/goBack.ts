import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import { getParent } from "../services/getParent";

export const goBack = (
  currentFolder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const parent = getParent(currentFolder);

  if (parent) {
    dispatch({ type: "open_folder", folder: parent });
  }
};
