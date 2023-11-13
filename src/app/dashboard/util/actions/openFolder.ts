import { Dispatch } from "react";
import { DashboardAction, DashboardFolder } from "../../types";
import { getItemID } from "../../util";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const openFolder = async (
  folder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const folderID = getItemID(folder);
  const { path: folderPath } = await fetchJsonPayload("get", `/path/${folderID}`);

  if (!folderPath) {
    return;
  }

  folder = await fetchJsonPayload("get", `/folders/${folderPath}`);

  dispatch({ type: "open_folder", folder });
};
