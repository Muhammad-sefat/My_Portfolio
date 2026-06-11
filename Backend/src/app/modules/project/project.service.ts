import { IProject } from "./project.interface";
import { Project } from "./project.model";

const addProjectIntoDB = async (payload: IProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find().sort({ createdAt: -1 });
  return result;
};

const updateProjectInDB = async (id: string, payload: Partial<IProject>) => {
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  addProjectIntoDB,
  getAllProjectsFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
};
