import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Login from 'src/views/pages/login/Login'

const DefaultLayout = () => {
  return (
    <div>
      {/* <Login/> */}
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
