const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  try {
    const { task_name, category, due_date, priority, status } = req.body;
    const user_id = req.user?.id || req.body.user_id;
    if (!task_name || !category || !due_date || !priority || !status) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "All fields are required!!",
      });
    }
    const task = await TaskModel.findOne({ user_id, task_name });
    if (task) {
      return res.status(409).json({
        responseCode: "409",
        responseMessage: "Task is already created!!",
      });
    }
    const createData = new TaskModel({
      user_id,
      task_name,
      category,
      due_date,
      priority,
      status,
    });
    await createData.save();

    res.status(201).json({
      responseCode: "201",
      responseMessage: "Task created successfully!!",
      createData,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in creating the record!!",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in fetching the records!!",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { task_name, category, due_date, priority, status } = req.body;

    const { id } = req.params;

    const update = {};

    if (task_name !== undefined) {
      update.task_name = task_name;
    }

    if (category !== undefined) {
      update.category = category;
    }

    if (due_date !== undefined) {
      update.due_date = due_date;
    }

    if (priority !== undefined) {
      update.priority = priority;
    }

    if (status !== undefined) {
      update.status = status;
    }

    const updatedRecord = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: update,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedRecord) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "Task not found!!",
      });
    }

    return res.status(200).json({
      responseCode: "200",
      responseMessage: "Task updated successfully!!",
      data: updatedRecord,
    });
  } catch (err) {
    return res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in updating record!!",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "Task not found!!",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Task deleted successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in deleting the task!!",
    });
  }
};

const getTasksByFilter = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { task_name, priority, category, status, sort } = req.query;

    const filter = {};

    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const normalizedSort = sort?.trim().toLowerCase();

    let sortedOption = { createdAt: -1 };
    if (normalizedSort === "oldest") {
      sortedOption.createdAt = 1;
    }

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const [
      tasks,
      totalTasks,
      highPriorityCount,
      completedTasksCount,
      todayTaskCount,
    ] = await Promise.all([
      TaskModel.find(filter).sort(sortedOption).skip(skip).limit(limit),

      TaskModel.countDocuments(filter),

      TaskModel.countDocuments({ priority: "High" }),

      TaskModel.countDocuments({ status: "Completed" }),

      TaskModel.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }),
    ]);

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      meta: {
        page,
        limit,
        totalTasks,
        returnedRecords: tasks.length,
        highPriorityCount,
        completedTasksCount,
        todayTaskCount,
      },
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in filtering records!!",
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksByFilter,
};
