const API_BASE_URL = 'https://api.tvmaze.com';

export default async function getAPI(query) {
  const response = await fetch(`${API_BASE_URL}${query}`).then(r => r.json());
  return response;
}
