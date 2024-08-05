import { Button } from '@/components/ui/button';
import { logout } from '@/lib/calls';
import { Link, useNavigate } from 'react-router-dom'



const Topbar = () => {

  const signOut = () =>{
    logout()
  }


  return (
    <section className='topbar'>
      <div className='flex-between py-5 px-6'>
          <Link to='/profile' className='flex gap-3 items-center'>
            <img
              src='/assets/icons/profile-placeholder.svg'
              alt='logo'
              width={22}
              height={22}
              
            />
          </Link>

          <div className='flex gap-4'>
            <Button variant="ghost" className='shad-button_ghost' onClick={ ()=>signOut() }>
              <img src='/assets/icons/logout.svg' alt='logo' height={20} width={20}/>
            </Button>
          </div>

      </div>
    </section>
  )
}

export default Topbar