import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { handleSuccess, handleError } from "../utils";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../redux/taskSlice";

const taskdetails = {
  task_name: "",
  category: "",
  due_date: "",
  priority: "",
  status: "Pending",
};

const Filter = () => {
  const [info, setInfo] = useState(taskdetails);

  const [filterByCategory, setFilterByCategory] = useState("All");

  const [filterByPriority, setFilterByPriority] = useState("");

  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editTask, setEditTask] = useState(null);

  const rowsPerPage = 5;

  const { data: response = {}, refetch } = useGetTasksQuery();

  const [createTask] = useCreateTaskMutation();

  const [updateTask] = useUpdateTaskMutation();

  const [deleteTask] = useDeleteTaskMutation();

  const tasks = Array.isArray(response?.data) ? response.data : [];

  const searchedTasks = tasks.filter((t) =>
    t.task_name?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredTasks =
    filterByCategory === "All"
      ? searchedTasks
      : searchedTasks.filter((t) => t.category === filterByCategory);

  const filteredTaskByPriority =
    filterByPriority === ""
      ? filteredTasks
      : filteredTasks.filter((t) => t.priority === filterByPriority);

  const sortedTasks = [...filteredTaskByPriority].sort((a, b) => {
    if (sort === "Latest") {
      return new Date(b.due_date) - new Date(a.due_date);
    }

    if (sort === "Oldest") {
      return new Date(a.due_date) - new Date(b.due_date);
    }

    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / rowsPerPage));

  const paginatedTasks = sortedTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateOpen = () => {
    setEditTask(null);

    setInfo(taskdetails);

    setOpen(true);
  };

  const handleEditOpen = (task) => {
    setEditTask(task);

    setInfo({
      task_name: task.task_name || "",
      category: task.category || "",
      due_date: task.due_date?.slice(0, 10) || "",
      priority: task.priority || "",
      status: task.status || "Pending",
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setEditTask(null);

    setInfo(taskdetails);
  };

  const handleSubmit = async () => {
    try {
      if (editTask) {
        await updateTask({
          id: editTask._id,
          ...info,
        }).unwrap();

        handleSuccess("Record updated successfully!!");
      } else {
        await createTask(info).unwrap();

        handleSuccess("Record added successfully!!");
      }

      handleClose();
      refetch();
    } catch (err) {
      handleError("Error in creating record!!");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask({
        id: task._id,
        ...task,
        status: task.status === "Completed" ? "Pending" : "Completed",
      }).unwrap();

      refetch();
    } catch (err) {
      handleError("Error in updating record!!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id).unwrap();
      handleSuccess("Record deleted successfully!!");
      refetch();
    } catch (err) {
      handleError("Error in deleting record!!");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            p: 3,
            border: "2px solid #ddd",
            borderRadius: "16px",
            backgroundColor: "#fff",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <TextField
                placeholder="Search tasks..."
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: 370 }}
              />

              <TextField
                select
                label="Filter"
                value={filterByCategory}
                onChange={(e) => setFilterByCategory(e.target.value)}
                size="small"
                sx={{ width: 180 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </TextField>
              <TextField
                select
                label="Sort By"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                size="small"
                sx={{ width: 180 }}
              >
                <MenuItem value="Latest">Latest</MenuItem>

                <MenuItem value="Oldest">Oldest</MenuItem>
              </TextField>
              <TextField
                select
                label="Filter"
                value={filterByPriority}
                onChange={(e) => setFilterByPriority(e.target.value)}
                size="small"
                sx={{ width: 180 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Box>
            <Button
              variant="contained"
              onClick={handleCreateOpen}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                minWidth: "120px",
                height: "40px",
              }}
            >
              + Add Task
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 900,
              }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 0 }} />

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Task Name
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Category
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Due Date
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Priority
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Status
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>
                      <Checkbox
                        checked={task.status === "Completed"}
                        onChange={() => handleToggleComplete(task)}
                      />
                    </TableCell>
                    <TableCell>{task.task_name}</TableCell>
                    <TableCell>
                      <Chip label={task.category} size="small" />
                    </TableCell>
                    <TableCell>{task.due_date?.slice(0, 10)}</TableCell>
                    <TableCell>{task.priority}</TableCell>

                    <TableCell>
                      <Chip
                        label={task.status}
                        color={
                          task.status === "Completed" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditOpen(task)}>
                        <EditOutlinedIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(task._id)}>
                        <DeleteIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              alignItems: "center",
            }}
          >
            <Box>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredTaskByPriority.length)} of{" "}
              {filteredTaskByPriority.length}
            </Box>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle sx={{ ml: "210px" }}>
            {editTask ? "Edit Task" : "Create Task"}
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Task Name"
              name="task_name"
              value={info.task_name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="dense"
              select
              label="Category"
              name="category"
              value={info.category}
              onChange={handleChange}
            >
              <MenuItem value="Work">Work</MenuItem>

              <MenuItem value="Personal">Personal</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="dense"
              select
              label="Priority"
              name="priority"
              value={info.priority}
              onChange={handleChange}
            >
              <MenuItem value="High">High</MenuItem>

              <MenuItem value="Medium">Medium</MenuItem>

              <MenuItem value="Low">Low</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="dense"
              type="date"
              name="due_date"
              value={info.due_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              margin="dense"
              select
              label="Status"
              name="status"
              value={info.status}
              onChange={handleChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>

              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button variant="contained" onClick={handleSubmit}>
              {editTask ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Filter;
