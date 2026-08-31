const API_URL = "http://127.0.0.1:5000";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function loginUser(loginData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function createEnvironment(environmentData) {
  const response = await fetch(`${API_URL}/environment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(environmentData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function calculateCarbon(calculationData) {
  const response = await fetch(`${API_URL}/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(calculationData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function getUser(userId) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "GET"
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function updateUser(userId, userData) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function getDashboard(userId) {
  const response = await fetch(`${API_URL}/dashboard/${userId}`, {
    method: "GET"
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET"
  });

  const data = await response.json();

  return {
    response,
    data
  };
}

export async function sendContact(contactData) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  });

  const data = await response.json();

  return {
    response,
    data
  };
}