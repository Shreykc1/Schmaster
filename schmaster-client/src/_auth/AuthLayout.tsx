import { useUserContext } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom'


const AuthLayout = () => {
  const {isAuthenticated} = useUserContext();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/"/> 
      ): (
        <>


          <section className='flex bg-dark-2 flex-1 justify-center items-center flex-col p-10 custom-scollbar'>
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