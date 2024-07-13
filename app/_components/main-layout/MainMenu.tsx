"use client";

import { useContext } from "react";

import { usePathname, useRouter } from "next/navigation";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

import { SocketContext } from "@contexts";
import { AuthService, NotificationsService } from "@services";
import { ROUTE_DASHBOARD, ROUTE_ROOT, ROUTE_USERS } from "@constants";
import { useBoundStore } from "@store";

export const MainMenuItems = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <ListItemButton
        onClick={() => {
          router.push(ROUTE_DASHBOARD);
        }}
        selected={pathname === ROUTE_DASHBOARD}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          router.push(ROUTE_USERS);
        }}
        selected={pathname === ROUTE_USERS}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </>
  );
};

export const SecondaryMenuItems = () => {
  const { socket, disconnectSocket } = useContext(SocketContext);

  const router = useRouter();

  const clearCurrentUser = useBoundStore((state) => state.clearCurrentUser);

  const updateChartBySocket = () => {
    socket?.emit("update-total-revenue");
  };

  return (
    <>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>

      <ListItemButton onClick={() => NotificationsService.push()}>
        <ListItemIcon>
          <SendToMobileIcon />
        </ListItemIcon>
        <ListItemText primary="Send Notification" />
      </ListItemButton>

      <ListItemButton onClick={updateChartBySocket}>
        <ListItemIcon>
          <SyncAltIcon />
        </ListItemIcon>
        <ListItemText primary="Update Chart" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          AuthService.logout().then(() => {
            disconnectSocket();
            clearCurrentUser();
            router.push(ROUTE_ROOT);
          });
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
};
