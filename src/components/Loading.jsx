import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

const Loading = ({ active, children }) => {
    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                <ThreeDot variant="bounce" color="#606c44" size="large" text="Silahkan tunggu" textColor="" />
            </div>
        </>
    )
}

export default Loading