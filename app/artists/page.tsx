"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getSpotifyAccessToken, getSpotifyArtistData } from "@/lib/utils";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
);

const artistsData = [
  { name: "Arwindpianist", id: "2xonhkICwITCbO5X4IRoeA", description: "Founder and lead artist of Arwindpianist Studios, known for his exceptional piano compositions.", email: "arwin@arwindpianist.store" },
  { name: "raynnaxx", id: "4pdqfE6c3OAlNZ2U6r0BFy", description: "A rising star with a unique voice and captivating performances.", email: "raynnaxx@gmail.com" },
  { name: "arwin", id: "5X8slCGKlv8xjHUIFFgQR4", description: "A versatile artist blending traditional and modern music styles.", email: "arwin@arwindpianist.store" },
  { name: "Jeevy", id: null, description: "An innovative artist pushing the boundaries of music production.", email: "jeevymusic1@gmail.com" },
  { name: "etharessh", id: null, description: "A talented artist with a passion for creating soulful melodies.", email: "haressh25@gmail.com" },
];

// Temporary testing: Add environment variables directly for debugging
const clientId = "433c1db601f84228a4cbcd9e3db7adef"; // Replace with your actual Spotify client ID
const clientSecret = "304ca8bf881e4c91a7780594caffe251"; // Replace with your actual Spotify client secret

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Add logging to verify environment variables and API responses
    console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
    console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);

    const fetchArtists = async () => {
      try {
        console.log("Using hardcoded Spotify credentials for testing:", clientId, clientSecret);

        const accessToken = await getSpotifyAccessToken(clientId, clientSecret);
        console.log("Access token fetched:", accessToken);

        const fetchedArtists = await Promise.all(
          artistsData.map(async (artist) => {
            if (!artist.id) {
              console.log(`No Spotify ID for artist: ${artist.name}`);
              return {
                name: artist.name,
                // description: artist.description,
                email: artist.email,
                followers: "N/A",
                image: "/images/artist-placeholder.png", // Placeholder image
              };
            }

            console.log(`Fetching data for artist: ${artist.name}`);
            const artistData = await getSpotifyArtistData(artist.id, accessToken);
            console.log(`Data fetched for artist: ${artist.name}`, artistData);

            return {
              name: artist.name,
            //   description: artist.description,
              email: artist.email,
              followers: artistData.followers.total || 0,
              image: artistData.images[0]?.url || "/images/default-artist.png",
            };
          })
        );

        setArtists(fetchedArtists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <Header />
      <div className="relative">
        <ParticleBackground />
        <section className="artists-page py-40 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-4xl font-bold text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our Artists
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {artists.map((artist, index) => (
                <motion.div
                  key={index}
                  className="artist-card glassmorphism p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-semibold mb-2">{artist.name}</h2>
                  <p className="text-gray-400">{artist.description}</p>
                  <p className="text-gray-400">Email: {artist.email}</p>
                  <p className="text-gray-400">Followers: {artist.followers}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ArtistsPage;