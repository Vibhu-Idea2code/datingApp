import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Dating App
        </a>
        <span className="ms-1">&copy; 2023 Dating app.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Dating App React Admin 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
