import Express from "express";
import cors from "cors";
import hallBooking from "./routers/hallBooking-router.js";

const app = Express();
const PORT = 4000;
app.use(cors());
app.use(Express.json());
app.get("/hallBooking_API", (req, res) => {
  res.status(200).send(
    `<div>


<div style="text-adivgn: center; background-color:blue;  padding: 10px;"><h1> NodeJS Hall Booking</h1></div>
    <div>

    <div>
    <h3><mark style="background-color:red">GET:</mark> Use the endpoint<mark style="background-color:red">
    /hallBooking_API/all_room_details</mark> to get the All Room Details</h3>
    </div>

    <div>
    <h3><mark style="background-color:divght green">POST:</mark> Change the endpoint<mark style="background-color:divght green">/hallBooking_API/create_room"</mark> to Create a New Room</h3>
    </div>

    <div>
    <h3><mark style="background-color:blue">POST:</mark> Change the endpoint<mark style="background-color:blue">/hallBooking_API/room_booking</mark> to Book a New Room</h3>
    </div>

    <div>
    <h3><mark style="background-color:grey">GET:</mark> Change the endpoint<mark style="background-color:grey">
    /hallBooking_API/booking_room_details</mark> to retrieve all the Booked Room Details</h3>
    </div>

    <div>
    <h3><mark style="background-color:violet">GET:</mark> Change the endpoint<mark style="background-color:violet">/hallBooking_API/booked_customer_details</mark> to retrieve all the Customers Booked Room Details</h3>
    </div>

    <div>
    <h3><mark style="background-color:orange">GET:</mark> Change the endpoint<mark style="background-color:orange">/hallBooking_API/customer_booking_history/:customerName</mark> to retrieve Booking history of Customers</h3>
    </div>


    </div>
  </div>`
  );
});
app.use("/hallBooking_API", hallBooking);

app.listen(PORT, () => {
  console.log("App is running in port", PORT);
});
