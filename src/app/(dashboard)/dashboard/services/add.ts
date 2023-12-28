import fetchData from "../../../../services/fetchData";
import { DashboardItemCandidate, DashboardItemID } from "../types";

export const add = async (
  folderID: DashboardItemID,
  item: DashboardItemCandidate
) => {
  const payload = await fetchData("post", `/items/default/${folderID}`, item);
  return payload;
};
