import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])
    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoURL);
        })
    }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all shadow-md cursor-pointer'>
      <img src={photoUrl ? photoUrl : "/placeholder.png"} alt="image" className='h-[130px] w-[130px] object-cover rounded-xl' />
      <div>
        <h2 className='font-bold text-lg'>{place?.placeName}</h2>
        <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
        <h2 className='mt-2'>🕙 {place?.timeTravel}</h2>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
