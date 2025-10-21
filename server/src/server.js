/* Import app */
import app from "./app.js";

/* Database setup */
import setupDatabase from "./database/setupDatabase.js";
setupDatabase();

/* Start area engine */
import "./services/areaEngine.js";

/* Server startup */
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
