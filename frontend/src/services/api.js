const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5000";

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      options
    );

    const data = await response.json();

    return {
      response,
      data
    };
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);

    throw error;
  }
}

export async function registerUser(userData) {
  return request("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
}

export async function loginUser(loginData) {
  return request("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });
}

export async function createEnvironment(environmentData) {
  return request("/environment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(environmentData)
  });
}

export async function getUserEnvironment(userId) {
  return request(`/environment/user/${userId}`, {
    method: "GET"
  });
}

export async function calculateCarbon(calculationData) {
  return request("/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(calculationData)
  });
}

export async function getUser(userId) {
  return request(`/user/${userId}`, {
    method: "GET"
  });
}

export async function updateUser(userId, userData) {
  return request(`/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
}

export async function getDashboard(userId) {
  return request(`/dashboard/${userId}`, {
    method: "GET"
  });
}

export async function getUsers() {
  return request("/users", {
    method: "GET"
  });
}

export async function sendContact(contactData) {
  return request("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  });
}