import { contactsApi } from "../api/contactsApi";

export const contactService = {
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    contactsApi.submitContactForm(data),
};
