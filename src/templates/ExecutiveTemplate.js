const ExecutiveTemplate = ({ data }) => {
  return (
    <div className="p-12 h-full flex flex-col bg-white text-gray-900 font-serif">
      {/* Header */}
      <div className="border-b-4 border-blue-900 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          {data?.personalInfo?.name || "Your Name"}
        </h1>
        <div className="flex gap-4 text-sm flex-wrap">
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
        {(data?.links?.linkedin || data?.links?.github) && (
          <div className="flex gap-3 mt-2 text-sm">
            {data?.links?.linkedin && (
              <span>LinkedIn: {data.links.linkedin}</span>
            )}
            {data?.links?.github && (
              <span>GitHub: {data.links.github}</span>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <span className="font-bold text-sm">{exp.role}</span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description && (
                <p className="text-xs mt-1 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <span className="font-bold text-sm">{edu.degree}</span>
              <span className="text-xs text-gray-600 block">
                {edu.institution}
              </span>
              {edu.description && (
                <p className="text-xs text-gray-700">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      <div className="flex gap-8 text-xs flex-1">
        {data?.skills && data.skills.length > 0 && (
          <div>
            <h2 className="font-bold text-blue-900 mb-2 uppercase tracking-wide">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-100 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {data?.languages && data.languages.length > 0 && (
          <div>
            <h2 className="font-bold text-blue-900 mb-2 uppercase tracking-wide">
              Languages
            </h2>
            <ul className="list-disc list-inside">
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

export default ExecutiveTemplate;
