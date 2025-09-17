/* Import modules */
import app from './app.js';

/* Server startup */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
