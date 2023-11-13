import { DashboardItemID } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { itemIsFolder, itemIsLink } from "../../util";

export const getByID = async (id: DashboardItemID) => {
  const { path } = await fetchJsonPayload("get", `/path/${id}`);
  let payload;

  payload = await fetchJsonPayload("get", `/links/${path}`);

  if (itemIsLink(payload)) {
    return payload;
  }

  payload = await fetchJsonPayload("get", `/folders/${path}`);

  if (itemIsFolder(payload)) {
    return payload;
  }
};
