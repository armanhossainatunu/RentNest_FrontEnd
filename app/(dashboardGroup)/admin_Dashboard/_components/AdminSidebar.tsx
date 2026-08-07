"use client";

import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CreditCard,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin_Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin_Dashboard/users",
    icon: Users,
  },
  {
    title: "Properties",
    url: "/admin_Dashboard/properties",
    icon: Building2,
  },
  {
    title: "Rental Requests",
    url: "/admin_Dashboard/requests",
    icon: FileText,
  },
  {
    title: "Payments",
    url: "/admin_Dashboard/Payments",
    icon: CreditCard,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="`w-[40px] `">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-15 text-xl font-bold">
            RentNest Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
