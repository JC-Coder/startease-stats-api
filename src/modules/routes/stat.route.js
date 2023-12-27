import { Router } from 'express';
import { addStat, getStats } from '../controllers/stat.controller.js';

const router = Router();

export const statRoutes = () => {
  // get stats
  router.get('/', getStats);

  // add stat
  router.post('/', addStat);

  return router;
};
