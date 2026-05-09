# Backend API Integration Guide

## 🚀 **How to Connect Your Backend API**

### **1. Environment Setup**

Create/update your `.env.local` file:

```env
# Your backend API URL
NEXT_PUBLIC_API_URL=http://localhost:900/api/v1/auth

# For production:
# NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### **2. Backend API Requirements**

Your backend should provide these endpoints:

#### **POST `/api/auth/login`**
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "role": "patient"
}

// Response (Success)
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "patient"
    },
    "token": "jwt_token_here"  // Optional: for authentication
  },
  "message": "Login successful"
}

// Response (Error)
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### **POST `/api/auth/signup`**
```json
// Request
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "patient"
}

// Response (Success)
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "patient"
    },
    "token": "jwt_token_here"  // Optional
  },
  "message": "Account created successfully"
}
```

### **3. CORS Configuration**

Make sure your backend allows requests from your frontend:

```javascript
// Express.js example
const cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-frontend-domain.com'
    : 'http://localhost:3000',
  credentials: true
}));
```

### **4. Authentication Flow**

#### **Token Storage**
- JWT tokens are stored in `localStorage`
- Automatically included in subsequent API calls
- Cleared on logout (you'll need to implement this)

#### **Protected Routes**
Add middleware to your backend to protect routes:

```javascript
// Example middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

### **5. Testing Your Integration**

1. **Start your backend server** on the configured port
2. **Update `.env.local`** with your backend URL
3. **Test the auth flow**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/auth
   ```

### **6. Adding More API Calls**

Use the `apiClient` for additional endpoints:

```typescript
// In lib/api-client.ts, add methods like:
async getAppointments() {
  return this.request('/appointments');
}

async createAppointment(appointmentData: any) {
  return this.request('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
}

// Then use in components:
const response = await apiClient.getAppointments();
if (response.success) {
  setAppointments(response.data);
}
```

### **7. Error Handling**

The API client handles:
- ✅ Network errors
- ✅ HTTP error status codes
- ✅ JSON parsing errors
- ✅ Authentication errors

### **8. Security Considerations**

- 🔒 Use HTTPS in production
- 🔒 Validate all inputs on backend
- 🔒 Implement rate limiting
- 🔒 Use secure token storage (consider httpOnly cookies)
- 🔒 Add CSRF protection if needed

### **9. Common Issues**

**CORS Errors**: Check backend CORS configuration  
**401 Unauthorized**: Token expired or invalid  
**400 Bad Request**: Missing required fields  
**500 Server Error**: Check backend logs  

### **10. Next Steps**

1. Implement logout functionality
2. Add token refresh logic
3. Create protected route middleware
4. Add loading states and error boundaries
5. Implement role-based access control

---

**Need help?** Check your backend logs and browser network tab for detailed error messages!