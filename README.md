# **Event Management and Booking Platform**

Welcome to the Event Management and Booking Platform! This system empowers admins, organizers, and attendees to manage and participate in events seamlessly. With real-time ticket booking, advanced analytics, and multi-tenant support, this platform is designed for scalability and an exceptional user experience.

---

## **Features**

### 🔑 **Home**
- **User Authentication**: Secure login and registration for all users.
- **Event Discovery**: Easily browse events by category, date, or location.

![Home - Homepage](showcase/home/homepage.png)  
*Homepage showcasing event categories and user options.*

![Home - Login](showcase/home/login.png)  
*Login page for users to securely access the platform.*

![Home - Sign In](showcase/home/signin.png)  
*Registration page for new users.*

---

### 👩‍💼 **Admin Panel**
- **Dashboard**: Get an overview of all events, bookings, and platform activity.
- **Event Management**: View and manage all events across the platform.
- **Booking Insights**: Monitor booking trends and statuses in real-time.

![Admin - Dashboard](showcase/admin/admin-dashboard.png)  
*Admin dashboard displaying key metrics and insights.*

![Admin - View All Events](showcase/admin/admin-viewallevents.png)  
*Page for admins to view and manage all platform events.*

![Admin - View Bookings](showcase/admin/admin-viewbookings.png)  
*Admin interface to monitor and manage bookings.*

---

### 🎤 **Organizer Panel**
- **Dashboard**: Manage your events efficiently with detailed insights.
- **Add Events**: Create and configure new events with ease.
- **Bookings Overview**: Track event bookings and attendee details.

![Organizer - Dashboard](showcase/organizer/organizer-dashboard.png)  
*Organizer dashboard providing a summary of their events and bookings.*

![Organizer - Add Event Popup](showcase/organizer/organizer-addevent-popup.png)  
*Popup interface for adding a new event.*

![Organizer - Add Event](showcase/organizer/organizer-addevent.png)  
*Event creation form with fields for title, date, and more.*

![Organizer - View Bookings](showcase/organizer/organizer-viewbookings.png)  
*Bookings page showing attendee details for specific events.*

---

### 🧑‍🤝‍🧑 **Attendee Panel**
- **Dashboard**: View your personalized event experience.
- **Event Browsing**: Discover and register for upcoming events.
- **Bookings Management**: Track your tickets and booking details.
- **Payment Gateway**: Seamless and secure ticket purchases.
- **Event Ticket**: Access your event ticket directly within the platform.

![Attendee - Dashboard](showcase/attendee/attendee-dashboard.png)  
*Personalized attendee dashboard with quick access to events and tickets.*

![Attendee - All Events](showcase/attendee/attendee-allevents.png)  
*Explore and browse all available events.*

![Attendee - Register Event](showcase/attendee/attendee-registerevent.png)  
*Register for an event through a simple interface.*

![Attendee - Payment Gateway](showcase/attendee/attendee-paymentgateway.png)  
*Secure and seamless payment gateway for ticket purchases.*

![Attendee - Event Ticket](showcase/attendee/attendee-eventticket.png)  
*View and access your ticket directly after booking.*

![Attendee - Bookings](showcase/attendee/attendee-bookings.png)  
*Manage and track all your bookings in one place.*

---

## **Tech Stack**

- **Frontend**: Angular with Tailwind CSS for a responsive and modern user interface.
- **Backend**: Golang with `net/http` for fast, scalable RESTful APIs.
- **Database**: MySQL for reliable data storage and query handling.

---

## **Installation**

### 1️⃣ Prerequisites
- Node.js (for the frontend)
- Go (for the backend)
- MySQL (for the database)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/abhisheksinghf/Algomox-golang-angular
cd your-repository
```

### 3️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 4️⃣ Set Up Backend
- Configure MySQL database credentials in the backend environment file.
- Run the Go server:
```bash
cd backend
go run main.go
```

### 5️⃣ Run the Application
- Start the frontend server:
```bash
cd frontend
npm start
```

