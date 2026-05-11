import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
} from "@mui/material";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckIcon from "@mui/icons-material/Check";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import MailIcon from "@mui/icons-material/Mail";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useGetTasksQuery } from "../redux/taskSlice";
import { useState } from "react";

const details = {
  task_name: "",
  priority: "",
  status: "",
};
const Sidebar = () => {
  const [info, setInfo] = useState(details);
  const { data: response = {}, error } = useGetTasksQuery();
  const tasks = Array.isArray(response.data) ? response.data : [];
  const totalrecords = tasks.length;
  const completedtasks = tasks.filter((t) => t.status === "Completed").length;
  const importanttasks = tasks.filter((t) => t.priority === "High").length;
  return (
    <Box
      sx={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(180deg, #0b1230 0%, #1c1b5a 100%)",
        color: "white",
        overflowY: "auto",
      }}
    >
      <Box sx={{ px: 3, pt: 4, pb: 3 }}>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Task Sphere
        </Typography>

        <Typography
          sx={{
            color: "#9ea7c3",
            mt: 1,
          }}
        >
          Manage and organize tasks
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
      <List sx={{ px: 1.5, py: 2 }}>
        <ListItemButton
          sx={{
            height: "58px",
            borderRadius: "16px",
            mb: 1.5,
            background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "white",
              minWidth: "42px",
            }}
          >
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                All Tasks
              </Typography>
            }
          />
          <Badge
            badgeContent={totalrecords}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            height: "56px",
            borderRadius: "14px",
            mb: 1,
            color: "#d6dcf4",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#d6dcf4",
              minWidth: "42px",
            }}
          >
            <CheckIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ color: "#d6dcf4" }}>Completed</Typography>
            }
          />

          <Badge
            badgeContent={completedtasks}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "white",
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            height: "56px",
            borderRadius: "14px",
            color: "#d6dcf4",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#d6dcf4",
              minWidth: "42px",
            }}
          >
            <OutlinedFlagIcon />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography sx={{ color: "#d6dcf4" }}>Important</Typography>
            }
          />
          <Badge
            badgeContent={importanttasks}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "white",
              },
            }}
          />
        </ListItemButton>
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
    </Box>
  );
};

export default Sidebar;
