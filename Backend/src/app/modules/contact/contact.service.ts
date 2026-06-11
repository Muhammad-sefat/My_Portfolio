import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

const addContactIntoDB = async (payload: Partial<IContact>) => {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const subject = payload.subject || "Contact Form Submission";

  const result = await Contact.create({
    name: payload.name,
    email: payload.email,
    subject,
    message: payload.message,
    date,
    read: false,
  });
  return result;
};

const getAllContactsFromDB = async (filterType?: string) => {
  let filter = {};
  if (filterType === "unread") {
    filter = { read: false };
  } else if (filterType === "read") {
    filter = { read: true };
  }
  const result = await Contact.find(filter).sort({ createdAt: -1 });
  return result;
};

const markContactAsReadInDB = async (id: string) => {
  const result = await Contact.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
  return result;
};

const deleteContactFromDB = async (id: string) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

export const ContactServices = {
  addContactIntoDB,
  getAllContactsFromDB,
  markContactAsReadInDB,
  deleteContactFromDB,
};
