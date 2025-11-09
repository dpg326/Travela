# Travela
CSE264 Group Project
Project name: Travela (Travel Experience Platform)
Team Members: 
Daniel Givens- Fullstack, Database Administrator
 Laura Riegle- Frontend developer, UI/UX Designer
 Lily Fandre- Frontend Developing, Testing

Application Requirements: 
User Accounts & Roles
Users
Can register, log in, and manage their own trips.


Can create, edit, and delete their travel posts with titles, photos, and location data.


Can browse and comment on other users’ public trips.
Admins
Have all user capabilities plus moderation tools.


Can remove inappropriate content.
Authentication:
Using Express-session for session-based login


Login state is persisted through secure cookies.
 Database
PostgreSQL as the relational database.


Data tables include:


Users: Stores username, email, password hash, and role (user/admin).


Trips: Contains user ID, destination name, description, date range, coordinates, and photo URLs.


Photos: Stores URLs linked to specific trips.


Comments: Connects user interactions with trips.
Interactive Layout: Using Next.JS, React, and Tailwind CSS we plan to create an interactive UI that incorporates maps fetched from our openstreetmap api; Users will be able to like and comment and see their behaviors updated automatically on the frontend.
New Library: Tailwind CSS will be used to improve our frontend and allow for more customization and appeal.
Internal REST API:
custom REST API (built with Express.js or Next.js API routes) will handle CRUD operations for trips, photos, and comments
External REST API: Open Streetmap for interactive world map
USER STORIES: 
As a  user,I want to create a trip post with photos and location details, so that I can share travel experiences with others.

Use Case:
The user logs in to their account. On their dashboard, they click “Create Trip.” They enter a trip title, description, and upload photos. Using the integrated OpenStreetMap, they tag the location. After submitting, the new trip appears on their profile and becomes visible to others.

As a  user,I want to browse and comment on other users’ public trips, so that I can discover new destinations and connect with fellow travelers.

Use Case: The user navigates to the Explore page.They see a list  of all public trips.
Clicking on a trip opens its details, including photos and comments.  The user can leave a comment or like the post, and the interaction appears immediately on the page.

As an admin ,I want to remove inappropriate or offensive posts, so that the platform remains safe and welcoming for all users.

Use Case:The admin logs into their dashboard. They view a list of reported or flagged posts. After reviewing, they can delete the post or ban the user if necessary. The change is reflected immediately across the site.


Frontend: Next.js, React, vite, CSS, HTML, Javascript, Tailwind CSS
Backend: Express.js, Node.js
Database: PostgresSQL
Version Control: Github
APIS:Openstreetmap for interactive world map


	


