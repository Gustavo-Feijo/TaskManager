import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";

//Footer with some social media links.
function Footer() {
  return (
    <div className="h-36 border-t-2 border-[color:var(--border-color)] w-full flex items-center justify-center">
      <div className="w-96 text-4xl flex items-center justify-around">
        <a href="https://facebook.com/">
          <FaFacebook />
        </a>
        <a href="https://instagram.com/">
          <FaInstagram />
        </a>
        <a href="https://x.com">
          <FaSquareXTwitter />
        </a>
        <a href="https://discord.com">
          <FaDiscord />
        </a>
      </div>
    </div>
  );
}

export default Footer;
