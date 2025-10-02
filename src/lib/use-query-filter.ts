import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
//Eigentlich category als Enum
export default function useQueryFilter() {
  return useQueryStates({
    search: parseAsString.withDefault(""),
    category: parseAsString.withDefault("none"),
    sort: parseAsString.withDefault("price-asc"),
    page: parseAsInteger.withDefault(1),
  });
}
