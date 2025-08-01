import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByTour,
  getAllBookings,
  getRevenues,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/revenue",getRevenues);
router.get("/user/:userId", getBookingsByUser);
router.get("/tour/:tourId", getBookingsByTour);
router.put("/:id/status", updateBookingStatus);
router.delete("/:id", deleteBooking);

export default router;