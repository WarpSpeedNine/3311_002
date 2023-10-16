import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'Database.db', location: 'default'},
  () => console.log('Database opened!'),
  error => console.error("Error opening database:", error)
);


