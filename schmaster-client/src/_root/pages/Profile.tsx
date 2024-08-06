import { useUserContext } from "@/context/AuthContext";
import { getUserStreaks } from "@/lib/calls";
import ThemeToggle from "@/shared/components/ThemeToggle";
import { useEffect, useState } from "react";

const Profile = () => {
  const [allStreaks, setAllStreaks] = useState([]);
  const { user, isLoading, isAuthenticated } = useUserContext();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserStreaks();
        setAllStreaks(result);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

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
  const getRandomMemoji = (arr: any) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  return (
    <div className="w-full h-full flex flex-col p-7 gap-4">
      <div className="w-full flex flex-col justify-center items-center">
        <img
          src={getRandomMemoji(memojis)}
          alt="memoji"
          height={250}
          width={250}
          className=""
        />

        <h2 className="h2-bold">{user.email}</h2>
      </div>

    <div className="flex ">
        <h2 className="w-full text-light-4 font-bold">History</h2>
        <img src="/assets/icons/history.svg" alt="logo" width={25} />
    </div>


      <div className="h-full w-full bg-dark-3 rounded-lg ">
        <ul className="flex flex-col justify-center items-center gap-1">
            
          {allStreaks.map((user: any) => (
            <li
              key={user.userID}
              className="flex gap-3 h3-bold w-full rounded-lg justify-evenly py-5 bg-dark-4"
            >
              <h3 className="w-44 pt-1  dark:text-main text-main">{formatDate(user.breakDate)}</h3>
              <h3 className="pt-1  dark:text-main text-main">{user.streaks}🔥</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <p>Dark mode</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Profile;
