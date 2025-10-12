"use client";

import React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
  Book,
  Compass,
} from "lucide-react";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/profile",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

function AppSidebar() {

  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <img src="/logo.svg" alt="logo" width={130} height={120} />
      </SidebarHeader>

      <SidebarContent className={'s-y-2'}>
        <SidebarGroup className={'pb-0.5'}/>

        <AddNewCourseDialog>
        
        <Button className="m-1 cursor-pointer">Create New Course</Button>

        </AddNewCourseDialog>
        
        <SidebarGroup />

        <SidebarGroup className={'mt-0.5'}>
          <SidebarGroupContent>
            <SidebarMenu className={'s-y-0.5'}>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5'}>
                    <Link href={item.path} className={`text[17px] 
                    ${
                        path.includes(item.path)&& 'text-primary bg-purple-50'
                    }`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
