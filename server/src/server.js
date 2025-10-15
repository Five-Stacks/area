/* Import modules */
import app from './app.js';
import setupDatabase from './database/setupDatabase.js';

/* Database setup */
setupDatabase();

/* Server startup */
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
