import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { addStreaks, getAllUsers, StreakUpdater } from '@/lib/calls'; // Import your API call function

const Home = () => {
  const { user, isLoading, isAuthenticated } = useUserContext();
  const [allUsers, setAllUsers] = useState([]);


 
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
}, [isAuthenticated]); 

StreakUpdater();

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  return (
    <div className='bg-dark-2 w-full h-full flex flex-col p-7 gap-4'>
      <div className='flex flex-col gap-10'>
        <h1 className='h2-bold text-main'>Hello 👋 {user.email}</h1>
        <p className='small-regular text-light-4 text-center'>
          Maintain Streaks <br />& Prove you are a Man!
        </p>
      </div>

      <div className='h-full w-full bg-dark-3 rounded-lg'>

          <ul>
            {allUsers.map((user:any) => (
              <li key={user.id}>{user.email} {user.streaks}</li>
            ))}
          </ul>
    
      </div>
    </div>
  );
};

export default Home;
