import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

interface ItemTypeSelectProps {
  onValueChange?: (value: string) => void;
  defaultValue?: "link" | "folder",
}

const ItemTypeSelect: React.FC<ItemTypeSelectProps> = ({
  onValueChange,
  defaultValue,
}) => {
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
          <SelectItem value="link">Link</SelectItem>
          <SelectItem value="folder">Pasta</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ItemTypeSelect;
