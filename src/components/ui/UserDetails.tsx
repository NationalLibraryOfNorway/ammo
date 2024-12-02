'use client';

import {User} from '@nextui-org/user';
import {FC} from 'react';
import {Avatar} from '@nextui-org/avatar';
import {useAuth} from '@/providers/AuthProvider';

interface UserDetailsProps {
  className?: string;
}

export const UserDetails: FC<UserDetailsProps> = ({ className }) => {
  const { user } = useAuth();
  const initials = user?.name.split(' ').map(n => n[0]?.toUpperCase()).join('');

  return (
    <div className={`${className}`}>
      <div className="block lg:hidden ">
        <Avatar
          name={initials}
          isBordered={false}
        />
      </div>
      <div className="hidden lg:flex items-center ">
        <User
          name={user?.name}
          avatarProps={{
            name: initials,
            isBordered: false
          }}
        />
      </div>
    </div>
  );
};