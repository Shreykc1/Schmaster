import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { logout } from '@/lib/calls';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom'




const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const goTo = location.pathname.startsWith("/profile") ? '/' : 'profile'
  const backImg = location.pathname.startsWith("/profile") ? '/assets/icons/back.svg' : '/assets/icons/profile-placeholder.svg'


  const signOut = async() =>{
    const log = await logout();
    if (log){
      return toast({
        title: "Logged out successfully!",
        description: "Close the Application...",
      })
    }
  
  }

  const usersId = Cookies.get('token');

  return (
    <section className='topbar'>
      <div className='flex-between py-5 px-6'>
          <Link to={goTo} state={{userID: usersId}} className='flex gap-3 items-center'>
            <img
              src={backImg}
              alt='logo'
              width={30}
              height={30}
              
            />
          </Link>


          <div className='flex gap-4'>
            <Button variant="ghost" className='shad-button_ghost' onClick={ ()=> signOut() }>
              <img src='/assets/icons/logout.svg' alt='logo' height={20} width={20}/>
            </Button>
          </div>

      </div>
    </section>
  )
}

export default Topbar