const PageLayout = ({ children}) => {
    return (
        <div className="h-screen bg-linear-to-br from-cyan-500 to-gray-500">
            <div className='flex gap-5 bg-gray-700 border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
                <h2 className='text-lg font-medium text-white'>Perdata | PN Kab. Kediri</h2>
            </div>
            <div className='grid grid-cols-6'>
                {children}
            </div>
        </div>
    )
}

export default PageLayout