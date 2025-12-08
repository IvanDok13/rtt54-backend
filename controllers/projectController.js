const Project = require('../models/Project');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id: ${projectId} not found!` });
    }

    // Authorization
    console.log(req.user._id);
    console.log(project.user);

    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'User is not authorized!' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id: ${projectId} not found!` });
    }

    // Authorization
    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'User is not authorized!' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
};
