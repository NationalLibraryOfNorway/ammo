'use client';

import {User} from '@nextui-org/user';
import {useEffect, useState} from 'react';
import {Avatar} from '@nextui-org/avatar';

interface UserDetailsProps {
  name: string;
  className?: string;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ name, className }) => {
  const [initials, setInitials] = useState<string>('');

  useEffect(() => {
    const tempInitials = name.split(' ').map(n => n[0]?.toUpperCase()).join('');
    setInitials(tempInitials);
  }, [name]);

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