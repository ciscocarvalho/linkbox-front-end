import { DashboardItemID } from "../types";
import fetchData from "../../../../services/fetchData";

export const getByID = async (id: DashboardItemID) => {
  const payload = await fetchData("get", `/items/default/${id}`);
  return payload.data;
};
