/* eslint-disable no-console */

const { Router } = require('express');
const db = require('../../database/index');

const router = Router();

// 获取单个用户
router.get('/:id', (req: any, res: any) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const userId = req.params.id;

  console.log(userId);

  db.get(query, [userId], (err: any, row: any) => {
    console.log(err);
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ user: row });
  });
});

// 更新用户
router.put('/:id', (req: any, res: any) => {
  const { username, email, phone, avatar, nickname, bio, country, region } = req.body;
  const query = `
    UPDATE users
    SET username = ?, email = ?, phone = ?, avatar = ?, nickname = ?, bio = ?, country = ?, region = ?
    WHERE id = ?
  `;
  const userId = req.params.id;

  db.run(
    query,
    [username, email, phone, avatar, nickname, bio, country, region, userId],
    function updateUser(this: any, err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    },
  );
});

export default router;
