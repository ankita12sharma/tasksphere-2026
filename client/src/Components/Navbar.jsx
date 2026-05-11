import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

function Navbar({ user, onLogout }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      onLogout();
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          pl: "310px",
          pr: 4,
          pt: 2,

          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            All Tasks
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#444",
              mt: 0.5,
            }}
          >
            Manage And Organize your tasks
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              whiteSpace: "nowrap",
            }}
          >
            Welcome {user || "User"}
          </Typography>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar src="/src/Images/Ankita_Pic.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {["Logout"].map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}
export default Navbar;
