import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useGetUserStreaks } from "@/lib/react-query";
import ThemeToggle from "@/shared/components/ThemeToggle";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";



const Profile = () => {

  const location = useLocation();
  const state = location.state as { userID: string };
  const userID = state ? state.userID : '';
  const { data, isPending } = useGetUserById(userID || "");
  const { data: allStreaks, isPending: isStreaksLoading } = useGetUserStreaks(userID || '');
  const { isLoading, isAuthenticated } = useUserContext();



  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year

    return `${day}/${month}/${year}`;
  };



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
    <>
      {
        isPending ? <div className="w-full flex-center"><Loader/></div> : 
        <div className="w-full h-full flex flex-col p-7 gap-4">
      <div className="w-full flex flex-col justify-center items-center">
        <img
          src={getRandomMemoji(memojis)}
          alt="memoji"
          height={250}
          width={250}
          className=""
        />
        <h2 className="h2-bold">{data[0].email}</h2>
      </div>

    <div className="flex ">
        <h2 className="w-full text-light-4 font-bold">History</h2>
        <img src="/assets/icons/history.svg" alt="logo" width={25} />
    </div>


      <div className="h-auto w-full bg-dark-3 rounded-lg ">
          {
            isStreaksLoading ? <div className="w-full flex-center"><Loader/></div> : (
              <ul className="flex flex-col justify-center items-center gap-1">
            
              {allStreaks.reverse().slice(0,7).map((user: any) => (
                <li
                  key={Math.random()}
                  className="flex gap-3 h3-bold w-full rounded-lg justify-evenly py-5 bg-dark-4"
                >
                  <h3 className="w-44 pt-1  dark:text-main text-main">{formatDate(user.breakDate)}</h3>
                  <h3 className="pt-1  dark:text-main text-main">{user.streaks}🔥</h3>
                </li>
              ))}
            </ul>
            )
          }
      </div>
      <div className="flex justify-between pb-14 pt-7">
        <p className="font-semibold">Dark mode</p>
        <ThemeToggle />
      </div>
    </div>
      }
    </>
  );
};

export default Profile;
