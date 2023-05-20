"use client"
import { FormEvent, ChangeEvent, useState } from "react"

const Base64 = () => {
  const [input, setInput] = useState<string>("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  };

  
}