import { Button } from '@/components/ui/button';
import { logout } from '@/lib/calls';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle';



const Topbar = () => {

  const location = useLocation();
  const goTo = location.pathname.startsWith("/profile") ? '/' : 'profile'
  const backImg = location.pathname.startsWith("/profile") ? '/assets/icons/back.svg' : '/assets/icons/profile-placeholder.svg'
  const signOut = () =>{
    logout()
  }




  return (
    <section className='topbar'>
      <div className='flex-between py-5 px-6'>
          <Link to={goTo} className='flex gap-3 items-center'>
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