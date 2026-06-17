import { api } from "@/lib/api";
import { Contact } from "../types";

interface ContactsResponse {
  success: boolean;
  message: string;
  data: Contact[];
}

interface ReadResponse {
  success: boolean;
  message: string;
  data?: Contact;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const contactsApi = {
  async getContacts(): Promise<Contact[]> {
    const response = await api.get<ContactsResponse>("/contacts");
    return response.data;
  },

  async markAsRead(id: string): Promise<boolean> {
    const response = await api.patch<ReadResponse>(`/contacts/${id}/read`, {});
    return response.success;
  },

  async deleteContact(id: string): Promise<boolean> {
    const response = await api.delete<DeleteResponse>(`/contacts/${id}`);
    return response.success;
  },
};
