import React from "react";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import "./App.css";
import theme from "./Config/Theme";
import SideNav from "./Components/SideNav";
import AppHeader from "./Components/AppHeader";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./Router/AppRoute";

function Layout() {
  const location = useLocation();
  const isHiddenPage =
    location.pathname.startsWith("/news/") ||
    location.pathname === "/allNews" ||
    location.pathname === "/login"; // Hide navigation on Login page

  return (
    <Box sx={styles.container}>
      {!isHiddenPage && <SideNav />} {/* Hide SideNav on specific pages */}
      <Box component={"main"} sx={styles.mainSection}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <CssBaseline />
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </ProSidebarProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Check if user is on login page

  return (
    <>
      {!isLoginPage && <AppHeader />} {/* Hide AppHeader on Login page */}
      <Layout />
    </>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    p: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default App;
