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

    // Test query to check the existence of the Type table
    const result = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Type',
          [],
          (_, results) => {
            console.log(
              'Test query executed, rows returned:',
              results.rows.length,
            );
            resolve(results);
          },
          (_, error) => {
            console.error('Test query failed:', error);
            reject(error);
            return false;
          },
        );
      });
    });

    return db;
  } catch (error) {
    console.error('ERROR opening database:', error);
    throw error;
  }
};

export const db = {
  open: openDatabase,
};
