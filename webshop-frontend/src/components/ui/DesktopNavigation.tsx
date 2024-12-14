import { useAuth } from "../AuthContext";
import {
  FaArrowRightFromBracket,
  FaAward,
  FaBookmark,
  
  FaRegCalendarPlus,
  
  FaClipboardList,
  FaHouse,
  FaPencil,
  FaPeopleGroup,
  
  
  FaPlus,
  FaUserClock,
  FaUsersRectangle,
} from "react-icons/fa6";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./sidebar";
import { User } from "@/../../shared/types";

import { Avatar, AvatarFallback } from "./avatar";

import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function DesktopNavigation({ user }: { user: User | null }) {
  const { logout } = useAuth();
  const items = [
    {
      group: "Főoldal",
      items: [
        {
          label: "Főoldal",
          icon: <FaHouse size={28} />,
          to: "/",
        },
      ],
    },
    {
      group: "Katalógus",
      items: [
        {
          label: "Tananyagok",
          icon: <FaBookmark size={28} />,
          to: "/guides",
        },
        {
          label: "Személyes tanórák",
          icon: <FaPeopleGroup size={28} />,
          to: "/lessons",
        },
        {
          label: "Írók",
          icon: <FaPencil size={28} />,
          to: "/authors",
        },
      ],
    },
   
    {
      group: "Tanulmányaim",
      items: [
        {
          label: "Vásárolt tananyagok",
          icon: <FaBookmark size={28} />,
          to: "/library/guides",
        },
        {
          label: "Vásárolt tanórák",
          icon: <FaUserClock size={28} />,
          to: "/library/lessons",
        },
        {
          label: "Írt tananyagok",
          icon: <FaClipboardList size={28} />,
          to: "/author/" + user?.id,
        },
        {
          label: "Tanított tanórák",
          icon: <FaUsersRectangle size={28} />,
          to: "/host/" + user?.id,
        },
         
      ],
    },
    {
      group: "Hozzájárulás",
      items: [
        {
          label: "Új tananyag",
          icon: <FaPlus size={28} />,
          to: "/contribute/guide",
        },
        {
          label: "Új tanóra",
          icon: <FaRegCalendarPlus size={28} />,
          to: "/contribute/lesson",
        },
      ],
      
    }
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex flex-row justify-between items-center mx-3">
          <FaAward size={36} />
          <h1 className="text-3xl">Webshop</h1>
        </SidebarHeader>
        {items.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarSeparator />
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className="hover:text-emerald-400"
                      asChild
                    >
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-emerald-400" : ""
                        }
                        to={item.to}
                      >
                        {item.icon}
                        <p className="text-lg">{item.label}</p>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <ThemeToggle />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center">
                <SidebarMenuButton
                  asChild
                  className="h-12 flex flex-row basis-10/12"
                >
                  <NavLink to={"/user/" + user?.id}>
                    <Avatar className="border border-emerald-500">
                      <AvatarFallback className="text-xl">
                        {user?.name.length! > 0 ? user?.name[0].toUpperCase() : "?"}
                        {user?.name.length! ? user?.name[1] : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-lg">{user ? user.name : "USER"}</p>
                  </NavLink>
                </SidebarMenuButton>
                <SidebarMenuButton
                  className="basis-2/12"
                  onClick={() => logout()}
                >
                  <FaArrowRightFromBracket size={36} color="red" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
