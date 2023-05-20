import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between px-12 py-4 border-b">
      <h1 className="text-4xl font-bold">
        <Link href="/">tuna2134 tools</Link>
      </h1>
      <nav className="content-center">
        <ul className="flex content-center">
          <li className="content-center">
            <Link href="/userinfo" className="hover:text-[#5865F2] text-2xl">userinfo</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header