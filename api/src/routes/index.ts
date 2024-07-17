import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import userProfileRoutes from './user-profile'; // 导入用户相关的路由

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/user-profile', userProfileRoutes);

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('*', (_, res) => {
  res.status(302).json({
    message: 'API endpoint not found',
  });
});

export default router;
