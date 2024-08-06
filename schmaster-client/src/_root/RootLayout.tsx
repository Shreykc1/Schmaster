import Topbar from '@/shared/components/Topbar'

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full md:flex md:flex-col">
          <Topbar />
            <section className="flex flex-1 h-full">
               <Outlet />
            </section>
          
      </div>
  )
}

export default RootLayout