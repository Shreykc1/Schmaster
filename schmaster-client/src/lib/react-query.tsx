import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    
} from '@tanstack/react-query'
import { getUserById, getUserStreaks } from './calls';


  
  
export const useGetUserById = (userID: string) => {
    return useQuery({
      queryKey: ['getUserById', userID],
      queryFn: () => getUserById(userID),
      enabled: !!userID,
    });
  };


  export const useGetUserStreaks = (userID: string) => {
    return useQuery({
      queryKey: ['getUserStreaks', userID],
      queryFn: () => getUserStreaks(userID),
      enabled: !!userID,
    });
  };