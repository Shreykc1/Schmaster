import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { breakStreak, getAllUsers, StreakUpdater } from '@/lib/calls'; // Import your API call function
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { user, isLoading, isAuthenticated } = useUserContext();
  const [allUsers, setAllUsers] = useState([]);
  const [breaks,setBreaks] = useState(false);
  // let breaks = false;
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        console.log(result.allUsers)
        setAllUsers(result.allUsers);
 
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
}, [isAuthenticated,breaks]); 



  const breakStreakk = async () => {
    try {
      await breakStreak();
      setBreaks(true)
    } catch (error) {
      console.error("Failed to break streak:", error);
    }
  };




StreakUpdater();


  


const streakStyle = 
  Number(user.streak) === 0 ? 'blur-sm' :
  Number(user.streak) === 1 ? 'blur-[2px]' : '';

  const memojis = ['/assets/memojis/angy.png','/assets/memojis/grin.png','/assets/memojis/kiss.png','/assets/memojis/star.png']

  const getRandomMemoji = (arr:any) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  if (isLoading) {    
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  return (
    <div className='bg-dark-2 w-full h-full flex flex-col p-7 gap-4'>
      <div className='flex flex-col gap-10'>
        <h1 className='h2-bold  text-main '>Hello 👋 {user.email}</h1>

        <div className='w-100 flex justify-center gap-3 '>
          <h1 className={`text-7xl font-bold text-main ${streakStyle}`}>{user.streak}</h1>
        </div>

        <p className='text-[14px] font-light text-main text-center'>
          Maintain Streaks & Prove you are a Man! 💪
        </p>
        <Button className='shad-button_primary' onClick={breakStreakk}>
            Break
        </Button>
      </div>

      <div className='h-full w-full bg-dark-3 rounded-lg '>
          <ul className='flex flex-col justify-center items-center gap-1'>
            {allUsers.map((user:any) => (
               <li key={user.id} className='flex gap-3 h3-bold w-full rounded-lg justify-center py-5 bg-dark-4'>
                    <img 
                    src={getRandomMemoji(memojis)}
                    alt='memoji'
                    height={50}
                    width={50}
                    className=''
                    
                    />
                  <h3 className='w-44 pt-2'>{user.email}</h3>
                  <h3 className='pt-2'>{user.streaks}🔥</h3>
               </li>
            ))}
          </ul>
    
      </div>
    </div>
  );
};

export default Home;
