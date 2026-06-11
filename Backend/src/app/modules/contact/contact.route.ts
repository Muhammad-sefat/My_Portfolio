import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ContactControllers } from "./contact.controller";
import { ContactValidations } from "./contact.validation";

const router = Router();

router.get("/", ContactControllers.getAllContacts);

router.post(
  "/",
  validateRequest(ContactValidations.createContactValidationSchema),
  ContactControllers.addContact
);

router.patch("/:id/read", ContactControllers.markContactAsRead);

router.delete("/:id", ContactControllers.deleteContact);

export const ContactRoutes = router;
