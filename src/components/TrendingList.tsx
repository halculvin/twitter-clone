import Image from 'next/image'
import React from 'react'

const TrendingList = () => {
    return (
        <div className='flex items-center mt-4'>
            <div>
                <p className='text-gray-500 text-[14px] mb-1'>Entertainment · LIVE</p>
                <h1 className='pr-2 font-medium'>Bigg Boss 16: Salman Khan returns with a brand new season</h1>
            </div>

            <div>
                <Image className='rounded-[20px]' src="/trending-1.jfif" height={120} width={120} alt={''} />
            </div>
        </div>
    )
}

export default TrendingList
