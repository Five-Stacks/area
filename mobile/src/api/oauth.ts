import { API_URL } from "./config";

export async function getOAuthStatus() {
  const response = await fetch(`${API_URL}/oauth/status`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return response.json();
}

export async function initiateOAuth(serviceId: string, redirectUri: string) {
  // The OAuth endpoint redirects to the provider, so we just construct the URL
  // and let the browser handle it
  return `${API_URL}/oauth/${serviceId}?redirect_to=${encodeURIComponent(redirectUri)}`;
}

