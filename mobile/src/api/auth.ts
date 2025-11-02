import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  // Store the token if login is successful
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
  }
  
  return data;
}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({ name, email, password }),
  });
  
  const data = await response.json();
  
  // Store the token if registration is successful
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
  }
  
  return data;
}

export async function isConnected() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/auth/isConnected`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function logout() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  
  // Clear token from storage on logout
  await AsyncStorage.removeItem("token");
  
  return response.json();
}

export async function updateUser(id: string, name?: string, email?: string, password?: string) {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

export async function getUser() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
