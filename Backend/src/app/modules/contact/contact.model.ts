import { Schema, model } from "mongoose";
import { IContact } from "./contact.interface";

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Contact = model<IContact>("Contact", contactSchema);

// Seed helper function
export const seedInitialContacts = async (initialContacts: any[]) => {
  const count = await Contact.countDocuments();
  if (count === 0) {
    await Contact.insertMany(initialContacts);
    console.log("Contacts seeded successfully!");
  }
};
