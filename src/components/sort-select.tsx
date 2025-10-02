import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { SelectItem } from "./ui/select";

const sortOptions = [
  { value: "none", label: "Keine Sortierung" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
];

function SortSelect({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Sortierung" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { SortSelect };
