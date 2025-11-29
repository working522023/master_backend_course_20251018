// server.ts
import { AppDataSource, env } from './core';
import { startApolloServer } from './app';

const startServer = async () => {
  try {
    // 1. Connect to database
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    // 2. Start Apollo + Express server
    const httpServer = await startApolloServer();
    const PORT = env.PORT || 5000;

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error('❌ Server failed to start', err);
  }
};

startServer();
