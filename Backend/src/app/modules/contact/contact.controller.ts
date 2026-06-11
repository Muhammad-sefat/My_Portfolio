import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ContactServices } from "./contact.service";

const addContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.addContactIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Contact message sent successfully",
    data: result,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const { filter } = req.query;
  const result = await ContactServices.getAllContactsFromDB(filter as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact messages retrieved successfully",
    data: result,
  });
});

const markContactAsRead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ContactServices.markContactAsReadInDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact message marked as read",
    data: result,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ContactServices.deleteContactFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact message deleted successfully",
    data: null,
  });
});

export const ContactControllers = {
  addContact,
  getAllContacts,
  markContactAsRead,
  deleteContact,
};
