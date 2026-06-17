import { api } from "@/lib/api";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data: any;
}

export const contactsApi = {
  async submitContactForm(data: ContactPayload): Promise<ContactResponse> {
    return api.post<ContactResponse>("/contacts", data);
  },
};
