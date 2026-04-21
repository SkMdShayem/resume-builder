import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const AcademicTemplate = ({ data }) => {
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
  } = getSectionVisibility(data);

  return (
    <div className="flex h-full flex-col bg-white p-12 font-serif text-gray-900">
      <div className="mb-8 text-center">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          {data?.personalInfo?.name || ""}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {data?.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data?.personalInfo?.phone && <span>|</span>}
          {data?.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data?.personalInfo?.location && <span>|</span>}
          {data?.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {showSummary ? (
        <div className="mb-6 text-center">
          <p className="text-xs italic leading-relaxed text-gray-700">
            {data.summary}
          </p>
        </div>
      ) : null}

      {showEducation ? (
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-900">
            EDUCATION
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{edu.degree}</span>
              </div>
              <span className="text-xs text-gray-600">{edu.institution}</span>
              {edu.description ? (
                <p className="mt-1 text-xs text-gray-700">{edu.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {showExperience ? (
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-900">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <span className="text-xs font-semibold">{exp.role}</span>
              </div>
              <span className="text-xs text-gray-600">{exp.company}</span>
              {exp.description ? (
                <p className="mt-1 text-xs text-gray-700">{exp.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 gap-8 text-xs">
        {showSkills ? (
          <div>
            <h2 className="mb-2 font-bold uppercase text-gray-900">
              KEY SKILLS
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {showLanguages ? (
          <div>
            <h2 className="mb-2 font-bold uppercase text-gray-900">
              LANGUAGES
            </h2>
            <ul className="list-disc list-inside text-gray-700">
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

export default AcademicTemplate;
