'use client';

import { useRouter } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';


const useNavigate = () => {
  const router = useRouter();
  const { start } = useTopLoader();

  const navigate = (route: string) => {
    start();
    router.push(route);
  };

  return navigate;
};

export default useNavigate;