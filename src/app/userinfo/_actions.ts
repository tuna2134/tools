"use server";

import axios from "axios"

export interface User {
  username: string;
  id: string;
  discriminator: string;
  avatar: string;
  display_name: string;
  bot: boolean;
  created_at: Date;
};

async function convertSnowflakeToDate(snowflakeId: string): Promise<Date> {
  let snowflakeNumber = BigInt(snowflakeId);
  let timestampBits = snowflakeNumber >> BigInt(22);
  let timestamp = Number(timestampBits) + 1420070400000;
  return new Date(timestamp);
}

export const fetchUser = async (userid: string): Promise<User> => {
  const res = await axios.get(
    `https://discord.com/api/v10/users/${userid}`,
    {
      headers: {
        "Authorization": `Bot ${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  )
  res.data.created_at = await convertSnowflakeToDate(res.data.id)
  return res.data
}