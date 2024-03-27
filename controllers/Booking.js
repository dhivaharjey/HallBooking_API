let rooms = [
  {
    roomId: 1,
    roomName: "RS1",
    amenities: ["Tv", "washing Machine", "AC"],
    seats: 4,
    pricePerHour: "1000rs",
  },
  {
    roomId: 2,
    roomName: "RS2",
    amenities: ["Tv", "washing Machine", "AC"],
    seats: 6,
    pricePerHour: "1500rs",
  },
];
const bookings = [];

//////////////////////// to get all room details
export const getAllRoomDetails = (req, res) => {
  try {
    res.status(200).json({ message: " All room details", data: rooms });
  } catch (error) {
    res.status(404).json({ message: "Not found", error });
  }
};

///////////////////////// To create new rooms //////////
export const createRoom = (req, res) => {
  try {
    const { roomName, seats, amenities, pricePerHour } = req.body;
    const roomData = {
      roomId: rooms.length + 1,
      roomName: roomName,
      // roomStatus: roomStatus,
      amenities: amenities,
      seats: seats,
      pricePerHour: pricePerHour,
    };
    rooms.push(roomData);
    res
      .status(200)
      .json({ message: "Room created successfully!!!", Room: roomData });
  } catch (error) {
    res.status(404).json({ message: "Internal Error" });
  }
};

///////////////// For start and end time format for room booking///////////////////
const formatTime = (time) => {
  // Split the time into hours, minutes, and period (AM/PM)
  const [hours, minutes, period] = time.split(/:| /);
  // Convert hours to 24-hour format if it's PM and not 12 PM
  const formattedHours =
    period.toUpperCase() === "PM" && hours !== "12"
      ? String(parseInt(hours, 10) + 12)
      : hours.padStart(2, "0"); // Pad hours with 0 if it's less than 10
  // Return formatted time as HH:mm
  return `${formattedHours}:${minutes}`;
};

///////////////////////////  Room Booking //////////////////////
export const roomBooking = (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const roomsAvailable = rooms.find((room) => room.roomId === roomId);
    if (!roomsAvailable) {
      return res.status(404).json({ message: "Room not found" });
    }

    // const isRoomAvailable = !bookings.some(
    //   (booking) =>
    //     booking.roomId === roomId &&
    //     date === booking.date &&
    //     ((startTime >= booking.startTime && startTime < booking.endTime) ||
    //       (endTime > booking.startTime && endTime <= booking.endTime) ||
    //       (startTime <= booking.startTime && endTime >= booking.endTime))
    // );
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const isRoomAvailable = !bookings.some(
      (booking) =>
        booking.roomId === roomId &&
        date === booking.date &&
        ((formattedStartTime >= formatTime(booking.startTime) &&
          formattedStartTime < formatTime(booking.endTime)) ||
          (formattedEndTime > formatTime(booking.startTime) &&
            formattedEndTime <= formatTime(booking.endTime)) ||
          (formattedStartTime <= formatTime(booking.startTime) &&
            formattedEndTime >= formatTime(booking.endTime)))
    );

    if (!isRoomAvailable) {
      return res.status(400).json({
        message:
          "Room is already booked for the selected date and time or Room is not available",
      });
    }
    const booking = {
      bookingId: bookings.length + 1,
      roomId,
      customerName,
      date,
      startTime,
      endTime,
    };
    bookings.push(booking);
    res
      .status(201)
      .json({ message: "Room Booked Successfully", bookedRoomDetail: booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while booking the room", error });
  }
};

/////////////////// To get Booked room details ////////////////////////
export const bookingRoomsInfo = (req, res) => {
  // Here, we're creating a new array called roomsWithBookings
  const roomsWithBookings = rooms.map((room) => {
    //This line filters the bookings array to get only the bookings that match the current room's roomId. It creates a new array called bookingsForRoom.
    const bookingsForRoom = bookings.filter(
      (booking) => booking.roomId === room.roomId
    );
    const bookedStatus = bookingsForRoom.length > 0;

    if (bookedStatus) {
      const bookedData = bookingsForRoom.map((booking) => ({
        customerName: booking.customerName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      }));
      return {
        roomName: room.roomName,
        bookedStatus,
        bookings: bookedData,
      };
    } else {
      const bookedData = "Bookings not found -- No bookings available";
      return {
        roomName: room.roomName,
        bookedStatus,
        bookings: bookedData,
      };
    }
  });
  res.status(200).json({
    message: "All Booked rooms details",
    bookedRooms: roomsWithBookings,
  });
};

/////////////////////// Booked customer details //////////////////

export const bookedCustomersDetails = (req, res) => {
  if (bookings.length > 0) {
    const data = bookings.map((booking) => {
      const room = rooms.find((room) => room.roomId === booking.roomId);
      const roomName = room ? room.roomName : "Room Not Found";
      return {
        roomId: booking.roomId,
        roomName: roomName,
        customerName: booking.customerName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
    });
    res.status(200).json({
      message: "Successfully Fetched All Customers with Booked Room Details",
      bookedCustomer: data,
    });
  } else {
    res.status(404).json({ message: "Customers not available" });
  }
};

////////////////////////// customer booking history ///////////////////////
export const customerBookingHistory = (req, res) => {
  try {
    const customerName = req.params.customerName;
    const customerBookingDetails = {};
    bookings
      .filter((booking) => booking.customerName === customerName)
      .forEach((booking) => {
        const key = `${booking.customerName}-${booking.roomId}`;
        if (customerBookingDetails[key]) {
          customerBookingDetails[key].count++;
          customerBookingDetails[key].bookings.push({
            bookingId: booking.bookingId,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.bookingStatus,
          });
        } else {
          customerBookingDetails[key] = {
            count: 1,
            customerName: booking.customerName,
            roomId: booking.roomId,
            roomName: rooms.find((room) => room.roomId === booking.roomId)
              ?.roomName,
            bookings: [
              {
                bookingId: booking.bookingId,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingDate: booking.bookingDate,
                bookingStatus: booking.bookingStatus,
              },
            ],
          };
        }
      });

    const customerBookingSummary = Object.values(customerBookingDetails).map(
      (booking) => ({
        customerName: booking.customerName,
        roomName: booking.roomName,
        count: booking.count,
        bookings: booking.bookings,
      })
    );

    res.status(200).json({
      message: "Successfully Fetched Customer Booking History",
      customerName: customerName,
      customerBookingHistory: customerBookingSummary,
    });
  } catch (error) {
    console.error("Error fetching customer booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
