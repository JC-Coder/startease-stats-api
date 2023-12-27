import { Router } from 'express';

const router = Router();
import { statRoutes } from './stat.route.js';

export const setRoutes = () => {
  router.use('/stat', statRoutes());
  return router;
};
