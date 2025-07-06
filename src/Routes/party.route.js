import { Router } from "express";
import { createParty, getAllParties } from "../Controllers/party.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";
import authorizeRole from "../Middlewares/authorizeRole.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();
router
  .route("/create")
  .post(
    verifyToken,
    authorizeRole("admin"),
    upload.single("image"),
    createParty
  );
router.route("/get").get(getAllParties);

export default router;
