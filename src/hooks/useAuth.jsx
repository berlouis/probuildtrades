import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { auth, setAuth } = useAuthContext();
  return { auth, setAuth };
};
