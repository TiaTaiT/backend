import { DataSource } from 'typeorm';
import CONNECTION from './dbconfig';

const AppDataSource = new DataSource({
  ...CONNECTION,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data source has been initialixed!');
  })
  .catch((err) => {
    console.log('Error during data source initialization', err);
  });

export default AppDataSource;
