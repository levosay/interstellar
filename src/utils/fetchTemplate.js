export const FetchTemplate = async () => {
  const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/258687', {
    method: 'GET',
    headers: {
      'X-API-KEY': 'a361b17b-3d39-46f4-8b1a-f324744b2b52',
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
