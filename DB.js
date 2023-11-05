import SQLite from 'react-native-sqlite-storage';

// Enable promise-based interaction with the SQLite library
SQLite.enablePromise(true);

// Function to open the database
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'Database.db',
      location: 'default',
    });
    console.log('Database opened!');
    return db;
  } catch (error) {
    console.error('ERROR opening database:', error);
    throw error; // Throw the error so that the calling function can handle it
  }
};

// Export the db object with the open function
export const db = {
  open: openDatabase,
};
