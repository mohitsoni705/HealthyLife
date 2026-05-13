    import express from "express";
    import { loginUser, signUp } from "../controllers/auth.controller.ts";

    const router = express.Router();

    router.post("/login",loginUser);
    router.post("/signup",signUp);

    export default router;
