const MinimalistTemplate = ({ data }) => {
  return (
    <div className="p-10 h-full flex flex-col bg-white text-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light tracking-widest text-gray-900 mb-1">
          {data?.personalInfo?.name || "Your Name"}
        </h1>
        <div className="h-px w-full bg-gray-300 mb-3"></div>
        <div className="flex gap-3 text-xs text-gray-600 flex-wrap">
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
          <div className="flex gap-3 mt-2 text-xs text-gray-600">
            {data?.links?.linkedin && (
              <span>{data.links.linkedin}</span>
            )}
            {data?.links?.github && (
              <span>•</span>
            )}
            {data?.links?.github && (
              <span>{data.links.github}</span>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-5">
          <p className="text-xs leading-relaxed text-gray-700">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-widest">
            Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{exp.role}</span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description && (
                <p className="text-xs mt-1 text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-widest">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-xs font-semibold">{edu.degree}</span>
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

      {/* Two Column: Skills & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {data?.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-widest">
              Skills
            </h2>
            <div className="space-y-1">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="text-xs text-gray-700">
                  • {skill}
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-widest">
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="text-xs text-gray-700">
                  • {lang}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalistTemplate;
