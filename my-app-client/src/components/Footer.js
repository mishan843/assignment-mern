import React from "react";
import { RiRecordCircleFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-5 bg-blue-200">
      <div className=" px-5 flex-1 p-4">
        <div className="flex items-center ">
          <RiRecordCircleFill className="text-5xl" />
          <p className="text-2xl font-bold mx-3">Food Recipes</p>
        </div>
        <p className="">
          A recipe is a set of instructions that describes how to prepare or
          make something, especially a dish of prepared food. A sub-recipe or
          subrecipe is a recipe for an ingredient that will be called for in the
          instructions for the main recipe.
        </p>
        <div className="flex gap-5 mt-3">
          <Link href="/">
            <FaTwitter />
          </Link>
          <Link href="/">
            <FaFacebook />
          </Link>
          <Link href="">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
