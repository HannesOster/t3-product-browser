import { parseAsString, useQueryStates } from "nuqs";
//Eigentlich category als Enum
export default function useQueryFilter() {
  return useQueryStates({
    search: parseAsString.withDefault(""),
    category: parseAsString.withDefault("Keine"),
    sort: parseAsString.withDefault("none"),
  });
}
