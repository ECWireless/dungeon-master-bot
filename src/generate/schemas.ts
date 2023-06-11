export const SCHEMAS = `
  type Member {
    id: ID!
    name: String!
    eth_address: String
    contact_info: ContactInfo
  }

  type ContactInfo {
    id: ID!
    email: String
    discord: String
    twitter: String
    telegram: String
    github: String
  }

  type Raid {
    id: ID!
    name: String!
    status_key: RaidStatus!
  }

  enum RaidStatus {
    AWAITING
    PREPARING
    RAIDING
    SHIPPED
    LOST
`;
