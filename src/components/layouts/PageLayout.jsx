const PageLayout = ({ children}) => {
    return (
        <div>
            <div className='flex gap-5 bg-gray-700 border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
                <h2 className='text-lg font-medium text-white'>Perdata | PN Kab. Kediri</h2>
            </div>
            <div className='grid grid-cols-6 gap-5'>
                {children}
            </div>
        </div>
    )
}

export default PageLayout