import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const AtsOptimizedTemplate = ({ data }) => {
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
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-light tracking-widest text-gray-900">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="mb-3 h-px w-full bg-gray-300" />
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data?.personalInfo?.phone && <span>&bull;</span>}
          {data?.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data?.personalInfo?.location && <span>&bull;</span>}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        {showLinks ? (
          <div className="mt-2 flex gap-3 text-xs text-gray-600">
            {data?.links?.linkedin && <span>{data.links.linkedin}</span>}
            {data?.links?.github && <span>&bull;</span>}
            {data?.links?.github && <span>{data.links.github}</span>}
          </div>
        ) : null}
      </div>

      {showSummary ? (
        <div className="mb-5">
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      ) : null}

      {showExperience ? (
        <div className="mb-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{exp.role}</span>
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
        <div className="mb-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-xs font-semibold">{edu.degree}</span>
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

      <div className="grid grid-cols-2 gap-4">
        {showSkills ? (
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
              Skills
            </h2>
            <div className="space-y-1">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="text-xs text-gray-700">
                  &bull; {skill}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {showLanguages ? (
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="text-xs text-gray-700">
                  &bull; {lang}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AtsOptimizedTemplate;
