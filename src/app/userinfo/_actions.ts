"use server";

import axios from "axios"

export interface User {
  username: string;
  id: string;
  discriminator: string;
  avatar: string;
  display_name: string;
  bot: boolean;
};

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
  return res.data
}