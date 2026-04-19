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
    <div className="p-10 h-full flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900">
      {/* Header with accent */}
      <div className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-1">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="flex gap-3 text-xs mt-3 flex-wrap">
          {data?.personalInfo?.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data?.personalInfo?.phone && (
            <span>•</span>
          )}
          {data?.personalInfo?.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data?.personalInfo?.location && (
            <span>•</span>
          )}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {showSummary && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-sm font-bold text-purple-600 mb-2 uppercase">
            About
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience & Education Side by Side */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Experience */}
        {showExperience && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-sm font-bold text-purple-600 mb-3 uppercase">
              Experience
            </h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                <span className="text-xs font-semibold text-gray-900">
                  {exp.role}
                </span>
                <span className="text-xs text-gray-600 block">
                  {exp.company}
                </span>
                {exp.description && (
                  <p className="text-xs text-gray-700 mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {showEducation && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-sm font-bold text-blue-600 mb-3 uppercase">
              Education
            </h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                <span className="text-xs font-semibold text-gray-900">
                  {edu.degree}
                </span>
                <span className="text-xs text-gray-600 block">
                  {edu.institution}
                </span>
                {edu.description && (
                  <p className="text-xs text-gray-700 mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {showSkills && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-sm font-bold text-purple-600 mb-2 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-purple-200 to-blue-200 text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {showLanguages && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-sm font-bold text-blue-600 mb-2 uppercase">
              Languages
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
