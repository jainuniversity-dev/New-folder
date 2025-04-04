import {
    AppBar,
    Badge,
    // Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import NotificationsIcon from "@mui/icons-material/Notifications";
  import SettingsIcon from "@mui/icons-material/Settings";
  import LogoutIcon from "@mui/icons-material/Logout";
  import { useProSidebar } from "react-pro-sidebar";
  import { useNavigate } from "react-router-dom";
  
  const AppHeader = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear authentication token
      navigate("/login"); // Redirect to login page
    };
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
    return (
      <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
            color="secondary"
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" sx={styles.appLogo} src="/src/assets/logo.png" />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton title="Notification" color="secondary">
            <Badge badgeContent={14} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton title="Settings" color="secondary">
            <SettingsIcon />
          </IconButton>
          <Tooltip title="Logout" placement="top">
            <IconButton color="secondary" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  };
  /** @type {import("@mui/material"),SxProps} */
  
  const styles = {
    appBar: {
      bgcolor: "neutral.main",
    },
    appLogo: {
      borderRadius: 2,
      width: 120,
      ml: 2,
      cursor: "pointer",
    },
  };
  export default AppHeader;
  