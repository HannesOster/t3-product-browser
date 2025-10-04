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
import { api, type RouterOutputs } from "~/trpc/react";

const MainNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const linkClass = (active: boolean) =>
    clsx("text-sm font-medium", active && "bg-accent");

  const { data: categoriesData } = api.products.getCategories.useQuery();
  const categories: RouterOutputs["products"]["getCategories"]["categories"] =
    categoriesData?.categories ?? [];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={linkClass(pathname === "/")}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={linkClass(pathname.startsWith("/products"))}
          >
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink
                  href="/products"
                  className={linkClass(pathname === "/products")}
                >
                  Alle Produkte
                </NavigationMenuLink>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavigationMenuLink
                    href={`/products/category/${cat.id}`}
                    className={linkClass(
                      pathname === `/products/category/${cat.id}`,
                    )}
                  >
                    {cat.name}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {user?.publicMetadata.role === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={linkClass(pathname.startsWith("/admin"))}
            >
              Admin
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
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
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/products"
            className={linkClass(pathname.startsWith("/member"))}
          >
            Pro-Membership
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
