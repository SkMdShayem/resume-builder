import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const MinimalTemplate = ({ data }) => {
  const {
    personalInfo = {},
    links = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    languages = [],
  } = data || {};
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
    showSkillsAndLanguages,
  } = getSectionVisibility(data);

  return (
    <div className="max-w-5xl mx-auto bg-white p-10 min-h-full shadow-md ring-1 ring-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
        <p className="text-gray-600 mt-2">
          {personalInfo.email} · {personalInfo.phone} · {personalInfo.location}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          {links.linkedin && (
            <span className="px-3 py-1 rounded-full bg-gray-100">LinkedIn: {links.linkedin}</span>
          )}
          {links.github && (
            <span className="px-3 py-1 rounded-full bg-gray-100">GitHub: {links.github}</span>
          )}
          {links.portfolio && (
            <span className="px-3 py-1 rounded-full bg-gray-100">Portfolio: {links.portfolio}</span>
          )}
        </div>
      </header>

      {showSummary ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      ) : null}

      {showExperience ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="rounded-lg border border-gray-100 p-4">
                <p className="font-semibold text-gray-800">{exp.role}</p>
                <p className="text-sm text-gray-500">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showEducation ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-5">
            {education.map((edu, i) => (
              <div key={i} className="rounded-lg border border-gray-100 p-4">
                <p className="font-semibold text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.institution}</p>
                {edu.description && (
                  <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showSkillsAndLanguages ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showSkills ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {showLanguages ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
};

export default MinimalTemplate;
