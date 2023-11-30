import { DashboardItemID } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getByID = async (id: DashboardItemID) => {
  const { data: { item } } = await fetchJsonPayload("get", `/items/default/${id}`);
  return item;
};
