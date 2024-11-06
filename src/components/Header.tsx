'use client';

import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import {useAuth} from '@/app/AuthProvider';
import {UserDetails} from '@/components/UserDetails';
import {Switch} from '@nextui-org/switch';
import {LuMoon, LuSun} from 'react-icons/lu';
import Logo from '@/components/Logo';

export default function Header() {
  const { authenticated , user } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar maxWidth='xl' className="sticky top-0 font-mono">
      <NavbarBrand>
        <Link
          color="foreground"
          className={'font-bold text-3xl hover:cursor-pointer'}
          onClick={() => router.push('/')}
        >
          <Logo className={'max-w-28'} appearance={theme ?? 'light'} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
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
              <UserDetails name={user?.name ?? ''}/>
              <LogoutButton className="pl-2.5"/>
            </>
          ) : <></>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
