import { Contact } from "../types";

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Freelance Project Inquiry",
    message: "Hi Sefat, I'm looking for a frontend developer to help build a custom Next.js application with Tailwind styling. Your portfolio looks great! Let me know your rates and availability.",
    date: "Jun 10, 2026",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    subject: "Job Opening at Tech Corp",
    message: "Hello Sefat, we have an opening for a Junior Frontend Developer position at Tech Corp. We would love to chat about your background and schedule a screening call. Let me know if you are interested!",
    date: "Jun 08, 2026",
    read: true,
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@designco.net",
    subject: "Collaboration Invitation",
    message: "Hey! I'm a UI/UX designer and I have a few clients who need development work. I'd love to partner up and refer them to you. Let's jump on a quick Zoom call to discuss this further.",
    date: "Jun 05, 2026",
    read: false,
  },
];
