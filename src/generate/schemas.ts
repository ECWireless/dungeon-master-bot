export const SCHEMAS = `
  type Member {
    id: ID!
    name: String!
    eth_address: String
    contact_info: ContactInfo
    is_raiding: Boolean
    created_at: Date!
    updated_at: Date!
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
