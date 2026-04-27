import { getSectionVisibility } from "../utils/resumeSectionVisibility";

const SectionHeading = ({ eyebrow, title }) => (
  <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-600">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 via-slate-300 to-transparent" />
  </div>
);

const EngineeringTemplate = ({ data }) => {
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

  const linkEntries = [
    { label: "LinkedIn", value: links.linkedin },
    { label: "GitHub", value: links.github },
    { label: "Portfolio", value: links.portfolio },
  ].filter((entry) => entry.value);

  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <div className="border-b border-cyan-500/30 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_38%),linear-gradient(135deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] px-10 py-10">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {personalInfo.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>

          {showLinks ? (
            <div className="min-w-[190px] rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
                Profiles
              </p>
              <div className="mt-3 space-y-2 text-xs text-slate-200">
                {linkEntries.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2"
                  >
                    <p className="font-semibold text-white">{entry.label}</p>
                    <p className="mt-1 truncate text-slate-400">{entry.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[1.7fr_0.9fr] gap-8 px-10 py-8">
        <main className="space-y-8">
          {showSummary ? (
            <section className="rounded-3xl border border-white/10 bg-white px-7 py-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
              <SectionHeading eyebrow="Overview" title="Professional Summary" />
              <p className="text-sm leading-7 text-slate-600">{summary}</p>
            </section>
          ) : null}

          {showExperience ? (
            <section className="rounded-3xl border border-white/10 bg-white px-7 py-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
              <SectionHeading eyebrow="Build" title="Experience" />
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-cyan-700">
                          {exp.company}
                        </p>
                      </div>
                      <div className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-700">
                        Role
                      </div>
                    </div>
                    {exp.description && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {showEducation ? (
            <section className="rounded-3xl border border-white/10 bg-white px-7 py-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
              <SectionHeading eyebrow="Learn" title="Education" />
              <div className="grid gap-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 px-5 py-4"
                  >
                    <h3 className="text-base font-semibold text-slate-900">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        <aside className="space-y-6">
          {showSkills ? (
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <SectionHeading eyebrow="Stack" title="Skills" />
              <div className="flex flex-wrap gap-2 skills-tags">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {showLanguages ? (
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <SectionHeading eyebrow="Global" title="Languages" />
              <div className="space-y-3">
                {languages.map((language, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default EngineeringTemplate;
