import { Project } from "../project/project.model.js";
import { Blog } from "../blog/blog.model.js";
import { Contact } from "../contact/contact.model.js";

const getStatsFromDB = async () => {
  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const unreadMessages = await Contact.countDocuments({ read: false });

  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(3);

  const recentBlogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(3);

  return {
    totalProjects,
    totalBlogs,
    unreadMessages,
    recentProjects,
    recentBlogs,
  };
};

export const MetaServices = {
  getStatsFromDB,
};
