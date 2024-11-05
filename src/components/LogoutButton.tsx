import {useAuth} from '@/app/AuthProvider';
import {Button} from '@nextui-org/button';
import {LuLogOut} from 'react-icons/lu';
import {Tooltip} from '@nextui-org/tooltip';

const LogoutButton = ({className}: {className?: string}) => {
  const { logout } = useAuth();

  return (
    <>
      <div className={`block lg:hidden ${className}`}>
        <Tooltip content="Logg ut">
          <Button
            color="secondary"
            variant="flat"
            onClick={logout}
            isIconOnly
          >
            <LuLogOut size={16}/>
          </Button>
        </Tooltip>
      </div>
      <div className={'hidden lg:block'}>
        <Button
          color="secondary"
          variant="light"
          endContent={<LuLogOut size={16}/>}
          onClick={logout}
        >
          Logg ut
        </Button>
      </div>
    </>
  )
  ;
};

export default LogoutButton;