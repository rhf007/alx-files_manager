import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const getCommand = promisify(this.client.get).bind(this.client);
    const value = await getCommand(key);
    return value;
  }

  async set(key, value, time) {
    const setCommand = promisify(this.client.set).bind(this.client);
    await setCommand(key, value);
    await this.client.expire(key, time);
  }

  async del(key) {
    const delCommand = promisify(this.client.del).bind(this.client);
    await delCommand(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
