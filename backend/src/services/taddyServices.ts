import dotenv from 'dotenv';

import type { TaddyPodcast } from '../types/index.js';
dotenv.config();

export const searchPodcasts = async (
  query: string
): Promise<TaddyPodcast[]> => {
  const graphqlQuery = `
    {
      search(term: "${query}", filterForTypes: PODCASTSERIES, limitPerPage: 10) {
        searchId
        podcastSeries {
          uuid
          name
          description
          imageUrl
          itunesId
          totalEpisodesCount
        }
      }
    }
  `;
  try {
    const response = await fetch('https://api.taddy.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-ID': process.env.TADDY_USER_ID!,
        'X-API-KEY': process.env.TADDY_API_KEY!,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    return data.data.search.podcastSeries;
    //console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Taddy search error', err);
    throw err;
  }
};

export const getPodcastById = async (uuid: string): Promise<TaddyPodcast> => {
  const graphqlQuery = `
    {
      getPodcastSeries(uuid: "${uuid}") {
        uuid
        name
        description
        imageUrl
        itunesId
        totalEpisodesCount
      }
    }
  `;

  try {
    const response = await fetch('https://api.taddy.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-ID': process.env.TADDY_USER_ID!,
        'X-API-KEY': process.env.TADDY_API_KEY!,
      },
      body: JSON.stringify({ query: graphqlQuery }),
      signal: AbortSignal.timeout(30000),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    return data.data.getPodcastSeries;
  } catch (err) {
    console.error('Taddy get podcast error', err);
    throw err;
  }
};
