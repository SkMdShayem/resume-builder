import { useDispatch, useSelector } from "react-redux";
import {
  updatePersonalInfo,
  updateSummary,
  addEducation,
  removeEducation,
  updateEducation,
  addExperience,
  removeExperience,
  updateExperience,
  addSkill,
  removeSkill,
  addLanguage,
  removeLanguage,
  setResumeData,
  setTemplate,
  updateLinks,
} from "../app/resumeSlice";
import { useState,useEffect } from "react";
import improveSummary from "../services/gptServices";
import { useNavigate } from "react-router-dom";
import normalizeResumeData from "../utils/normalizeResumeData";

const ResumeForm = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume.currentResume);
  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const currentTemplate = useSelector((state) => state.resume.currentResume.template);
  const navigate = useNavigate();

  const [skill, setSkill] = useState("");
  const [language, setLanguage] = useState("");
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handlePersonalChange = (e) => {
    dispatch(updatePersonalInfo({ [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const savedResumes =
      JSON.parse(localStorage.getItem("resumes")) || [];

    const editingResume =
      JSON.parse(localStorage.getItem("editingResume"));

    const newResume = {
      id: editingResume?.id || Date.now(),
      data: normalizeResumeData(resume),
      template: currentTemplate || selectedTemplate,
    };

    const updatedResumes = editingResume
      ? savedResumes.map((r) => (r.id === editingResume.id ? newResume : r))
      : [...savedResumes, newResume];

    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    localStorage.removeItem("editingResume");

    alert("Resume Saved Successfully!");
    navigate("/dashboard");
  };

  const handleAddSkill = () => {
    if (!skill) return;
    dispatch(addSkill(skill));
    setSkill("");
  };

  const handleAddLanguage = () => {
    if (!language) return;
    dispatch(addLanguage(language));
    setLanguage("");
  };

  const handleImproveSummary = async () => {
    const improved = await improveSummary(resume.summary);
    dispatch(updateSummary(improved));
  };

  useEffect(() => {
    const editingResume =
      JSON.parse(localStorage.getItem("editingResume"));

    if (editingResume) {
      dispatch(
        setResumeData({
          ...editingResume.data,
          template: editingResume.template,
        }),
      );

      if (editingResume.template) {
        dispatch(setTemplate(editingResume.template));
      }
    }
  }, [dispatch]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Personal Info */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">
                  Personal Information
                </h2>

                <input
                  name="name"
                  placeholder="Full Name"
                  value={resume.personalInfo.name}
                  onChange={handlePersonalChange}
                  className="w-full border p-2 mb-3 rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={resume.personalInfo.email}
                  onChange={handlePersonalChange}
                  className="w-full border p-2 mb-3 rounded"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={resume.personalInfo.phone}
                  onChange={handlePersonalChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  name="location"
                  placeholder="Location"
                  value={resume.personalInfo.location}
                  onChange={handlePersonalChange}
                  className="w-full border p-2 mt-3 rounded"
                />
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            {/* Links */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Links</h2>

                <input
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={resume.links.linkedin}
                  onChange={(e) =>
                    dispatch(
                      updateLinks({ [e.target.name]: e.target.value }),
                    )
                  }
                  className="w-full border p-2 mb-3 rounded"
                />

                <input
                  name="github"
                  placeholder="GitHub URL"
                  value={resume.links.github}
                  onChange={(e) =>
                    dispatch(
                      updateLinks({ [e.target.name]: e.target.value }),
                    )
                  }
                  className="w-full border p-2 mb-3 rounded"
                />

                <input
                  name="portfolio"
                  placeholder="Portfolio URL"
                  value={resume.links.portfolio}
                  onChange={(e) =>
                    dispatch(
                      updateLinks({ [e.target.name]: e.target.value }),
                    )
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            {/* Summary */}
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold mb-3">
                    Professional Summary
                  </h2>
                  <button
                    type="button"
                    className="bg-purple-600 text-white px-4 py-2 rounded mb-2"
                    onClick={handleImproveSummary}
                  >
                    Improve with AI
                  </button>
                </div>
                <textarea
                  value={resume.summary}
                  onChange={(e) => dispatch(updateSummary(e.target.value))}
                  className="w-full border p-3 rounded"
                  rows={4}
                />
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            {/* Experience */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Experience</h2>
                {resume.experience.map((exp, index) => (
                  <div key={index} className="border p-4 mb-4 rounded">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        dispatch(
                          updateExperience({
                            index,
                            data: { ...exp, company: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        dispatch(
                          updateExperience({
                            index,
                            data: { ...exp, role: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        dispatch(
                          updateExperience({
                            index,
                            data: { ...exp, description: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <button
                      onClick={() => dispatch(removeExperience(index))}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    dispatch(
                      addExperience({
                        company: "",
                        role: "",
                        description: "",
                      }),
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Experience
                </button>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            {/* Education */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Education</h2>

                {resume.education.map((edu, index) => (
                  <div key={index} className="border p-4 mb-4 rounded">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        dispatch(
                          updateEducation({
                            index,
                            data: { ...edu, institution: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        dispatch(
                          updateEducation({
                            index,
                            data: { ...edu, degree: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <textarea
                      placeholder="Description"
                      value={edu.description}
                      onChange={(e) =>
                        dispatch(
                          updateEducation({
                            index,
                            data: { ...edu, description: e.target.value },
                          }),
                        )
                      }
                      className="w-full border p-2 mb-2"
                    />

                    <button
                      onClick={() => dispatch(removeEducation(index))}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    dispatch(
                      addEducation({
                        institution: "",
                        degree: "",
                        description: "",
                      }),
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Education
                </button>
              </div>
            </div>
          </>
        );

      case 6:
        return (
          <>
            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Skills</h2>

              <div className="flex gap-2">
                <input
                  placeholder="Add Skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="flex-1 border p-2 rounded"
                />

                <button
                  onClick={handleAddSkill}
                  className="bg-green-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {resume.skills.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-200 rounded"
                  >
                    <span className=" px-2 py-1 text-sm">{s}</span>
                    <button
                      onClick={() => dispatch(removeSkill(i))}
                      className="text-red-500 px-2 py-1"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Languages</h2>

              <div className="flex gap-2">
                <input
                  placeholder="Add Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="flex-1 border p-2 rounded"
                />

                <button
                  onClick={handleAddLanguage}
                  className="bg-green-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {resume.languages.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-200 rounded"
                  >
                    <span className=" px-2 py-1 text-sm">{l}</span>
                    <button
                      onClick={() => dispatch(removeLanguage(i))}
                      className="text-red-500 px-2 py-1"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Fill Your Resume Details</h1>
        <div className="bg-white p-6 rounded shadow">
          {renderStep()}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Previous
              </button>
            )}

            {step < 6 && (
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}

            {step === 6 && (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
