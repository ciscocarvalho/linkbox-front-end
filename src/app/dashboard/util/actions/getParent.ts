import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardItem } from "../../types";
import { getItemID } from "../../util";

export const getParent = async (item: DashboardItem) => {
  const itemID = getItemID(item);
  let { path }: { path: string } = await fetchJsonPayload("get", `/path/${itemID}`);
  path = path === "" ? "default" :  `default/${path}`;

  if (path === undefined) {
    return null;
  }

  const location = path.split("/");
  const parentLocation = location.slice(0, Math.max(1, location.length - 1));
  const parentPath = parentLocation.join("/");

  if (path === parentPath) {
    return null;
  }

  const { _id: parentID } = await fetchJsonPayload("get", `/id/${parentPath}`);
  const parent = await fetchJsonPayload("get", `/folders/default/${parentID}`);

  return parent;
}
