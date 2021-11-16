import { useLocation } from 'react-router-dom';

export const useQuery = (name: string) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return searchParams.get(name);
};
