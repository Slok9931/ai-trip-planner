import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg my-2'>Places to Visit</h2>
      <div className='grid md:grid-cols-2 gap-5'>
        {trip?.tripData?.itinerary?.map((item,index) => (
            <div>
                <h2 className='font-mediun text-lg'>{item?.day}</h2>
                {item?.plan.map((place,index) => (
                    <div className='my-3'>
                        <h2 className='font-medium my-2 text-[#b542da]'>Best time to visit: {item?.bestTime}</h2>
                        <PlaceCardItem place={place} />
                    </div>
                ))}
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
