import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

export const HASURA_GRAPHQL_ENDPOINT =
  process.env.HASURA_GRAPHQL_ENDPOINT ?? '';
export const HASURA_GRAPHQL_ADMIN_SECRET =
  process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? '';
