import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { api } from "~/trpc/react";

export function BestsellerSwitch({
  initialChecked,
  productId,
}: {
  initialChecked: boolean;
  productId: string;
}) {
  const [checked, setChecked] = useState(initialChecked);
  const editProduct = api.products.edit.useMutation();

  const handleToggle = (value: boolean) => {
    setChecked(value);
    editProduct.mutate({ id: productId, bestseller: value });
  };

  return <Switch checked={checked} onCheckedChange={handleToggle} />;
}
