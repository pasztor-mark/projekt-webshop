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
  SidebarTrigger,
} from "./sidebar";

import { Avatar, AvatarFallback } from "./avatar";
import { Tooltip } from "@/components/ui/tooltip";

export default function DesktopNavigation() {
  const { logout } = useAuth();
  const items = [
    {
      group: "Főoldal",
      items: [
        {
          label: "Főoldal",
          icon: <FaHouse size={24} />,
          to: "/",
        },
      ],
    },
    {
      group: "Útmutatók",
      items: [
        {
          label: "Tanulási útmutatók",
          icon: <FaBookmark size={24} />,
          to: "/guides",
        },
        {
          label: "Tantárgyak",
          icon: <FaBookOpen size={24} />,
          to: "/guides/subjects",
        },
        {
          label: "Szintek",
          icon: <FaChartSimple size={24} />,
          to: "/guides/levels",
        },
        {
          label: "Írók",
          icon: <FaPencil size={24} />,
          to: "/guides/authors",
        },
      ],
    },
    {
      group: "Tanórák",
      items: [
        {
          label: "Személyes tanórák",
          icon: <FaPeopleGroup size={24} />,
          to: "/lessons",
        },
        {
          label: "Tantárgyak",
          icon: <FaBookOpen size={24} />,
          to: "/lessons/subjects",
        },
        {
          label: "Szintek",
          icon: <FaChartSimple size={24} />,
          to: "/lessons/levels",
        },
        {
          label: "Tanárok",
          icon: <FaPersonChalkboard size={24} />,
          to: "/lessons/tutors",
        },
      ],
    },
    {
      group: "Tanulmányaim",
      items: [
        {
          label: "Vásárolt tananyagok",
          icon: <FaBookmark size={24} />,
          to: "/products",
        },
        {
          label: "Vásárolt tanórák",
          icon: <FaUserClock size={24} />,
          to: "/products/categories",
        },
        {
          label: "Írt tananyagok",
          icon: <FaClipboardList size={24} />,
          to: "/products/orders",
        },
        {
          label: "Tanított tanórák",
          icon: <FaUsersRectangle size={24} />,
          to: "/products/customers",
        },
      ],
    },
  ];

  return (
    <nav className="bg-emerald-600 w-full h-12 flex items-center justify-between px-4">
      {/*isAuthenticated && <Button onClick={() => logout()}>Logout</Button>*/}
      <SidebarTrigger />
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
                      <SidebarMenuButton asChild>
                        <a href={item.to}>
                          {item.icon}
                          <p className="text-lg">{item.label}</p>
                        </a>
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
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      <p className="text-lg">User</p>
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
    </nav>
  );
}
