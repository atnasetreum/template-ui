"use client";

import { ReactNode, useContext, useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import {
  Copyright,
  DialogConfirmNotification,
  MainMenuItems,
  SecondaryMenuItems,
} from "@components";
import { NotificationsService } from "@services";
import { showNotification } from "@shared/utils";
import { User } from "@interfaces";
import { SocketContext } from "@contexts";
import { usePathname, useRouter } from "next/navigation";
import { useBoundStore } from "@store";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function MainLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const currentUser = useBoundStore((state) => state.currentUser);
  const setUsers = useBoundStore((state) => state.setUsers);
  const setCurrentUser = useBoundStore((state) => state.setCurrentUser);

  const {
    socket,
    online: isSocketConnected,
    connectSocket,
  } = useContext(SocketContext);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    if (isSocketConnected) {
      console.log("Socket connected");
    } else {
      console.log("Socket disconnected");
    }
  }, [isSocketConnected]);

  useEffect(() => {
    const event = "load-data-initial";
    socket?.on(event, (dataInitial: { currentUser: User; users: User[] }) => {
      setCurrentUser(dataInitial.currentUser);
      setUsers(dataInitial.users);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket, setCurrentUser, setUsers]);

  useEffect(() => {
    notifyPermission();
  }, []);

  const notifyPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") return;

      setIsOpenModalConfirm(true);
    } else {
      console.log("Notification API not supported.");
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <DialogConfirmNotification
        isOpen={isOpenModalConfirm}
        close={(confirm: boolean) => {
          if (confirm) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Notification permission granted.");
                navigator.serviceWorker.ready.then(function (registration) {
                  NotificationsService.saveSubscribe(registration).then(() => {
                    showNotification("Notification!", {
                      body: "This is a test notification!",
                    });
                  });
                });
              }
            });
          }
          setIsOpenModalConfirm(false);
        }}
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard: {currentUser?.name}
            </Typography>

            {isSocketConnected ? (
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            ) : (
              <IconButton color="error">
                <NotificationsOffIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainMenuItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryMenuItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </>
  );
}
