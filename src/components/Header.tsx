'use client';

import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import {useAuth} from '@/app/AuthProvider';
import {UserDetails} from '@/components/UserDetails';
import {Switch} from '@nextui-org/switch';
import {LuMoon, LuSun} from 'react-icons/lu';

export default function Header() {
  const { authenticated , user } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Navbar maxWidth='xl'>
      <NavbarBrand>
        <Link
          color="foreground"
          className="font-bold text-2xl hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          AMMO
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Switch
            defaultSelected
            size="lg"
            color="secondary"
            isSelected={theme === 'dark'}
            onValueChange={toggleTheme}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <LuMoon className={className} />
              ) : (
                <LuSun className={className} />
              )
            }
          />
          { authenticated ? (
            <>
              <UserDetails name={user?.name ?? ''} className="px-2.5"/>
              <LogoutButton/>
            </>
          ) : <></>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
