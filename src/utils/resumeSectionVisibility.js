const hasItems = (items = []) => Array.isArray(items) && items.length > 0;

const hasText = (value = "") =>
  typeof value === "string" && value.trim().length > 0;

export const getSectionVisibility = (data = {}) => {
  const summary = data.summary || "";
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const links = data.links || {};

  return {
    showSummary: hasText(summary),
    showExperience: hasItems(experience),
    showEducation: hasItems(education),
    showSkills: hasItems(skills),
    showLanguages: hasItems(languages),
    showSkillsAndLanguages: hasItems(skills) || hasItems(languages),
    showLinks: Boolean(
      links.linkedin || links.github || links.portfolio,
    ),
  };
};

export { hasItems, hasText };
