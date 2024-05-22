"use client";
import Image from "next/image";
import { useState } from "react";
import { FaAnglesLeft, FaPen } from "react-icons/fa6";
import UploadImg from "./UploadImg";
import { signIn, signOut } from "next-auth/react";
import { FaDoorOpen } from "react-icons/fa6";
import Link from "next/link";
/**
 * Cliente component for the left bar panel.
 * @param UserInfo Receives the user name, image key and boolean identifying if it's authenticated.
 */
function LeftBarContent({
  imageKey,
  userName,
  isAuthenticated,
}: {
  imageKey: string | null;
  userName: string | null;
  isAuthenticated: boolean;
}) {
  // UseState for hidding the left bar and the image changer.
  const [isVisibleLeftbar, setVisible] = useState(true);
  const [isVisibleImgChanger, setVisibleImg] = useState(false);

  //Handler for changing the image visiblity, it's passed down as props to the UploadImg component.
  const imgVisibilityHandle = () => {
    setVisibleImg(!isVisibleImgChanger);
  };
  return (
    <>
      <FaAnglesLeft
        className={`absolute top-5 left-5 text-3xl text-slate-300 z-10 ${
          !isVisibleLeftbar && "rotate-180"
        } transition-all duration-500 cursor-pointer`}
        onClick={() => setVisible(!isVisibleLeftbar)}
      />
      <nav
        className={`min-w-80 bg-slate-950 h-full py-14 flex flex-col items-center justify-start  gap-4 border-r transition-all relative duration-500 ${
          !isVisibleLeftbar && "-ml-80"
        }`}
      >
        {isAuthenticated ? (
          <>
            <FaDoorOpen
              className={`absolute right-5 top-5 text-3xl text-slate-300 cursor-pointer`}
              onClick={() => signOut()}
            />
            <div
              className={`w-28 h-28 relative rounded-full cursor-pointer ${
                !imageKey && "bg-black flex-center text-slate-300 "
              }`}
              onClick={() => imgVisibilityHandle()}
            >
              {imageKey ? (
                <>
                  <Image
                    alt={userName || "NO IMG"}
                    src={"https://utfs.io/f/" + imageKey}
                    width={112}
                    height={112}
                    className="rounded-full h-full border-2 box-content"
                  />
                  <div
                    className="absolute top-0 left-3/4 p-1.5 rounded-xl bg-slate-600 cursor-pointer"
                    onClick={() => imgVisibilityHandle()}
                  >
                    <FaPen className=" text-2xl text-slate-300 " />
                  </div>
                </>
              ) : (
                "ADD IMAGE"
              )}
              <UploadImg
                isVisible={isVisibleImgChanger}
                changeVisibility={imgVisibilityHandle}
                className="top-0 left-full translate-x-6"
              />
            </div>
            <span className="text-3xl text-slate-100 mt-2">{userName}</span>
          </>
        ) : (
          <>
            <button
              className="w-3/5 h-16 bg-slate-900 text-slate-300 rounded-xl transition-all duration-500 hover:bg-slate-300 hover:text-slate-900"
              onClick={() => signIn(undefined, { callbackKey: "/" })}
            >
              Login
            </button>
            <Link
              href={"/auth/signup"}
              className="w-3/5 h-16 flex-center bg-slate-900 text-slate-300 rounded-xl transition-all duration-500 hover:bg-slate-300 hover:text-slate-900"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

export default LeftBarContent;
