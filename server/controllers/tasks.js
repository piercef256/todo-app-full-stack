express = require("express");
mongoose = require("mongoose");

const Task = require("../models/task.js");

// CREATE
const createTask = async (req, res) => {
  const { title } = req.body;

  const newTask = new Task({
    title,
  });

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// READ ALL TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// READ INDIVIDUAL TASK
const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No task with id: ${id}`);

  const updatedTask = { title, _id: id };
  await Task.findByIdAndUpdate(id, updatedTask, { new: true });

  res.json(updatedTask);
};

// DELETE
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No task with id: ${id}`);

  await Task.findByIdAndRemove(id);

  res.json({ message: "Task deleted successfully." });
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
