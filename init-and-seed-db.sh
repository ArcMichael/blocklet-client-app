#!/bin/sh

# Initial Database
echo "Initializing database..."
node api/database/index.js

if [ $? -ne 0 ]; then
  echo "Failed to initialize database"
  exit 1
fi

# Insert seed data
echo "Inserting seed data..."
node api/database/seed.js

if [ $? -ne 0 ]; then
  echo "Failed to insert seed data"
  exit 1
fi

echo "Database initialized and seed data inserted successfully."
