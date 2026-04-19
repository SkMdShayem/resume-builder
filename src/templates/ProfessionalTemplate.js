import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const ProfessionalTemplate = ({ data }) => {
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
    showLinks,
  } = getSectionVisibility(data);

  return (
    <div className="max-w-5xl mx-auto min-h-full bg-white shadow-lg ring-1 ring-gray-200">
      <div className="min-h-[1123px] grid grid-cols-1 lg:grid-cols-3">
        <aside className="lg:col-span-1 bg-slate-900 text-white p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">{personalInfo.name}</h1>
            <p className="text-sm text-slate-200 mt-2">
              {personalInfo.email} · {personalInfo.phone}
            </p>
            <p className="text-sm text-slate-200 mt-1">{personalInfo.location}</p>
          </div>

          {showLinks && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Links
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {links.linkedin && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="text-slate-200">{links.linkedin}</span>
                  </li>
                )}
                {links.github && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="text-slate-200">{links.github}</span>
                  </li>
                )}
                {links.portfolio && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span className="text-slate-200">{links.portfolio}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {showSkills ? (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Skills
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {showLanguages ? (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Languages
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <main className="lg:col-span-2 p-10">
          {showSummary ? (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800">Professional Summary</h2>
              <p className="mt-3 text-slate-700 leading-relaxed">{summary}</p>
            </section>
          ) : null}

          {showExperience ? (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800">Experience</h2>
              <div className="mt-6 space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-6">
                    <p className="text-lg font-semibold text-slate-800">{exp.role}</p>
                    <p className="text-sm text-slate-500">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-slate-700 mt-3">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {showEducation ? (
            <section>
              <h2 className="text-2xl font-semibold text-slate-800">Education</h2>
              <div className="mt-6 space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-6">
                    <p className="text-lg font-semibold text-slate-800">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-sm text-slate-700 mt-3">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
