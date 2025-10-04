import { AdminProductForm } from "~/components/admin/admin-product-form";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function AdminCreatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Produkt hinzufügen</h2>
        </CardHeader>
        <CardContent>
          <AdminProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
