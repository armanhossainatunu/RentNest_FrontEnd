"use client";

import {
  Users,
  Building2,
  Home,
  HomeIcon,
  Clock,
  CheckCircle2,
  XCircle,
  BadgeCheck,
  CreditCard,
  Wallet,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: any;
}

export default function AdminDashboardCards({ data }: Props) {
  const cards = [
    {
      title: "Total Users",
      value: data?.users?.total || 0,
      icon: Users,
    },

    {
      title: "Total Properties",
      value: data?.properties?.total || 0,
      icon: Building2,
    },

    {
      title: "Available",
      value: data?.properties?.available || 0,
      icon: Home,
    },

    {
      title: "Unavailable",
      value: data?.properties?.unavailable || 0,
      icon: HomeIcon,
    },

    {
      title: "Pending Requests",
      value: data?.rentalRequests?.pending || 0,
      icon: Clock,
    },

    {
      title: "Approved Requests",
      value: data?.rentalRequests?.approved || 0,
      icon: CheckCircle2,
    },

    {
      title: "Rejected Requests",
      value: data?.rentalRequests?.rejected || 0,
      icon: XCircle,
    },

    {
      title: "Completed Requests",
      value: data?.rentalRequests?.completed || 0,
      icon: BadgeCheck,
    },

    {
      title: "Failed Payments",
      value: data?.payments?.failed || 0,
      icon: CreditCard,
    },

    {
      title: "Total Revenue",
      value: `৳ ${Number(data?.payments?.totalRevenue || 0).toLocaleString()}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
