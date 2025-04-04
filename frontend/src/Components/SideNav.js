import { Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const theme = useTheme();
  const location = useLocation();
  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.main}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? theme.palette.neutral.light : undefined,
              color: active
                ? theme.palette.neutral.dark
                : theme.palette.neutral.light,
              "&:hover": {
                color: theme.palette.neutral.dark,
              },
            };
          },
        }}
      >
        <MenuItem
          active={location.pathname === "/dashboard"}
          component={<Link to="/dashboard" />}
          icon={<DashboardIcon />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/news"}
          component={<Link to="/news" />}
          icon={<NewspaperIcon />}
        >
          <Typography variant="body2">News</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/events"}
          component={<Link to="/events" />}
          icon={<EventIcon />}
        >
          <Typography variant="body2">Events</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/blogs"}
          component={<Link to="/blogs" />}
          icon={<CreditCardIcon />}
        >
          <Typography variant="body2">Blogs</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideNav;
