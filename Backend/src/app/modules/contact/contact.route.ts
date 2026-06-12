import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ContactControllers } from "./contact.controller";
import { ContactValidations } from "./contact.validation";

const router = Router();

/**
 * @openapi
 * /api/contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Get all contact messages
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema: { type: string }
 *         description: Filter by read/unread status
 *     responses:
 *       200:
 *         description: Contact messages retrieved successfully
 */

router.get("/", ContactControllers.getAllContacts);

/**
 * @openapi
 * /api/contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Submit a new contact message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               subject:
 *                 type: string
 *                 example: "Project Inquiry"
 *               message:
 *                 type: string
 *                 example: "I'd love to work with you on..."
 *     responses:
 *       201:
 *         description: Contact message sent successfully
 */

router.post(
  "/",
  validateRequest(ContactValidations.createContactValidationSchema),
  ContactControllers.addContact
);

/**
 * @openapi
 * /api/contacts/{id}/read:
 *   patch:
 *     tags: [Contacts]
 *     summary: Mark a contact message as read
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact message marked as read
 */

router.patch("/:id/read", ContactControllers.markContactAsRead);

/**
 * @openapi
 * /api/contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 */

router.delete("/:id", ContactControllers.deleteContact);

export const ContactRoutes = router;
