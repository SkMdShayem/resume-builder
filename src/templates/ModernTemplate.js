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
          <div className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Summary</h2>
            <p className="text-slate-600 leading-relaxed">{summary || "No summary provided."}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Experience</h2>
            {experience.length ? (
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
            ) : (
              <p className="text-sm text-gray-500">No experience added yet.</p>
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Education</h2>
            {education.length ? (
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
            ) : (
              <p className="text-sm text-gray-500">No education added yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Skills & Languages</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Skills</h3>
                {skills.length ? (
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
                ) : (
                  <p className="text-sm text-gray-500">No skills added yet.</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Languages</h3>
                {languages.length ? (
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
                ) : (
                  <p className="text-sm text-gray-500">No languages added yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModernTemplate;