import type { NextFunction, Request, Response } from 'express';

import { getPodcastById, searchPodcasts } from '../services/taddyServices.js';

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    console.log("search hit, q =", q);        // ← add this
    console.log("headers =", req.headers);

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'search query required' });
    }

    const result = await searchPodcasts(q);

    return res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID is required' });
    }
    const podcast = await getPodcastById(id);
    return res.json({
      status: 'success',
      data: podcast,
    });
  } catch (error) {
    next(error);
  }
};

export { getById, search };
