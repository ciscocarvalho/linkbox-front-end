import { DashboardItemID } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getByID = async (id: DashboardItemID) => {
  return await fetchJsonPayload("get", `/item/default/${id}`);
};
