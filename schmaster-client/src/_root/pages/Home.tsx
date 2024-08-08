import { useUserContext } from '@/context/AuthContext';
import { breakStreak } from '@/lib/calls'; // Import your API call function
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGetAllUsers, useGetUserById } from '@/lib/react-query';
import { Loader } from 'lucide-react';
import useStreakUpdater from '@/hooks/useStreakUpdater';

import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { socket } from '@/lib/sockets';





const Home = () => {
  const { isAuthenticated } = useUserContext();
  const token = Cookies.get('token');
  const { data:userr, isPending: isLoading } = useGetUserById(token!);
  const { isPending: isUsersLoading,refetch: refetchAllUsers } = useGetAllUsers();

  const [ allUsers, setAllUsers ] = useState([]);
  const [streak, setStreak] = useState(()=> !isLoading ? userr.streaks : 0);
  const [breaks, setBreak] = useState(false);

  const breakStreakk = async () => {
    try {
      await breakStreak();
      refetchAllUsers()
      setBreak(!breaks);
    } catch (error) {
      console.error("Failed to break streak:", error);
    }
  };
  

  useStreakUpdater();
  


  useEffect(() => {
      socket.on('connect',()=>{
      
    });
     
      socket.on('newStreak', (data) => {
        setStreak(data);
    });

      socket.on('getAllUsers', (data) => {
      setAllUsers(data);
  });
   

    
    return () => {
        socket.off('newStreak');
    };
}, [breaks]);





const capitalize = (str:string) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


  const memojis = [
    "/assets/memojis/angy.png",
    "/assets/memojis/grin.png",
    "/assets/memojis/kiss.png",
    "/assets/memojis/star.png",
    "/assets/memojis/happy.png",
    "/assets/memojis/laugh.png",
    "/assets/memojis/shock.png",
    "/assets/memojis/wink.png",
  ];

  const getRandomMemoji = (arr:any) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  if (isLoading) {
      return <div>Loading....</div>
  }

  if (isUsersLoading) {
    return <div>Loading....</div>
}


  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  
  return (
    <>
      
    {
      isUsersLoading ? <div className='w-full flex-center'><Loader/></div> : 
      <div className='dark:bg-dark-2 dark:text-main text-dark-2 bg-main w-full h-full flex flex-col p-7 gap-4'>
      <div className='flex flex-col gap-10'>
        <div className='h3-semibold '>
          <h2 className='h1-bold'>Hello 👋</h2> 
          Welcome {capitalize(userr.name)}
          </div>

        <div className='w-100 flex justify-center gap-3 '>
          <h1 className={`text-7xl font-bold dark:text-white text-dark-2 `}>{streak}</h1>
        </div>

        <p className='text-[14px] font-light dark:text-main text-dark-2 text-center'>
          Maintain Streaks & Prove you are a Man! 💪
        </p>
        <Button className='shad-button_primary' onClick={breakStreakk}>
            Break
        </Button>
      </div>

      <div className='h-auto w-full bg-dark-3 rounded-lg '>
          <ul className='flex flex-col justify-center items-center gap-1'>
            {allUsers.map((users:any) => (
               <Link to={`/profile`} state={{userID: users.id}} key={users.id} className='flex gap-3 h3-bold w-full rounded-lg justify-center py-5 bg-dark-4 '>
                    <img 
                    src={getRandomMemoji(memojis)}
                    alt='memoji'
                    height={50}
                    width={50}
                    className=''
                    
                    />
                  <h3 className='w-44 pt-2 dark:text-main text-main'>{users.name}</h3>
                  <h3 className='pt-2 dark:text-main text-main'>{users.streaks}🔥</h3>
               </Link>
            ))}
          </ul>
      </div>
          
    </div>
    }
    </>
  );
};

export default Home;
