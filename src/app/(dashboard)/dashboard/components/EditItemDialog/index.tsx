"use client";
import { useContext, useEffect, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../../contexts/DashboardContext";
import { refreshDashboard } from "../../utils/actions/refreshDashboard";
import { DashboardItem } from "../../types";
import { itemIsFolder } from "../../utils";
import { update } from "../../services/update";
import FolderForm from "../EditItemDialog/_FolderForm";
import LinkForm from "../EditItemDialog/_LinkForm";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";

const EditItemModal: React.FC = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { updatingItem: item } = dashboard;
  const [openModal, setOpenModal] = useState(!!item);

  useEffect(() => {
    setOpenModal(!!item);
  }, [item]);

  if (!item) {
    return;
  }

  const handleOnClose = () => {
    dispatch({ type: "change_updating_item" });
  };

  const editItem = async (updatedFields: Partial<DashboardItem>) => {
    const payload = await update(item, updatedFields);

    if (payload?.errors) {
      return payload;
    } else {
      await refreshDashboard(dashboard, dispatch);
      setOpenModal(false);
    }
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={
        (open) => {
          if (!open) {
            handleOnClose();
          }
        }
      }
    >
      <DialogHeader />
      <DialogContent className="flex flex-col gap-[20px]">
        {
          itemIsFolder(item)
            ? <FolderForm editItem={editItem} folder={item} />
            : <LinkForm editItem={editItem} link={item} />
        }
      </DialogContent>
    </Dialog>
  );
};

export default EditItemModal;
