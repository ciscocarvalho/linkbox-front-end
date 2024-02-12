"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useTranslation } from "react-i18next";

interface ItemTypeSelectProps {
  onValueChange?: (value: string) => void;
  defaultValue?: "link" | "folder",
}

const ItemTypeSelect: React.FC<ItemTypeSelectProps> = ({
  onValueChange,
  defaultValue,
}) => {
  const { t } = useTranslation();

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue ?? "link"}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value="link">{t("page.dashboard.form.link.name")}</SelectItem>
          <SelectItem value="folder">{t("page.dashboard.form.folder.name")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ItemTypeSelect;
