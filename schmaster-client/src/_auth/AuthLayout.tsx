import { useUserContext } from '@/context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom'


const AuthLayout = () => {
  const {isAuthenticated} = useUserContext();



  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/"/> 
      ): (
        <>
          <section className='flex flex-1 justify-center items-center flex-col p-10 custom-scollbar'>
            <Outlet />
          </section>

          <img
          src='/assets/images/MainSignUp.png'
          alt='logo'
          className='hidden xl:block h-[115vh] w-1/2 object-cover bg-no-repeat relative bottom-14'
          />
        </>
        )
      }
    </>
  )
}

export default AuthLayout