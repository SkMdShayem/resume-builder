import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const ModernTemplate = ({ data }) => {
  const {
    personalInfo = {},
    links = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    languages = [],
  } = data || {};
  const {
    showSummary,
    showExperience,
    showEducation,
    showSkills,
    showLanguages,
    showSkillsAndLanguages,
  } = getSectionVisibility(data);

  return (
    <div className="max-w-5xl mx-auto min-h-full bg-white shadow-xl ring-1 ring-gray-200">
      <header className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {links.linkedin && (
              <span className="rounded-full bg-white/15 px-3 py-1">LinkedIn</span>
            )}
            {links.github && (
              <span className="rounded-full bg-white/15 px-3 py-1">GitHub</span>
            )}
            {links.portfolio && (
              <span className="rounded-full bg-white/15 px-3 py-1">Portfolio</span>
            )}
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
        <section className="space-y-8">
          {showSummary ? (
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Summary</h2>
              <p className="text-slate-600 leading-relaxed">{summary}</p>
            </div>
          ) : null}

          {showExperience ? (
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-lg font-semibold text-slate-800">{exp.role}</p>
                    <p className="text-sm text-slate-500">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-slate-600">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="space-y-8">
          {showEducation ? (
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-lg font-semibold text-slate-800">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-sm text-slate-600">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {showSkillsAndLanguages ? (
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Skills & Languages</h2>
              <div className="grid grid-cols-2 gap-6">
                {showSkills ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {showLanguages ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ModernTemplate;
