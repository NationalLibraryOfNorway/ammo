'use client';

import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react';
import React from 'react';
import {useRouter} from 'next/navigation';
import LogoutButton from '@/components/ui/LogoutButton';
import {useAuth} from '@/providers/AuthProvider';
import {UserDetails} from '@/components/ui/UserDetails';
import {Switch} from '@nextui-org/switch';
import {LuMoon, LuSun} from 'react-icons/lu';
import Logo from '@/components/ui/Logo';
import {Theme, useTheme} from '@/providers/ThemeProvider';


export default function Header() {
  const { authenticated , user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <Navbar maxWidth='xl' className="sticky top-0 font-mono">
      <NavbarBrand>
        <Link
          color="foreground"
          className={'font-bold text-3xl hover:cursor-pointer'}
          onClick={() => router.push('/')}
        >
          <Logo className={'max-w-28'}/>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          <Switch
            defaultSelected
            size="lg"
            color="secondary"
            isSelected={theme === Theme.Dark}
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
