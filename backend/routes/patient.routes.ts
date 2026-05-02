import express from "express";

const router = express.Router();
router.get("/patients",getUsers);
router.post("/patients",addUsers);

