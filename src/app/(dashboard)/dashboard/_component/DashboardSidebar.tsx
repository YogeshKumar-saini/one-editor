"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarSeparator,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileIcon } from "lucide-react";

import Logo from "@/components/Logo";
import CreateProject from "./CreateProject";
import { getAvatarName } from "@/lib/getAvatarName";
import { cn } from "@/lib/utils";
import Axios from "@/lib/Axios";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const session = useSession();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get("/api/recent-project-update");
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recent projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Sidebar className="overflow-hidden shadow-md">
      {/* Logo */}
      <SidebarHeader className="px-4">
        <Logo w={100} />
      </SidebarHeader>

      <SidebarSeparator />

      {/* Content */}
      <SidebarContent>
        {/* Create Project Button */}
        <CreateProject />

        {/* Navigation Menu */}
        <div className="px-2 mt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                href="/dashboard"
                className={cn(
                  "block w-full px-3 py-2 rounded-md transition hover:bg-primary/10",
                  pathname === "/dashboard" && "bg-primary/10 text-primary font-semibold"
                )}
              >
                Dashboard
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Recent Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <SidebarMenuItem>
                  <span className="text-muted-foreground text-sm">Loading...</span>
                </SidebarMenuItem>
              ) : data.length === 0 ? (
                <SidebarMenuItem>
                  <span className="text-muted-foreground text-sm">No recent projects</span>
                </SidebarMenuItem>
              ) : (
                data.map((item: any) => (
                  <SidebarMenuItem key={item._id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/editor/${item._id}?file=index.html`}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted"
                      >
                        <FileIcon className="w-4 h-4" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer User Avatar + Logout */}
      <SidebarFooter className="border-t pt-4 px-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full px-3 flex justify-between items-center">
              <span className="font-semibold truncate">
                {session.data?.user?.name || "User"}
              </span>
              <Avatar className="w-8 h-8 ml-2">
                <AvatarImage src={session.data?.user?.image || ""} />
                <AvatarFallback>
                  {getAvatarName(session.data?.user?.name || "")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-48 p-4 shadow-lg border">
            <p className="text-sm font-medium truncate mb-2">
              {session.data?.user?.email || "example@email.com"}
            </p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
