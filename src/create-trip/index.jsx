import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  
  const navigate = useNavigate();
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROPMT = AI_PROMT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROPMT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async(TripData) => {
    setLoading(true);
    const docID = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));
    await setDoc(doc(db, "AITrips", docID), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docID
      });
      setLoading(false);
      navigate('/view-trip/'+docID);
      window.location.reload();
  }

  const login = useGoogleLogin({
    onSuccess:(codeResp) => GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })
  
  const GetUserProfile = async (tokenInfo) => {
    const accessToken = tokenInfo?.access_token;
  
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
  
    try {
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
          Accept: "application/json",
        },
      });
  
      localStorage.setItem("user", JSON.stringify(res.data)); 
      setOpenDialog(false); 
      onGenerateTrip(); 
  
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip plannar will generate
        a customized itinerary based on your prferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice ?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip ?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            min="1"
            max="10"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget ?</h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-8 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.budget == item.title && "shadow-lg border-black"
                    }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next adventure ?
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-8 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.traveler == item.people &&
                      "shadow-lg border-black"
                    }`}
                onClick={() => handleInputChange("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
        {loading? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button className="w-full mt-5 flex gap-4 items-center" onClick={login}>
                <FcGoogle style={{ height: '28px', width: '28px' }}/>Sign In with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
