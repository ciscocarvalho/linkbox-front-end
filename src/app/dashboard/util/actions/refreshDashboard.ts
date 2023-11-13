import { Dispatch } from "react";
import { DashboardAction, DashboardFolder, DashboardView } from "../../types";
import { getByID } from "./getByID";
import { getItemID } from "../../util";

export const refreshDashboard = async (
  dashboard: DashboardView,
  dispatch: Dispatch<DashboardAction>
) => {
  const folderID = getItemID(dashboard.currentFolder);
  const folder = await getByID(folderID) as DashboardFolder | undefined;

  if (folder) {
    dispatch({ type: "display_folder", folder });
  }
};
