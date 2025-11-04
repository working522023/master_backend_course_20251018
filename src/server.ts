import { AppDataSource, env } from './core';
import { app } from './app';

(() => {
  try {
    AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => console.error("Database connection error:", error));

    const PORT = env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();