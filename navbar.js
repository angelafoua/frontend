// components/Navbar.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/">Community</Link>
      <div>
        {user ? (
          <Link href={`/profile/${user.id}`} className="px-4">Profile</Link>
        ) : (
          <Link href="/login" className="px-4">Login</Link>
        )}
      </div>
    </nav>
  );
}
