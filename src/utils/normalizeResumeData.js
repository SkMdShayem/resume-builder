const hasText = (value) => typeof value === "string" && value.trim() !== "";

const hasAnyText = (values = []) => values.some(hasText);

const normalizeResumeData = (resume = {}) => {
  const personalInfo = {
    name: resume.personalInfo?.name || "",
    email: resume.personalInfo?.email || "",
    phone: resume.personalInfo?.phone || "",
    location: resume.personalInfo?.location || "",
  };

  const links = {
    linkedin: resume.links?.linkedin || "",
    github: resume.links?.github || "",
    portfolio: resume.links?.portfolio || "",
  };

  return {
    ...resume,
    personalInfo,
    links,
    summary: hasText(resume.summary) ? resume.summary.trim() : "",
    experience: (resume.experience || []).filter((item) =>
      hasAnyText([item?.company, item?.role, item?.description]),
    ),
    education: (resume.education || []).filter((item) =>
      hasAnyText([item?.institution, item?.degree, item?.description]),
    ),
    skills: (resume.skills || []).filter(hasText),
    languages: (resume.languages || []).filter(hasText),
  };
};

export default normalizeResumeData;
