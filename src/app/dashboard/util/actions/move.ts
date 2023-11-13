import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID, getItemType } from "../../util";
import { DashboardFolder, DashboardItem } from "../../types";

export const move = async (
  item: DashboardItem,
  targetFolder: DashboardFolder,
) => {
  const itemType = getItemType(item);
  const itemID = getItemID(item);
  const targetFolderID = getItemID(targetFolder);

  const { path }: { path: string } = await fetchJsonPayload("get", `/path/${itemID}`);
  const { path: targetPath }: { path: string } = await fetchJsonPayload("get", `/path/${targetFolderID}`);

  await fetchJsonPayload("post", `/move/${itemType}/${path}`, { targetPath });
}
