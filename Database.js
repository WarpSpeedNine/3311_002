import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const openDatabase = () => {
  return SQLite.openDatabase({name: 'Database.db', location: 'default'});
};

export const db = {
  open: openDatabase,
};
