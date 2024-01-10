import React from 'react'

import { Outlet } from 'react-router-dom'

// ==============================|| MINIMAL LAYOUT ||============================== //

const LoginLayout = () => (
  <>
  {/* <Outlet> should be used in parent route elements to render their child route elements. This means that <Outlet> doesn’t render any markup on the screen, but is replaced by the child route elements. */}
    <Outlet />
  </>
)

// <checkOut> no pan use kri skay but jyare any reasons thi outlet ma props pass krvano hoy tyare ae pn without context

export default LoginLayout