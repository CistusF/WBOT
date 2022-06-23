import "./env";
import Client from './Utils/client';
import { env } from './Interfaces/env.interface';

const env = process.env;
const client = new Client({
    intents: 98047
});

client.login(env.token);