import SQLite from 'react-native-sqlite-storage';

const databaseName = 'Data.db';
const database = SQLite.openDatabase({name: databaseName, location: 'default'});

export const initDatabase = () => {
  database.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS pokemons (id INTEGER PRIMARY KEY AUTOINCREMENT, image_uri TEXT, name TEXT, description TEXT, features1 TEXT,features2 TEXT, width TEXT , height TEXT)',
      // 'DROP TABLE IF EXISTS pokemons',
      [],
      () => {
        console.log('Database initialized');
      },
      (_, error) => {
        console.error('Error initializing database', error);
      },
    );
  });
};

export default database;
