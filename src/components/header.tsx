import { getServerAuthSession } from '@/lib/auth'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default async function Header() {
  const session = await getServerAuthSession()
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-white text-2xl font-bold">
          My Blogs
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link href="/blogs" className="text-white hover:underline">
              Blogs
            </Link>
          </li>
          {session?.user?.name ? (
            <SignOutButton />
          ) : (
            <li>
              <Link
                href="/api/auth/signin"
                className="text-white hover:underline"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
