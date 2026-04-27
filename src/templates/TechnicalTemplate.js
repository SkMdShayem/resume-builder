const TechnicalTemplate = ({ data }) => {
  return (
    <div className="p-10 h-full flex flex-col bg-gray-900 text-gray-100 font-mono">
      {/* Header */}
      <div className="mb-6 border-b-2 border-green-400 pb-4">
        <h1 className="text-2xl font-bold text-green-400 mb-1 font-sans">
          {data?.personalInfo?.name}
        </h1>
        <div className="text-xs text-gray-400 space-y-1">
          {data?.personalInfo?.email && (
            <div>$ email: {data.personalInfo.email}</div>
          )}
          {data?.personalInfo?.phone && (
            <div>$ phone: {data.personalInfo.phone}</div>
          )}
          {data?.personalInfo?.location && (
            <div>$ location: {data.personalInfo.location}</div>
          )}
          {data?.links?.linkedin && (
            <div>$ linkedin: {data.links.linkedin}</div>
          )}
          {data?.links?.github && (
            <div>$ github: {data.links.github}</div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-6">
          <p className="text-xs text-green-400 mb-1">{`//`} Professional Summary</p>
          <p className="text-xs text-gray-300 leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-green-400 mb-2">
            {`// Experience []`}
          </p>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-3 ml-2 border-l-2 border-green-400 pl-2">
              <span className="text-xs text-green-400 font-semibold">
                {exp.role}
              </span>
              <span className="text-xs text-gray-400 block">
                @ {exp.company}
              </span>
              {exp.description && (
                <p className="text-xs text-gray-400 mt-1">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-green-400 mb-2">
            {`// Education []`}
          </p>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3 ml-2">
              <span className="text-xs text-green-400 font-semibold">
                {edu.degree}
              </span>
              <span className="text-xs text-gray-400 block">
                @ {edu.institution}
              </span>
              {edu.description && (
                <p className="text-xs text-gray-400 mt-1">
                  {edu.description}
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
            <p className="text-xs text-green-400 mb-2">{`// Skills []`}</p>
            <div className="space-y-1">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="text-gray-300">
                  &bull; {skill}
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.languages && data.languages.length > 0 && (
          <div>
            <p className="text-xs text-green-400 mb-2">{`// Languages []`}</p>
            <div className="space-y-1">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="text-gray-300">
                  &bull; {lang}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalTemplate;
