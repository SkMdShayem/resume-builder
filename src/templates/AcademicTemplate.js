const AcademicTemplate = ({ data }) => {
  return (
    <div className="p-12 h-full flex flex-col bg-white text-gray-900 font-serif">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data?.personalInfo?.name || "Your Name"}
        </h1>
        <div className="flex justify-center gap-3 text-xs text-gray-600 flex-wrap">
          {data?.personalInfo?.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data?.personalInfo?.phone && (
            <span>|</span>
          )}
          {data?.personalInfo?.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data?.personalInfo?.location && (
            <span>|</span>
          )}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-6 text-center">
          <p className="text-xs leading-relaxed text-gray-700 italic">
            {data.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-900 mb-3 uppercase">
            EDUCATION
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{edu.degree}</span>
              </div>
              <span className="text-xs text-gray-600">{edu.institution}</span>
              {edu.description && (
                <p className="text-xs text-gray-700 mt-1">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-900 mb-3 uppercase">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{exp.role}</span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description && (
                <p className="text-xs text-gray-700 mt-1">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      <div className="flex gap-8 text-xs flex-1">
        {data?.skills && data.skills.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-2 uppercase">
              KEY SKILLS
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {data?.languages && data.languages.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-2 uppercase">
              LANGUAGES
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.languages.map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicTemplate;
