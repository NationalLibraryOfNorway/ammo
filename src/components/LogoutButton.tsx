import {useAuth} from '@/app/AuthProvider';
import {Button} from '@nextui-org/button';
import {LuLogOut} from 'react-icons/lu';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      color="primary"
      variant="light"
      endContent={<LuLogOut size={25} />}
      onClick={logout}
    >
      Logg ut
    </Button>
  );
};

export default LogoutButton;