import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import { itemIsFolder } from "..";
import { getByID } from "../../services/getByID";

export const openFolder = async (
  folderId: string,
  dispatch: Dispatch<DashboardAction>
) => {
  const folderWithData = await getByID(folderId);
  const folder = itemIsFolder(folderWithData?.item)
    ? folderWithData?.item
    : null;
  const data = { ...folderWithData };

  if (data) {
    delete data.item;
    delete data.type;
  }

  if (folder) {
    dispatch({ type: "open_folder", folder, data });
  }
};
