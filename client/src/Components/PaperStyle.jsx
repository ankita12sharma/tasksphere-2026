import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import { useGetTasksQuery } from "../redux/taskSlice";
import React from "react";

const PaperStyle = () => {
  const { data: response = {} } = useGetTasksQuery();
  const tasks = Array.isArray(response.data) ? response.data : [];

  const total = tasks.length;
  let completed = tasks.filter((t) => t.status === "Completed").length;
  let important = tasks.filter((t) => t.priority === "High").length;
  const today = tasks.filter((t) => {
    const todayDate = new Date().toISOString().split("T")[0];
    return t.due_date?.startsWith(todayDate);
  }).length;

  const cardStyle = {
    width: 274,
    height: 132,
    borderRadius: "14px",
    p: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        position: "fixed",
        top: "120px",
        left: "305px",
        right: "40px",
        zIndex: 1000,
      }}
    >
      <Paper sx={cardStyle}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e0f2fe",
          }}
        >
          <ListRoundedIcon sx={{ color: "#3b82f6" }} />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontSize: "20px" }}
          >
            Total Tasks
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "30px" }}>
            {total}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", fontSize: "20px" }}
          >
            All time tasks
          </Typography>
        </Box>
      </Paper>

      <Paper sx={cardStyle}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff7ed",
          }}
        >
          <WatchLaterOutlinedIcon sx={{ color: "#f59e0b" }} />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontSize: "20px" }}
          >
            Today
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "30px" }}>
            {today}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", fontSize: "20px" }}
          >
            Tasks for today
          </Typography>
        </Box>
      </Paper>

      <Paper sx={cardStyle}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#dcfce7",
          }}
        >
          <DoneOutlinedIcon sx={{ color: "#22c55e" }} />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontSize: "20px" }}
          >
            Completed
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "30px" }}>
            {completed}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", fontSize: "20px" }}
          >
            Well done!
          </Typography>
        </Box>
      </Paper>

      <Paper sx={cardStyle}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fee2e2",
          }}
        >
          <OutlinedFlagRoundedIcon sx={{ color: "#ef4444" }} />
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontSize: "20px" }}
          >
            Important
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "30px" }}>
            {important}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", fontSize: "20px" }}
          >
            High priority
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaperStyle;
