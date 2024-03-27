## NodeJs

---

- Create folder open that in cmd
- In cmd

- `$ npm init`
- This utility will walk you through creating a package.json file.
- It only covers the most common items, and tries to guess sensible defaults.

- See `npm help init` for definitive documentation on these fields
  and exactly what they do.

- Use `npm install <pkg>` afterward to install a package and
  save it as a dependency in the package.json file.

```
Press ^C at any time to quit.
package name: (my-project)
version: (1.0.0)
description: A sample Twilio project
-entry point: (index.js)
test command:
git repository:
keywords:
author: Jane Doe
license: (ISC)
About to write to /Users/<your-username>/my-project/package.json:
{
"name": "my-project",
"version": "1.0.0",
"description": "A sample Twilio project",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "Jane Doe",
"license": "ISC"
}
Is this OK? (yes) yes

```

- Then install `npm i express ` framework.

- Third party packages used **cors** and **nodemon**.

- Then install `npm i cors nodemon `.

---

## HALL BOOKING API

- **GET**: Use the endpoint `/hallBooking_API/all_room_details `to get the All Room Details
- **POST**: Change the endpoint `/hallBooking_API/create_room` to Create a New Room
- **POST**: Change the endpoint `/hallBooking_API/room_booking` to Book a New Room
- **GET**: Change the endpoint `/hallBooking_API/booking_room_details` to retrieve all the Booked Room Data
- **GET**: Change the endpoint `/hallBooking_API/booked_customer_details` to retrieve all the Customers Booked Room Details
- **GET**: Change the endpoint `/hallBooking_API/customer_booking_history/:customerName` to retrieve Booking history of customer.

- Deployed in render .
- API documentation created using **POSTMAN**.
- Click here to see [API DOCUMENTATION LINK](https://documenter.getpostman.com/view/33076303/2sA35EY2gM)

> Thanks for visiting...😊
