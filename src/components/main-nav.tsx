import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/"
        className={`text-sm font-medium hover:underline ${pathname === "/" ? "text-primary underline" : "text-gray-700"}`}
      >
        Home
      </Link>
      <Link
        href="/products"
        className={`text-sm font-medium hover:underline ${pathname.startsWith("/products") ? "text-primary underline" : "text-gray-700"}`}
      >
        Products
      </Link>
      {user?.publicMetadata.role === "admin" && (
        <Link
          href="/admin"
          className={`text-sm font-medium hover:underline ${pathname.startsWith("/admin") ? "text-primary underline" : "text-gray-700"}`}
        >
          Admin
        </Link>
      )}
    </nav>
  );
}
