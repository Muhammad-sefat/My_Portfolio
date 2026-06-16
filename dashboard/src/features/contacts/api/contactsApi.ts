import { Contact } from "../types";
import { INITIAL_CONTACTS } from "../data/mockContacts";

export const contactsApi = {
  getContacts: async (): Promise<Contact[]> => {
    // Placeholder for API fetching
    return INITIAL_CONTACTS;
  },
};
