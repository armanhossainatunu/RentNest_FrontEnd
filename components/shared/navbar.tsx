"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  LogOut,
  User,
  CreditCard,
  CircleUserRound,
} from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Navigation items array
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

// User dropdown items array
const userMenuItems = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Billing", icon: CreditCard, href: "/billing" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

type Iuser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      status: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: null;
        userId: string;
      };
    };
  };
};

type NavbarProps = {
  user: Iuser;
};
export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const handleLogout = async (action: string) => {
    console.log(`user logout ${action}`);
    if (action === "logout") {
      await logout();
      toast.success("Logout successful");
      router.push("/login");
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-xl text-foreground hover:text-primary transition-colors"
          >
            RentNest
          </Link>
          {/* Logo */}
          <div className="flex items-center gap-8">
            {/* Nav Links */}
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Dropdown */}
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  // variant="ghost"
                  className="cursor-pointer"
                >
                  <CircleUserRound />
                  {/* <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar> */}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* User Info Section */}
                <div className="flex items-center gap-3 px-2 py-1.5">
                  {/* <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar> */}
                  <CircleUserRound />

                  <div className="flex flex-col gap-1 truncate">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.data.profile.name || "Name"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.data.profile.email || "Email"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />

                {/* Menu Items */}
                <DropdownMenuGroup>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={async () => await handleLogout("logout")}
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="bg-gray-400 px-2 py-1 rounded-sm  font-normal text-xl text-foreground hover:text-primary  transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
