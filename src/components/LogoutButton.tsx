import {useAuth} from '@/app/AuthProvider';

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button
            className='button-style'
            onClick={logout}
        >
            Logg ut
        </button>
    );
};

export default LogoutButton;