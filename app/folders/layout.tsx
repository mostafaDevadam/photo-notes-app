import React from 'react'

const Layout = ({ children} :Readonly<{children: React.ReactNode;}>) => {
  return (
    <div>
       <div>
        {children}
      </div>
    </div>
  )
}

export default Layout