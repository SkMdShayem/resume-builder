import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const ExecutiveTemplate = ({ data }) => {
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
    showLinks,
  } = getSectionVisibility(data);

  return (
    <div className="flex h-full flex-col bg-white p-12 font-serif text-gray-900">
      <div className="mb-8 border-b-4 border-blue-900 pb-8">
        <h1 className="mb-2 text-4xl font-bold text-blue-900">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data?.personalInfo?.phone && <span>&bull;</span>}
          {data?.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data?.personalInfo?.location && <span>&bull;</span>}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        {showLinks ? (
          <div className="mt-2 flex gap-3 text-sm">
            {data?.links?.linkedin && (
              <span>LinkedIn: {data.links.linkedin}</span>
            )}
            {data?.links?.github && (
              <span>GitHub: {data.links.github}</span>
            )}
          </div>
        ) : null}
      </div>

      {showSummary ? (
        <div className="mb-8">
          <h2 className="mb-2 text-lg font-bold uppercase tracking-wide text-blue-900">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      ) : null}

            {showExperience ? (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-bold uppercase tracking-wide text-blue-900">
            Professional Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <span className="text-sm font-bold">{exp.role}</span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description ? (
                <p className="mt-1 text-xs leading-relaxed">
                  {exp.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {showEducation ? (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-bold uppercase tracking-wide text-blue-900">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <span className="text-sm font-bold">{edu.degree}</span>
              <span className="block text-xs text-gray-600">
                {edu.institution}
              </span>
              {edu.description ? (
                <p className="text-xs text-gray-700">{edu.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 gap-8 text-xs">
        {showSkills ? (
          <div>
            <h2 className="mb-2 font-bold uppercase tracking-wide text-blue-900">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 skills-tags">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="rounded bg-blue-100 px-2 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {showLanguages ? (
          <div>
            <h2 className="mb-2 font-bold uppercase tracking-wide text-blue-900">
              Languages
            </h2>
            <ul className="list-inside list-disc">
              {data.languages.map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
