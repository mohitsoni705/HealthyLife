import express from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/user.controller.ts";

const router = express.Router();


router.get("/users",getUsers);
router.put("/user/:id",updateUser);
router.delete("/user/:id",deleteUser);
export default router;