"use client";
import { useContext, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../../contexts/DashboardContext";
import { add } from "../../services/add";
import { refreshDashboard } from "../../utils/actions/refreshDashboard";
import { DashboardItem, DashboardItemType } from "../../types";
import { getItemID } from "../../utils";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";
import LinkForm from "./_LinkForm";
import FolderForm from "./_FolderForm";
import ItemTypeSelect from "./_ItemTypeSelect";
import { useTranslation } from "react-i18next";

interface AddItemModalProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemDialog: React.FC<AddItemModalProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const { t } = useTranslation();

  const [itemType, setItemType] = useState<DashboardItemType>("link");
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
          <h3 className="text-xl">
            {t("page.dashboard.dialog.add-item.title")}
          </h3>
          <ItemTypeSelect
            defaultValue={itemType}
            onValueChange={(value) => setItemType(value)}
          />
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
