import { useAuth } from "../AuthContext";
import {
    FaArrowRightFromBracket,
  FaAward,

  FaBookmark,
  FaBookOpen,
  FaChartSimple,
  FaClipboardList,
  FaHouse,
  FaPencil,
  FaPeopleGroup,
  FaPersonChalkboard,
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
import {User} from '@/../../shared/types';

import { Avatar, AvatarFallback } from "./avatar";

import { NavLink } from "react-router";

export default function DesktopNavigation({ user } : {user: User | null}) {
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
      group: "Útmutatók",
      items: [
        {
          label: "Tananyagok",
          icon: <FaBookmark size={28} />,
          to: "/guides",
        },
        {
          label: "Tantárgyak",
          icon: <FaBookOpen size={28} />,
          to: "/guides/subjects",
        },
        {
          label: "Szintek",
          icon: <FaChartSimple size={28} />,
          to: "/guides/levels",
        },
        {
          label: "Írók",
          icon: <FaPencil size={28} />,
          to: "/guides/authors",
        },
      ],
    },
    {
      group: "Tanórák",
      items: [
        {
          label: "Személyes tanórák",
          icon: <FaPeopleGroup size={28} />,
          to: "/lessons",
        },
        {
          label: "Tantárgyak",
          icon: <FaBookOpen size={28} />,
          to: "/lessons/subjects",
        },
        {
          label: "Szintek",
          icon: <FaChartSimple size={28} />,
          to: "/lessons/levels",
        },
        {
          label: "Tanárok",
          icon: <FaPersonChalkboard size={28} />,
          to: "/lessons/tutors",
        },
      ],
    },
    {
      group: "Tanulmányaim",
      items: [
        {
          label: "Vásárolt tananyagok",
          icon: <FaBookmark size={28} />,
          to: "/products",
        },
        {
          label: "Vásárolt tanórák",
          icon: <FaUserClock size={28} />,
          to: "/products/categories",
        },
        {
          label: "Írt tananyagok",
          icon: <FaClipboardList size={28} />,
          to: "/products/orders",
        },
        {
          label: "Tanított tanórák",
          icon: <FaUsersRectangle size={28} />,
          to: "/products/customers",
        },
      ],
    },
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
                      <SidebarMenuButton className="hover:text-emerald-400" asChild>
                        <NavLink className={({isActive}) => isActive ? "text-emerald-400" : ""} to={item.to}>
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
                <SidebarMenuItem className="flex items-center">
                  <SidebarMenuButton asChild className="h-12 flex flex-row basis-10/12">
                    <a href="/profile">
                      <Avatar>
                        <AvatarFallback className="text-xl">{user ? user.name[0].toUpperCase() : "?"}{ user? user.name[1] : "?"}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg">{
                        user ? user.name : "USER"}</p>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuButton className="basis-2/12" onClick={() => logout()}>
                    <FaArrowRightFromBracket size={36}  color="red"/>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    
  );
}
