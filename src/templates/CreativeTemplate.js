import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const CreativeTemplate = ({ data }) => {
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
  } = getSectionVisibility(data);

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-purple-50 to-blue-50 p-10 text-gray-900">
      <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
        <h1 className="mb-1 text-3xl font-bold">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data?.personalInfo?.phone && <span>&bull;</span>}
          {data?.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data?.personalInfo?.location && <span>&bull;</span>}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {showSummary ? (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold uppercase text-purple-600">
            About
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      ) : null}

      <div className="grid flex-1 grid-cols-2 gap-4">
        {showExperience ? (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase text-purple-600">
              Experience
            </h2>
            {data.experience.map((exp, idx) => (
              <div
                key={idx}
                className="mb-3 border-b border-gray-200 pb-3 last:border-b-0"
              >
                <span className="text-xs font-semibold text-gray-900">
                  {exp.role}
                </span>
                <span className="block text-xs text-gray-600">{exp.company}</span>
                {exp.description ? (
                  <p className="mt-1 text-xs text-gray-700">{exp.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {showEducation ? (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase text-blue-600">
              Education
            </h2>
            {data.education.map((edu, idx) => (
              <div
                key={idx}
                className="mb-3 border-b border-gray-200 pb-3 last:border-b-0"
              >
                <span className="text-xs font-semibold text-gray-900">
                  {edu.degree}
                </span>
                <span className="block text-xs text-gray-600">
                  {edu.institution}
                </span>
                {edu.description ? (
                  <p className="mt-1 text-xs text-gray-700">{edu.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {showSkills ? (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-bold uppercase text-purple-600">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded bg-gradient-to-r from-purple-200 to-blue-200 px-2 py-1 text-xs text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {showLanguages ? (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-bold uppercase text-blue-600">
              Languages
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="rounded bg-gradient-to-r from-blue-200 to-purple-200 px-2 py-1 text-xs text-gray-800"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreativeTemplate;
