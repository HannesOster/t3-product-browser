import AdminDashboard from "~/components/admin/admin-dashboard";
import { Suspense } from "react";
import { Spinner } from "~/components/ui/shadcn-io/spinner";

export default function AdminPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AdminDashboard />
    </Suspense>
  );
}
