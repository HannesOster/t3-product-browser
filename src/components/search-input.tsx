import { Input } from "./ui/input";

function SearchInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <Input
      type="search"
      placeholder="Suche..."
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value ?? "")
      }
      className="w-40"
    />
  );
}
export { SearchInput };
