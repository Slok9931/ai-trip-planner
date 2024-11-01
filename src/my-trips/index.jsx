import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrip();
  }, []);
  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips(prev => [...prev, doc.data()]);
    });
  };

  return(
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-10">
        {userTrips.map((trip,index) => (
          <UserTripCardItem trip={trip} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MyTrip;
