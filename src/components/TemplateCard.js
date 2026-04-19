import { sampleResume } from "../constants/sampleResume";

const TemplateCard = ({ template, previewResume = sampleResume, onSelect }) => {
  const {
    name,
    component: Template,
    description,
    accent = "from-blue-500 to-indigo-600",
    tag = "Template",
  } = template;

  return (
    <div
      onClick={() => onSelect(template)}
      className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl"
    >
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${accent} opacity-95`} />
      <div className="relative p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
              {tag}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-slate-950">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 shadow-inner">
          <div className="border-b border-slate-200 bg-white px-4 py-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">
              Full Preview
            </span>
          </div>
          <div className="relative flex h-[26rem] items-start justify-center overflow-hidden bg-[linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] p-4">
            <div
              className="pointer-events-none absolute left-1/2 top-4 transition duration-300 group-hover:scale-[0.37]"
              style={{
                width: "794px",
                height: "1123px",
                transform: "translateX(-50%) scale(0.36)",
                transformOrigin: "top center",
              }}
            >
              <div className="h-[1123px] w-[794px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                <Template data={previewResume} />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(template);
          }}
          className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Use {name}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
