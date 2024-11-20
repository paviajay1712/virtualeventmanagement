# Virtual Event Management Backend

This is a Node.js-based backend system for a virtual event management platform. It includes features like user registration, secure authentication, event management, and participant registration. The backend uses in-memory data structures for simplicity.

## Features

- **User Authentication**: Secure user registration and login with `bcrypt` and JWT.
- **Event Management**: Create, update, delete, and list events.
- **Participant Management**: Register users for events and track participants.
- **Email Notifications**: Sends confirmation emails using `nodemailer`.

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Framework for RESTful APIs.
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: Token-based authentication.
- **nodemailer**: Sending email notifications.
- **dotenv**: Managing environment variables.

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- npm (comes with Node.js)

### Steps to Run

Clone the repository:

```bash
git clone https://github.com/paviajay1712/virtualeventmanagement.git
cd virtual-event-management
npm run dev

The application runs at http://localhost:3000.

```
