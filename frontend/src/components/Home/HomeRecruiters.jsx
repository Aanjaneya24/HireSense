import React from "react";
import happyPeople from "../assets/media/happyRecruiters.svg";
import { Link } from "react-router-dom";

function HomeRecruiters() {
  return (
    <div className="md:flex px-7 md:px-10 py-8 font-Poppins">
      <div className="md:w-1/2 px-3 md:px-16">
        <div>
          <p className="text-xl font-medium">FOR EMPLOYERS</p>
        </div>
        <div>
          <h3 className="text-4xl font-semibold md:mr-28 my-7">
            Why companies choose HireSense
          </h3>
        </div>

        <div className="flex flex-col gap-8 text-left">
          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128716b37e63bb_Team.svg" />
            <p>
              <span className="font-semibold">Access top talent </span>
              from a vast pool of qualified candidates, with comprehensive profiles and verified skills
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128708fd7e63b6_Settings.svg" />
            <p>
              <span className="font-semibold">AI-powered job descriptions </span>
              that attract the right candidates. Set up your company profile and start hiring within
              <span className="font-semibold"> minutes</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287316a7e63c1_Template.svg" />
            <p>
              <span className="font-semibold">Smart applicant tracking </span>
              with built-in tools to shortlist, manage, and hire the perfect candidates
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p>
              Get real-time analytics and insights to make better hiring decisions. 
              Track your job performance and optimize your recruitment strategy.
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
      {/* Right */}

      <div className="md:w-1/2  bg-blue-800">
        <div className="sm:p-20 md:p-0 ">
          <img src={happyPeople} className="md:w-11/12 " />
        </div>
      </div>
    </div>
  );
}

export default HomeRecruiters;
