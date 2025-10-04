import AdminDashboard from "~/components/admin/admin-dashboard";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
