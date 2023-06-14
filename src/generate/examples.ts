export const RAID_QUERY_EXAMPLE = `
  {
    raids(where: {status_key: { _eq: AWAITING}}) {
      name
      status_key
    }
  }
`;

export const RAID_FUNCTION_EXAMPLE = `
  {
    "data": {
      "raids": [
        {
          "name": "My Raid",
          "status_key": "AWAITING"
        }
      ]
    }
  }
`;

export const MEMBER_QUERY_EXAMPLE = `
  {
    members(where: { guild_class: { guild_class: { _eq: COMMUNITY }}}) {
      id
      name
      eth_address
      is_raiding
      guild_class {
        guild_class
      }
      contact_info {
        discord
      }
    }
  }
`;

export const MEMBER_FUNCTION_EXAMPLE = `
  {
    "data": {
      "members": [
        {
          "name": "Bob Smith",
          "eth_address": "0x1234567890",
          "is_raiding": true,
          "created_at": "2021-01-01T00:00:00.000Z",
          "updated_at": "2021-01-01T00:00:00.000Z",
          "guild_class": {
            "guild_class": "COMMUNITY"
          },
          "contact_info": {
            "discord": "Bob#1234"
          }
        }
      ]
    }
  }
`;
