import { DashboardItemID } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { itemIsFolder, itemIsLink } from "../../util";

export const getByID = async (id: DashboardItemID) => {
  let payload;

  payload = await fetchJsonPayload("get", `/links/default/${id}`);

  if (itemIsLink(payload)) {
    return payload;
  }

  payload = await fetchJsonPayload("get", `/folders/default/${id}`);

  if (itemIsFolder(payload)) {
    return payload;
  }
};
