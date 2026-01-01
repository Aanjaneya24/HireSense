import React from "react";
import happyPeople from "../assets/media/happy.svg";
import { Link } from "react-router-dom";

function JobSeekers() {
  return (
    <div className="md:flex px-5 md:px-10 py-20 md:py-32 font-Poppins">
      <div className="md:w-1/2  bg-blue-800 ">
        <div className="sm:p-20 md:p-0">
          <img src={happyPeople} className=" md:w-11/12 " />
        </div>
      </div>

      {/* Right */}
      <div className="md:w-1/2 px-5 md:px-16">
        <div>
          <p className="text-xl font-medium my-10">FOR JOB SEEKERS</p>
        </div>
        <div>
          <h3 className="text-4xl font-semibold mr-4 md:mr-20 my-7 ">
            Why professionals choose HireSense
          </h3>
        </div>

        <div className="flex flex-col gap-8 text-left">
          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287fab77e63b3_Star.svg" />
            <p>
              Discover opportunities at <span className="font-semibold">innovative companies</span> and
              <span className="font-semibold"> growing startups</span> matched to your skills
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128775587e63ec_Click.svg" />
            <p>
              <span className="font-semibold">Smart profile-based applications. </span>
              No more endless cover letters -
              <span className="font-semibold"> apply with one click</span> using your profile.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287515d7e63b2_List.svg" />
            <p>
              <span className="font-semibold">Complete transparency </span>
              with detailed job descriptions,
              <span className="font-semibold"> company insights</span>, and clear expectations upfront
            </p>
          </div>

          <div className=" flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287b6b07e63ed_Connect.svg" />
            <p>
              Connect directly with
              <span className="font-semibold"> founders</span> at top startups -
              no third party recruiters allowed
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="my-10">
          <Link to="/login">
            <button className="border border-gray-300 text-black font-medium py-2 px-5 rounded-xl md:shadow hover:bg-blue-50 hover:border-blue-500 duration-500 mr-5 md:hover:scale-105">
              Learn more
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-black text-white font-medium py-2 px-5 rounded-xl  hover:bg-blue-700 duration-500 md:hover:scale-105 md:shadow">
              Sign up now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobSeekers;
