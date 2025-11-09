# Travela - Setup & Development Guide

## Current Status

✅ **Completed:**
- Project skeleton structure
- Database schema (PostgreSQL via Supabase)
- Authentication system (register, login, logout)
- Trip CRUD operations
- Comments functionality
- Photos functionality
- Admin moderation endpoints
- Session-based authentication with express-session

## Running the Application

### 1. Start the Backend Server

```bash
npm run server
```

Server runs on: http://localhost:3001

### 2. Start the Next.js Frontend (in a new terminal)

```bash
npm run dev
```

Frontend runs on: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get all public trips
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips` - Create trip (auth required)
- `PUT /api/trips/:id` - Update trip (owner only)
- `DELETE /api/trips/:id` - Delete trip (owner only)

### Comments
- `GET /api/comments/trip/:tripId` - Get comments for trip
- `POST /api/comments` - Create comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (owner/admin)

### Photos
- `GET /api/photos/trip/:tripId` - Get photos for trip
- `POST /api/photos` - Add photo (auth required)
- `DELETE /api/photos/:id` - Delete photo (owner/admin)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/trips/:id` - Delete any trip (admin only)
- `DELETE /api/admin/comments/:id` - Delete any comment (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)

## Testing

### Test Database Connection
```bash
node test-db-connection.js
```

### Test Authentication
```bash
node test-auth.js
```

## Next Steps

1. **Connect Frontend to Backend**
   - Update login/register pages to call API
   - Implement session management on frontend
   - Add protected routes

2. **Implement OpenStreetMap Integration**
   - Set up Leaflet in MapComponent
   - Add location picker for trip creation
   - Display trips on interactive map

3. **Add Photo Upload**
   - Integrate Supabase Storage or another service
   - Implement file upload UI
   - Handle image optimization

4. **Polish UI/UX**
   - Add loading states
   - Implement error handling
   - Add success notifications
   - Make responsive for mobile

5. **Testing & Deployment**
   - Add comprehensive tests
   - Set up CI/CD
   - Deploy to production

## Environment Variables

Make sure your `.env` file has:
```
DB_HOST=your_supabase_host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
SESSION_SECRET=your_secret_key
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: express-session, bcryptjs
- **Maps**: OpenStreetMap, Leaflet (to be integrated)
