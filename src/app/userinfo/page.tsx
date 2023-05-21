"use client"

import { fetchUser, User } from "./_actions"
import { FormEvent, ChangeEvent, useState } from "react"
import UserData from "./_components"
import Image from "next/image"

function convertSnowflakeToDate(snowflakeId: string): Date {
  let snowflakeNumber = BigInt(snowflakeId);
  let timestampBits = snowflakeNumber >> BigInt(22);
  let timestamp = Number(timestampBits) + 1420070400000;
  return new Date(timestamp);
}

const UserInfo = () => {
  const [userid, setUserid] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    // IDかどうかチェック
    if (isNaN(Number(event.target.value)) === false) {
      setUserid(event.target.value)
    } else {
      event.target.setCustomValidity("ユーザーIDは数字のみです。");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: User = await fetchUser(userid);
    user.created_at = convertSnowflakeToDate(user.id);
    setUser(user);
    console.log(user);
  }
  function resetSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUser(null);
  }
  return (
    <div className="py-6">
      {user
        ? (
          <div className="flex justify-center">
            <div>
              <h2 className="text-4xl py-4 text-center">Discord User Search</h2>
              <br />
              <div className="border rounded p-4 flex justify-center">
                <div className="w-80">
                  <UserData name="ユーザー名" value={user.username} />
                  <UserData name="ユーザー名#タグ" value={`${user.username}#${user.discriminator}`} />
                  <UserData name="ディスプレイ名" value={user.display_name} />
                  <UserData name="ユーザーID" value={user.id} />
                  <UserData name="ユーザータグ" value={user.discriminator} />
                  <UserData name="Botかどうか" value={user.bot ? "はい" : "いいえ"}/>
                  <UserData
                    name="アカウント作成日"
                    value={user.created_at ? user.created_at.toLocaleString("ja-JP") : "不明"}
                  />
                </div>
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`}
                  className="rounded h-32 w-32"
                  width={1024} height={1024}
                  alt="user icon"
                  quality={100}
                >
                </Image>
              </div>
              <br />
              <form onSubmit={resetSearch}>
                <button className="bg-[#42c26a] hover:bg-[#57F287] py-1.5 px-3 rounded text-white">再検索</button>
              </form>
            </div>
          </div>
        )
        : (
        <div className="flex items-center h-[75vh] box-border justify-center">
          <div className="border p-6 rounded">
            <h2 className="text-4xl">Discord User Search</h2>
            <br />
            <form onSubmit={handleSubmit} className="">
              <input
                className="border px-0.5 py-1.5 outline-none rounded indent-4"
                type="text" onChange={handleInputChange}
                placeholder="ユーザーID" required
              ></input>
              <button className="ml-8 bg-[#42c26a] hover:bg-[#57F287] py-1.5 px-3 rounded text-white">
                <p>検索</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo