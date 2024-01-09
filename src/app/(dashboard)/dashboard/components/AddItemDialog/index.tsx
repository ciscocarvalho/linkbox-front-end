"use client";
import { useContext, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../../contexts/DashboardContext";
import { add } from "../../services/add";
import { refreshDashboard } from "../../utils/actions/refreshDashboard";
import { DashboardItem } from "../../types";
import { getItemID } from "../../utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";
import LinkForm from "./_LinkForm";
import FolderForm from "./_FolderForm";
import ItemTypeSelect from "./_ItemTypeSelect";

interface AddItemModalProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemDialog: React.FC<AddItemModalProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const [itemType, setItemType] = useState("link");
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);

  const addItem = async (item: DashboardItem) => {
    const payload = await add(
      getItemID(dashboard.currentFolder),
      item as any as DashboardItem
    );

    if (payload?.errors) {
      return payload;
    } else {
      await refreshDashboard(dashboard, dispatch);
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogHeader />
      <DialogContent className="flex flex-col gap-[20px]">
        <div className="space-y-6">
          <h3 className="text-xl">Adicionar item</h3>
          <ItemTypeSelect onValueChange={(value) => setItemType(value)} />
        </div>

        {
          itemType === "folder"
            ? <FolderForm addItem={addItem} />
            : <LinkForm addItem={addItem} />
        }
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
