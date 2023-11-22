import { Dispatch } from "react";
import { DashboardAction, DashboardFolder } from "../../types";
import { getItemID, itemIsFolder } from "../../util";
import { getByID } from "./getByID";

export const openFolder = async (
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const retrievedFolder = await getByID(getItemID(folder)) as DashboardFolder | undefined;

  if (retrievedFolder && itemIsFolder(retrievedFolder)) {
    dispatch({ type: "open_folder", folder: retrievedFolder });
  }
};
