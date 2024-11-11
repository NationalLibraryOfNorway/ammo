'use client';

import {User} from '@nextui-org/user';
import {FC} from 'react';
import {Avatar} from '@nextui-org/avatar';

interface UserDetailsProps {
  name: string;
  className?: string;
}

export const UserDetails: FC<UserDetailsProps> = ({ name, className }) => {
  const initials = name.split(' ').map(n => n[0]?.toUpperCase()).join('');

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
          name={name}
          avatarProps={{
            name: initials,
            isBordered: false,
          }}
        />
      </div>
    </div>
  );
};