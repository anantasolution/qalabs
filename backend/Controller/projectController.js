import PROJECT from "../models/PROJECT.js";
import fs from "fs";

// Create new project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    console.log(image);

    const imageFormat = image
      ? {
          filetype: image.mimetype,
          filepath: image.path,
          filename: image.filename,
          fileSize: `${image.size} bytes`,
        }
      : null;
    const project = new PROJECT({
      title,
      description,
      photo: imageFormat,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });

    console.log(error);
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await PROJECT.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await PROJECT.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// Update project by ID
export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = req.file
      ? {
          filetype: req.file.mimetype,
          filename: req.file.filename,
          filepath: req.file.path,
          fileSize: `${req.file.size} bytes`,
        }
      : undefined;

    // Fetch the existing project
    const existingProject = await PROJECT.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the project
    const updatedProject = await PROJECT.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ...(photo && { photo }), // Update only if new file is uploaded
      },
      { new: true, runValidators: true }
    );

    // Delete the old photo if a new one is uploaded
    if (photo && existingProject.photo) {
      fs.unlink(existingProject.photo.filepath, (err) => {
        if (err) {
          console.error("Error deleting old photo:", err);
        }
      });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
    console.log(error);
  }
};

// Delete project by ID
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await PROJECT.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
