import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AppLayout = ({ children }) => {
    return (
       <>
            <Navbar />
            <div className='w-screen flex '  >
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y">
                    <div className="flex flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </>
       
    )
}

export default AppLayout
