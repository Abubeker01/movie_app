export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
};

export const fetchMovies = async ({ query }: { query: string }) => {
  // This line adds the API key to every request
  const apiKey = `api_key=${TMBD_CONFIG.API_KEY}`;

  // The apiKey is now part of the URL string
  const endPoint = query
    ? `${
        TMBD_CONFIG.BASE_URL
      }/search/movie?${apiKey}&query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?${apiKey}&sort_by=popularity.desc`;
  // The 'headers' option is no longer needed here

  const response = await fetch(endPoint);

  if (!response.ok) {
    throw new Error(`failed to fetch movies: ${response.statusText}`);
  }

  const text = await response.text();

  if (!text) {
    throw new Error("API returned an empty response body.");
  }

  const data = JSON.parse(text);

  return data;
};
