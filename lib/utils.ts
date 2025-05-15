import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fetch an access token from Spotify using Client Credentials Flow.
 * @param clientId - Your Spotify API client ID.
 * @param clientSecret - Your Spotify API client secret.
 * @returns Access token string.
 */
export async function getSpotifyAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify access token");
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Fetch artist data from Spotify.
 * @param artistId - The Spotify ID of the artist.
 * @param accessToken - Spotify API access token.
 * @returns Artist data including images.
 */
export async function getSpotifyArtistData(artistId: string, accessToken: string): Promise<any> {
  const response = await fetch(`${SPOTIFY_API_URL}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch artist data from Spotify");
  }

  return response.json();
}
