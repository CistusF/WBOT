import "./env";
import Client from './Utils/client';
import { env } from './Interfaces/env.interface';

const env = process.env as unknown as env;
const client = new Client({
    intents: env.intents
});

client.login(env.token);