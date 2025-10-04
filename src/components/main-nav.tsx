import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import clsx from "clsx";

const MainNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const linkClass = (active: boolean) =>
    clsx("text-sm font-medium", active && "text-blue-600 underline");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={linkClass(pathname === "/")}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/products"
            className={linkClass(pathname.startsWith("/products"))}
          >
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        {user?.publicMetadata.role === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={linkClass(pathname.startsWith("/admin"))}
            >
              Admin
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-2 p-2">
                <li>
                  <NavigationMenuLink
                    href="/admin"
                    className={linkClass(pathname === "/admin")}
                  >
                    Liste
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    href="/admin/add-product"
                    className={linkClass(pathname === "/admin/add")}
                  >
                    Produkt hinzufügen
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
