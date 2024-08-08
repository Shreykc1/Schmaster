import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    
} from '@tanstack/react-query'
import { breakStreak, getAllUsers, getUserById, getUserStreaks } from './calls';


export const useGetAllUsers = () => {  
    return useQuery({
      queryKey: ['getAllUsers'],
      queryFn: () => getAllUsers(),
    });
  };


  export const useBreakStreak = () => { //done
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => breakStreak(),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['useBreakStreak'],
        });
      },
    });
  };
  
  
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
      refetchOnMount: 'always', // Refetch data every time the component mounts
      refetchOnWindowFocus: true, // Refetch data if the window is focused
      staleTime: 0, // Data is considered stale immediately
    });
  };
  