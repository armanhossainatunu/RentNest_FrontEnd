"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  X,
  Settings,
  LogOut,
  User,
  CreditCard,
  CircleUserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/service/logout";
import { toast } from "sonner";
import { Iuser } from "@/lib/types";

// Navigation

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

// User Menu

const userMenuItems = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Billing", icon: CreditCard, href: "/billing" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

type NavbarProps = {
  user: Iuser;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const isLandlord = user?.data?.profile?.role === "LANDLORD";
  const role = user?.data?.profile?.role;

  const handleLogout = async () => {
    await logout();

    toast.success("Logout successful");

    router.push("/login");
  };

  const dashboardLink =
    role === "ADMIN"
      ? "/admin_Dashboard"
      : role === "LANDLORD"
        ? "/landlord-dashboard"
        : role === "TENANT"
          ? "/tenant-dashboard"
          : null;

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`
              px-3 py-2 rounded-md text-sm font-medium

              ${
                active
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-accent"
              }

              `}
          >
            {item.label}
          </Link>
        );
      })}
      {/* DashBoard */}
      {dashboardLink && (
        <Link
          href={dashboardLink}
          onClick={() => setOpen(false)}
          className={`
      px-3 py-2 rounded-md text-sm font-medium

      ${
        pathname === dashboardLink
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-accent"
      }
    `}
        >
          Dashboard
        </Link>
      )}

      {isLandlord && (
        <Link
          href="/propertiesCreate"
          onClick={() => setOpen(false)}
          className={`
            px-3 py-2 rounded-md text-sm font-medium

            ${
              pathname === "/propertiesCreate"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-accent"
            }

            `}
        >
          Properties Create
        </Link>
      )}
    </>
  );

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          <Link href="/" className="text-xl font-bold">
            RentNest
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-2">
            <NavLinks />
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">
            {user?.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <CircleUserRound />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="font-medium">{user?.data?.profile?.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {user?.data?.profile?.email}
                    </p>

                    <p className="text-xs text-primary">
                      {user?.data?.profile?.role}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href} className="flex gap-2">
                            <Icon className="h-4 w-4" />

                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}

            {/* Mobile Hamburger */}

            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
}
