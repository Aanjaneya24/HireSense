import React, { useEffect, useState } from "react";
import CheckBoxLabel from "../Common/FormComponents/CheckBoxLabel";
import SelectInput from "../Common/FormComponents/SelectInput";
import InputField from "../Common/FormComponents/InputField";
import Checkbox from "../Common/FormComponents/Checkbox";
import CompanySearch from "../Common/CompanySearch";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function UserOnboaring() {
  const initialFormData = {
    location: "",
    primaryRole: "",
    yearsOfExperience: "",
    companyName: "",
    companyLogo: "",
    companyDomain: "",
    title: "",
    notEmployed: false,
    linkedin: "",
    website: "",
  };

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleDropdown = (item) => {
    handleCompanyInput(item);
    setShowDropdown(!showDropdown);
  };

  const handleInputChange = (e) => {
    const { id, type } = e.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: !prevFormData[id],
      }));
    } else {
      const { value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleCompanyInput = (company) => {
    const { name, logo, domain } = company;

    setFormData({
      ...formData,
      companyName: name,
      companyLogo:
        logo ||
        "https://via.placeholder.com/150",
      companyDomain: domain,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      address: { country: formData.location },
      location: formData.location,
      primaryRole: formData.primaryRole,
      socialProfiles: {
        linkedin: formData.linkedin || "",
        github: "",
        twitter: "",
        portfolioWebsite: formData.website || "",
      },
      workExperience: [
        {
          jobTitle: formData.title || "",
          company: {
            name: formData.companyName || "",
            logoUrl: formData.companyLogo || "",
            domain: formData.companyDomain || "",
          },
        },
      ],
      yearsOfExperience: formData.yearsOfExperience,
      doneOnboarding: true,
    };
    try {
      const res = await userService.updateUserProfile(data);
      console.log("Profile update response:", res);
      // Redirect to home after successful profile creation
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.notEmployed === true) {
      setFormData({
        ...formData,
        companyName: "",
        companyLogo: "",
        companyDomain: "",
        title: "",
      });
    }
  }, [formData.notEmployed]);

  const locationOptions = [
    { value: "default", label: "Select Country" },
    { value: "india", label: "India" },
    { value: "united_states", label: "United States" },
    { value: "united_kingdom", label: "United Kingdom" },
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "japan", label: "Japan" },
    { value: "china", label: "China" },
    { value: "brazil", label: "Brazil" },
    { value: "south_africa", label: "South Africa" },
  ];
  const roleOptions = [
    {
      label: "Technical Roles",
      options: [
        { value: "data_scientist", label: "Data Scientist" },
        { value: "system_admin", label: "System Administrator" },
        { value: "software_engineer", label: "Software Engineer" },
      ],
    },
    {
      label: "Management Roles",
      options: [
        { value: "project_manager", label: "Project Manager" },
        { value: "product_manager", label: "Product Manager" },
        { value: "team_lead", label: "Team Lead" },
      ],
    },
    {
      label: "Design Roles",
      options: [
        { value: "ui_designer", label: "UI Designer" },
        { value: "ux_designer", label: "UX Designer" },
        { value: "graphic_designer", label: "Graphic Designer" },
      ],
    },
  ];

  const experienceOptions = [
    { value: "default", label: "Select years of experience" },
    { value: "0", label: "Less than 1 year" },
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "4", label: "4 years" },
    { value: "5", label: "5 years" },
    { value: "6", label: "More than 5 years" },
  ];
  return (
    <div className="mt-[3.8rem]  bg-[#ebeff5] flex flex-col items-center ">
      <div>
        <div className="py-10 flex flex-col justify-center items-center gap-5">
          <h2 className="font-semibold text-5xl text-gray-950 text-center">
            Create your profile
          </h2>
          <p className="text-lg text-gray-950 text-center">
            Apply privately to thousands of tech companies & startups with one
            profile.
          </p>
        </div>
      </div>
      <form className="w-11/12 md:w-5/6 lg:w-4/6" onSubmit={handleSubmission}>
        <div className="bg-white  rounded-xl p-6 md:p-10 flex flex-col gap-6 mb-10">
          <div>
            <p className="font-medium">
              <span className="text-blue-500 mr-1">*</span>Where are you based?
            </p>
            <div className="pl-3 flex flex-col gap-3">
              <p className="text-xs mt-1 text-gray-400 hidden">
                Tip: You can choose a city, state, or country
              </p>
              <CheckBoxLabel text={formData.location} />
              <SelectInput
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                options={locationOptions}
                className={"w-full md:w-1/2"}
              />
            </div>
          </div>
          <div>
            <p className="font-medium">
              <span className="text-blue-500 mr-1">*</span>What best describes
              your current role?
            </p>
            <div className="pl-3 flex flex-col gap-2">
              <CheckBoxLabel text={formData.primaryRole} />
              <SelectInput
                id="primaryRole"
                value={formData.primaryRole}
                onChange={handleInputChange}
                options={roleOptions}
                optgroup={true}
                className={"w-full md:w-1/2"}
              />
            </div>
          </div>
          <div>
            <p className="font-medium">
              <span className="text-blue-500 mr-1">*</span>How many years of
              experience do you have in your current role?
            </p>
            <div className="pl-3 flex flex-col gap-2">
              <CheckBoxLabel
                text={
                  formData.yearsOfExperience &&
                  `${formData.yearsOfExperience} years`
                }
              />
              <SelectInput
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                options={experienceOptions}
                className={"w-full md:w-1/2"}
              />
            </div>
          </div>
          <div>
            <p className="font-medium">
              <span className="text-blue-500 mr-1">*</span>Where do you
              currently work?
            </p>
            <div className="pl-3 flex flex-col gap-2">
              <p className="text-xs mt-1 text-gray-400">
                Your company will never see that you're looking for a job
              </p>
              <CheckBoxLabel text={formData.companyName} />
              <div className="flex flex-col gap-1.5 ">
                <div className={formData.notEmployed ? "hidden" : ""}>
                  <InputField
                    label="Title"
                    id="title"
                    onChange={handleInputChange}
                    value={formData.title}
                    isRequired={!formData.notEmployed}
                    placeholder="SDE 1"
                    className={"w-full md:w-1/2"}
                  />

                  <div>
                    <div className={showDropdown ? "" : "hidden"}>
                      <CompanySearch
                        handleDropdown={handleDropdown}
                        width={"w-full md:w-1/2"}
                      />
                    </div>
                    <div className={!showDropdown ? "" : "hidden"}>
                      <label className="font-medium flex gap-2">
                        Company
                        <span className="text-gray-500">*</span>
                      </label>
                      <div className="flex justify-between items-center my-2.5 p-2 bg-white rounded-md shadow-sm border">
                        <div className="flex items-center ">
                          <img
                            src={formData.companyLogo}
                            alt={formData.companyName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span className="font-semibold">
                            {formData.companyName}
                          </span>
                        </div>
                        <i
                          className="fa-solid fa-x text-gray-400 hover:cursor-pointer mr-3 text-xs"
                          onClick={() => handleDropdown({ name: "", logo: "" })}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center my-3 ml-1.5">
                  <Checkbox
                    label={"I'm not currently employed"}
                    name="notEmployed"
                    id="notEmployed"
                    checked={formData.notEmployed}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-5 md:p-16 flex flex-col gap-10">
            <InputField
              label="Linkedin Profile"
              id="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder={"https://www.linkedin.com/in/username"}
              className={"w-full md:w-1/2 flex flex-col gap-3"}
            />
            <InputField
              label="Your Website"
              id="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder={"https://mypersonalwebsite.com"}
              className={"w-full md:w-1/2 flex flex-col gap-3"}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-3xl w-48 py-2.5 px-3.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Creating Profile..." : "Create your profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserOnboaring;
