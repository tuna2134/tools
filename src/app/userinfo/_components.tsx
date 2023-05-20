import React from 'react';

export default function UserData({
  name, value
}: {
  name: string
  value: string
}) {
  return (
    <div className="py-2">
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="text-xl">{value}</p>
    </div>
  )
}