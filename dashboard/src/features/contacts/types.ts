export interface Contact {
  _id?: string;
  id?: string | number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date?: string;
  read: boolean;
  createdAt?: string;
}
