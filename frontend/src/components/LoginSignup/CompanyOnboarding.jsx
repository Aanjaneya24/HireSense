import React, { useEffect, useState } from "react";
import InputField from "../../components/Common/FormComponents/InputField";
import TextArea from "../Common/FormComponents/TextArea";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import CompanySearch from "../Common/CompanySearch";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function CompanyOnboarding() {
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    companyDescription: "",
    contactNumber: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    companySize: {
      from: "",
      to: "",
    },
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
    companySocialProfiles: {
      linkedIn: "",
      twitter: "",
      portfolioWebsite: "",
    },
  });
  const [showDropdown, setShowDropdown] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCompanyProfile((prevProfile) => ({
        ...prevProfile,
        [parent]: {
          ...prevProfile[parent],
          [child]: value,
        },
      }));
    } else {
      setCompanyProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ ...companyProfile, doneOnboarding: true });
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      const res = await userService.updateUserProfile(data);
      console.log("Company profile update response:", res);
      // Redirect to dashboard after successful profile creation
      setTimeout(() => {
        navigate("/dashboard/home", { replace: true });
      }, 500);
    } catch (error) {
      console.error("Company profile update error:", error);
      alert("Failed to update company profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDropdown = (item) => {
    handleCompanyInput(item);
    setShowDropdown(!showDropdown);
  };

  const handleCompanyInput = (company) => {
    const { name, logo, domain } = company;

    setCompanyProfile((prevProfile) => ({
      ...prevProfile,
      companyName: name,
      companyLogo:
        logo ||
        "https://via.placeholder.com/150",
      companySocialProfiles: {
        ...prevProfile.companySocialProfiles,
        portfolioWebsite: domain,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EBEFF5] py-10 mt-10">
      <div className="py-5 flex flex-col justify-center items-center gap-5">
        <h2 className="font-semibold text-5xl text-gray-950 text-center">
          Complete your profile
        </h2>
        <p className="text-lg text-gray-950 text-center">
          Find the best fit for your organisation among thousands of talents
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-2xl  space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Company Information</h2>
          <div>
            <div className={showDropdown ? "" : "hidden"}>
              <CompanySearch
                label="Select company"
                handleDropdown={handleDropdown}
                width={"w-full "}
              />
            </div>
            <div className={!showDropdown ? "" : "hidden"}>
              <div className="flex justify-between items-center my-2.5 p-2 bg-white rounded-md shadow-sm border">
                <div className="flex items-center ">
                  <img
                    src={companyProfile.companyLogo}
                    alt={companyProfile.companyName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-semibold">
                    {companyProfile.companyName}
                  </span>
                </div>
                <i
                  className="fa-solid fa-x text-gray-400 hover:cursor-pointer mr-3 text-xs"
                  onClick={() => handleDropdown({ name: "", logo: "" })}
                ></i>
              </div>
            </div>
          </div>
          <TextArea
            label="Company Description"
            id="companyDescription"
            value={companyProfile.companyDescription}
            onChange={handleChange}
            placeholder="Enter company description"
          />
          <InputField
            label="Contact Number"
            id="contactNumber"
            value={companyProfile.contactNumber}
            onChange={handleChange}
            placeholder="+91 1234567890"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Address</h2>
          <div className="flex gap-3 justify-between">
            <InputField
              label="City"
              id="address.city"
              value={companyProfile.address.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
            <InputField
              label="State"
              id="address.state"
              value={companyProfile.address.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
            <InputField
              label="Country"
              id="address.country"
              value={companyProfile.address.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Company Size</h2>
          <div className="flex gap-16">
            <InputField
              label="Company Size From"
              id="companySize.from"
              value={companyProfile.companySize.from}
              onChange={handleChange}
              placeholder="Enter company size (from)"
            />
            <InputField
              label="Company Size To"
              id="companySize.to"
              value={companyProfile.companySize.to}
              onChange={handleChange}
              placeholder="Enter company size (to)"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Online Presence</h2>

          <InputField
            label="LinkedIn"
            id="companySocialProfiles.linkedIn"
            value={companyProfile.companySocialProfiles.linkedIn}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/company/username"
          />
          <InputField
            label="Twitter"
            id="companySocialProfiles.twitter"
            value={companyProfile.companySocialProfiles.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg w-full py-3 px-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CompanyOnboarding;
