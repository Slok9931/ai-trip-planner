import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Hero = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    const accessToken = tokenInfo?.access_token;

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.replace("/create-trip");
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  return (
    <div className="flex flex-col items-center mx-24 md:mx-48 gap-9 mb-16">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#b542da]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalised Itineraries at Your Fingertips
      </h1>
      <p className="text-sm md:text-md lg:text-lg xl:text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to={!user ? "/" : "/create-trip"}>
        <Button
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Get Started, It's Free
        </Button>
      </Link>

      <div className="w-full">
        <img src="/mockups.png" alt="mockups" />
      </div>
      
      <Dialog open={openDialog}>
      <DialogClose asChild={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle style={{ height: "28px", width: "28px" }} />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
        </DialogClose>
      </Dialog>
    </div>
  );
};

export default Hero;
