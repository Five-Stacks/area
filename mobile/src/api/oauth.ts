import { API_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getOAuthStatus() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/oauth/status`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function initiateOAuth(serviceId: string, redirectUri: string) {
  // The OAuth endpoint redirects to the provider, so we just construct the URL
  // and let the browser handle it
  return `${API_URL}/oauth/${serviceId}?redirect_to=${encodeURIComponent(redirectUri)}`;
}
