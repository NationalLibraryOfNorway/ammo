'use client';

import {useAuth} from '@/app/AuthProvider';
import LogoutButton from '@/components/LogoutButton';

export default function Header() {
  const { authenticated , user } = useAuth();
  return (
  // Placeholder header
    <nav className="header">
      <h1 className="text-2xl">AMMO</h1>
      { authenticated ? (
        <div className="header">
          <p className="text-sm px-2">{user?.name}</p>
          <LogoutButton/>
        </div>
      ) : <></>}

    </nav>
  );
}