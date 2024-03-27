import express from "express";
// import cors from "cors";
import {
  bookedCustomersDetails,
  bookingRoomsInfo,
  createRoom,
  customerBookingHistory,
  getAllRoomDetails,
  roomBooking,
} from "../controllers/Booking.js";
const router = express.Router();

router.post("/create_room", createRoom);
router.get("/all_room_details", getAllRoomDetails);
router.post("/room_booking", roomBooking);
router.get("/booking_room_details", bookingRoomsInfo);
router.get("/booked_customer_details", bookedCustomersDetails);
router.get("/customer_booking_history/:customerName", customerBookingHistory);
export default router;
