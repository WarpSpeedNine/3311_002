import SQLite from 'react-native-sqlite-storage';

// Enable promise-based interaction with the SQLite library
SQLite.enablePromise(true);

// Function to open the database and perform a test query
const openDatabase = async () => {
  try {
    console.log('Attempting to open database: Database.db');
    const db = await SQLite.openDatabase({
      name: 'Database.db',
      createFromLocation: '~www/Database.db',
    });
    console.log('Database is now opened!');
    return db;
  } catch (error) {
    console.error('ERROR opening database:', error);
    throw error;
  }
};

export const db = {
  open: openDatabase,
};
