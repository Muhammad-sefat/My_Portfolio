import { contactsApi } from "../api/contactsApi";

export const contactService = {
  getContacts: () => contactsApi.getContacts(),
  markAsRead: (id: string) => contactsApi.markAsRead(id),
  deleteContact: (id: string) => contactsApi.deleteContact(id),
};
