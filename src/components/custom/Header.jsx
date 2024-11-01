import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
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
      window.location.reload();
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <div className="flex gap-3 items-center">
        <img src="/logo.png" className="h-16" />
        <h2 className="font-bold text-3xl font-serif">Trip Planner</h2>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full my-btn">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trip">
              <Button variant="outline" className="rounded-full my-btn">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <h2 className="font-bold text-xl mt-2">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                  <a href="/create-trip">
                    <Button
                      variant="outline"
                      className="rounded-full mr-3 mb-5"
                    >
                      + Create Trip
                    </Button>
                  </a>
                  <a href="/my-trip">
                    <Button variant="outline" className="rounded-full mb-5">
                      My Trips
                    </Button>
                  </a>
                  <div
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.replace("/");
                    }}
                  >
                    <Button className="w-full">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
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
      </Dialog>
    </div>
  );
};

export default Header;
