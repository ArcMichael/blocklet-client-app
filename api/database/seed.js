/* eslint-disable no-console */
const db = require('./index');

// 插入示例数据
const seed = () => {
  db.serialize(() => {
    // 确保表已经创建
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        avatar TEXT,
        nickname TEXT,
        bio TEXT,
        country TEXT,
        region TEXT
      )
    `,
      (err) => {
        if (err) {
          console.error('Error creating table', err);
        } else {
          console.log('Table created or already exists.');
        }
      },
    );

    const stmt = db.prepare(
      `
      INSERT INTO users (id, username, email, phone, avatar, nickname, bio, country, region)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      (err) => {
        if (err) {
          console.error('Error preparing statement', err);
        }
      },
    );

    // 示例数据
    const userProfileData = [
      {
        id: 1,
        username: 'Michael Qiu',
        email: 'hulen20@gmail.com',
        phone: '13512121212',
        avatar: '/public/resized_image1_240x240.webp',
        nickname: 'ARCMIC',
        bio: 'A Engineer',
        country: 'China',
        region: 'Shanghai',
      },
      {
        id: 2,
        username: 'Michael Zhang',
        email: 'hulen21@gmail.com',
        phone: '13513131313',
        avatar: '/public/resized_image1_240x240.webp',
        nickname: 'ARCMIC2',
        bio: "I'm the 2nd engineer ",
        country: 'China',
        region: 'Guangzhou',
      },
      {
        id: 3,
        username: 'Michael Wang',
        email: 'hulen20@gmail3.com',
        phone: '13513131313',
        avatar: '/public/resized_image1_240x240.webp',
        nickname: 'ARCMIC3',
        bio: 'Hello',
        country: 'China',
        region: 'Beijing',
      },
    ];

    userProfileData.forEach((user) => {
      stmt.run(
        user.id,
        user.username,
        user.email,
        user.phone,
        user.avatar,
        user.nickname,
        user.bio,
        user.country,
        user.region,
        (err) => {
          if (err) {
            console.error('Error inserting data', err);
          } else {
            console.log(`Inserted user: ${user.username}`);
          }
        },
      );
    });

    stmt.finalize((err) => {
      if (err) {
        console.error('Error finalizing statement', err);
      } else {
        console.log('Statement finalized.');
      }
    });
  });
};

seed();
