import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

function InfoSection({ trip }) {
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])
    const [photoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async() => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name)
            setPhotoUrl(PhotoURL);
        })
    }
  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "placeholder.png"}
        alt="image"
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5 flex-col md:flex-row">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              🍻 No. of traveler : {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
