import { DashboardItemID } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getByID = async (id: DashboardItemID) => {
  const payload = await fetchJsonPayload("get", `/items/default/${id}`);
  return payload.data;
};
