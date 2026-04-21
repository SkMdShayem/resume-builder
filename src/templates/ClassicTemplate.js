import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const ClassicTemplate = ({ data }) => {
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
    showLinks,
  } = getSectionVisibility(data);

  return (
    <div className="flex h-full flex-col bg-white p-10 text-gray-900">
      <div className="mb-8 border-b-2 border-gray-400 pb-4">
        <h1 className="mb-1 text-3xl font-bold text-gray-900">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-700">
          {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data?.personalInfo?.phone && <span>&bull;</span>}
          {data?.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data?.personalInfo?.location && <span>&bull;</span>}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        {showLinks ? (
          <div className="mt-2 flex gap-3 text-xs text-gray-700">
            {data?.links?.linkedin && <span>{data.links.linkedin}</span>}
            {data?.links?.github && data?.links?.linkedin ? (
              <span>&bull;</span>
            ) : null}
            {data?.links?.github && <span>{data.links.github}</span>}
          </div>
        ) : null}
      </div>

      {showSummary ? (
        <div className="mb-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-900">
            Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      ) : null}

      {showExperience ? (
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <span className="text-xs font-semibold text-gray-900">
                  {exp.role}
                </span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description ? (
                <p className="mt-1 text-xs leading-relaxed text-gray-700">
                  {exp.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {showEducation ? (
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <span className="text-xs font-semibold text-gray-900">
                {edu.degree}
              </span>
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
            <h2 className="mb-2 font-bold uppercase tracking-wide text-gray-900">
              Skills
            </h2>
            <ul className="list-inside list-disc space-y-1">
              {data.skills.map((skill, idx) => (
                <li key={idx} className="text-gray-700">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {showLanguages ? (
          <div>
            <h2 className="mb-2 font-bold uppercase tracking-wide text-gray-900">
              Languages
            </h2>
            <ul className="list-inside list-disc space-y-1">
              {data.languages.map((lang, idx) => (
                <li key={idx} className="text-gray-700">
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClassicTemplate;
