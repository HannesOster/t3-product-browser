import { Button } from "~/components/ui/button";
import { useCart } from "~/lib/cart-store";
import Link from "next/link";
import { SheetFooter } from "./ui/sheet";

type CartItemsProps = {
  onClose: () => void;
  hideActions?: boolean;
};

export function CartItems({ onClose, hideActions = false }: CartItemsProps) {
  const { items, remove, update } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {items.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            Dein Warenkorb ist leer.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-muted/40 border-muted/30 flex items-center justify-between rounded-lg border p-3 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium">
                    {item.product.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() =>
                      update(
                        item.product.id,
                        Math.max(
                          item.product.quantityIncrement,
                          item.quantity - item.product.quantityIncrement,
                        ),
                      )
                    }
                    aria-label="Weniger"
                  >
                    -
                  </Button>
                  <span className="w-6 text-center font-mono">
                    {item.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() =>
                      update(
                        item.product.id,
                        item.quantity + item.product.quantityIncrement,
                      )
                    }
                    aria-label="Mehr"
                  >
                    +
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => remove(item.product.id)}
                    aria-label="Entfernen"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SheetFooter>
        <div className="border-muted/30 w-full border-t pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Summe</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          {!hideActions && (
            <Button className="mt-2 w-full">
              <Link href="/checkout" onClick={onClose}>
                Zur Kasse
              </Link>
            </Button>
          )}
        </div>
      </SheetFooter>
    </>
  );
}
