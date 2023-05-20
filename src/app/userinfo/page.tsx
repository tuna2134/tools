"use client"

import { fetchUser, User } from "./_actions"
import { FormEvent, ChangeEvent, useState } from "react"
import UserData from "./_components"
import Image from "next/image"

const UserInfo = () => {
  const [userid, setUserid] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUserid(event.target.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: User = await fetchUser(userid);
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
              <h2 className="text-4xl py-4">Discord User Search</h2>
              <br />
              <div className="border rounded p-4 flex justify-around">
                <div>
                  <UserData name="ユーザー名" value={user.username} />
                  <UserData name="ユーザー名#タグ" value={`${user.username}#${user.discriminator}`} />
                  <UserData name="ディスプレイ名" value={user.display_name} />
                  <UserData name="ユーザーID" value={user.id} />
                  <UserData name="ユーザータグ" value={user.discriminator} />
                </div>
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                  className="rounded-full h-32 w-32"
                  width={32} height={32}
                  alt="user icon"
                >
                </Image>
              </div>
              <br />
              <form onSubmit={resetSearch}>
                <button className="bg-[#57F287] py-1.5 px-3 rounded">再検索</button>
              </form>
            </div>
          </div>
        )
        : (
        <div className="flex items-center h-[75vh] box-border justify-center">
          <div>
            <h2 className="text-4xl py-4">Discord User Search</h2>
            <form onSubmit={handleSubmit} className="">
              <input
                className="border mx-1 px-0.5 py-1.5 outline-none rounded"
                type="text" onChange={handleInputChange}
                placeholder="ユーザーID"
              ></input>
              <button className="bg-[#57F287] py-1.5 px-3 rounded">検索</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo