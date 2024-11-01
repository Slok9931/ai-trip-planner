import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])
    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: hotel?.hotelName+","+hotel?.hotelAddress
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name)
            setPhotoUrl(PhotoURL);
        })
    }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 cursor-pointer transition-all'>
                <img src={photoUrl?photoUrl:"/placeholder.png"} alt="image" className='rounded-xl h-48 w-full object-cover'/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                </div>
            </div>
            </Link>
  )
}

export default HotelCardItem
