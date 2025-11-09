// Test authentication endpoints
const API_URL = 'http://localhost:3001';

async function testAuth() {
  console.log('Testing Authentication Endpoints...\n');

  try {
    // Test 1: Register a new user
    console.log('1. Testing Registration...');
    const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }),
      credentials: 'include'
    });
    
    const registerData = await registerResponse.json();
    console.log('Register Response:', registerData);
    console.log('Status:', registerResponse.status, '\n');

    // Test 2: Login with the user
    console.log('2. Testing Login...');
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
      credentials: 'include'
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    console.log('Status:', loginResponse.status, '\n');

    // Test 3: Get current user
    console.log('3. Testing Get Current User...');
    const meResponse = await fetch(`${API_URL}/api/auth/me`, {
      credentials: 'include'
    });
    
    const meData = await meResponse.json();
    console.log('Current User Response:', meData);
    console.log('Status:', meResponse.status, '\n');

    // Test 4: Logout
    console.log('4. Testing Logout...');
    const logoutResponse = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    const logoutData = await logoutResponse.json();
    console.log('Logout Response:', logoutData);
    console.log('Status:', logoutResponse.status, '\n');

    console.log('All authentication tests completed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAuth();
