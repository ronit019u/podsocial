import dotenv from 'dotenv';
dotenv.config();

const testTaddy = async () => {
  const query = `
    {
      search(term: "technology", filterForTypes: PODCASTSERIES, limitPerPage: 3) {
        searchId
        podcastSeries {
          uuid
          name
          description
          imageUrl
        }
      }
    }
  `;

  const response = await fetch('https://api.taddy.org', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-USER-ID': process.env.TADDY_USER_ID!,
      'X-API-KEY': process.env.TADDY_API_KEY!,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
};

testTaddy();
