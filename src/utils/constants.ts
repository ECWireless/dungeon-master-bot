import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID ?? '';
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? '';

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

export const HASURA_GRAPHQL_ENDPOINT =
  process.env.HASURA_GRAPHQL_ENDPOINT ?? '';
export const HASURA_GRAPHQL_ADMIN_SECRET =
  process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? '';

export const JWT_SECRET = process.env.JWT_SECRET ?? '';
