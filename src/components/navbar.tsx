import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  Package,
  LogOut,
  Search,
  Store
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { default as useUserStore } from "@/store/userStore"
import { default as useCartStore } from "@/store/cartStore"
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router";
import { photo1 } from "@/constants/const";
const navigationItems: { title: string; path: string; icon?: React.ReactNode }[] = [
  { title: "Home", path: "/", icon: <Store className="h-4 w-4" /> },
  { title: "Products", path: "/products", icon: <Package className="h-4 w-4" /> },
  { title: "Orders", path: "/orders", icon: <Package className="h-4 w-4" /> },
];
const SearchArea = function () {
  return <div className="relative md:w-full">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      placeholder="Search products..."
      className="pl-10 w-full"
    />
  </div>;
}
export const NavBar = function () {
  const user = useUserStore((state: { user: unknown }) => state.user);
  const handleLogout = useUserStore((state: { logout: () => void }) => state.logout);
  const cart: [] = useCartStore((state: { cart: [] }) => state.cart);
  const cartCount = cart.length;
  return (
    <div className="border-b bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="text-xl font-bold">Yasmeen United</span>
          </Link>
          <div className="hidden lg:flex flex-1 max-w-sm mx-8">
            <SearchArea />
          </div>
          <NavigationMenu className="md:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
            {user == undefined ? (
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={photo1} alt="User" />
                      <AvatarFallback>
                        {user != undefined && 'name' in user
                          ? (user.name as string).charAt(0).toUpperCase()
                          : 'U'
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">
                        {user != undefined && 'name' in user
                          ? (user.name as string)
                          : 'User'
                        }
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user != undefined && 'email' in user
                          ? (user.email as string)
                          : 'user@example.com'
                        }
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </div>
        <div className="lg:hidden max-w-full pb-4">
          <SearchArea />
        </div>
      </div>

    </div>
  );
};