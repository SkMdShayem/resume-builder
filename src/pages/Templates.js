import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import AtsOptimizedTemplate from "../templates/AtsOptimizedTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import AcademicTemplate from "../templates/AcademicTemplate";
import EngineeringTemplate from "../templates/EngineeringTemplate";
import TechnicalTemplate from "../templates/TechnicalTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import { useDispatch } from "react-redux";
import { setTemplate } from "../app/resumeSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { sampleResume } from "../constants/sampleResume";
import normalizeResumeData from "../utils/normalizeResumeData";
import TemplateCard from "../components/TemplateCard";

const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const normalizedSample = normalizeResumeData(sampleResume);
  const previewResume = {
    ...normalizedSample,
    personalInfo: {
      ...normalizedSample.personalInfo,
      name: sampleResume.personalInfo?.name || "John Doe",
    },
  };

  const templates = [
    {
      id: "modern",
      name: "Modern",
      component: ModernTemplate,
      description: "Bold gradients and polished cards for contemporary roles.",
      accent: "from-cyan-500 to-blue-600",
      tag: "Popular",
    },
    {
      id: "minimal",
      name: "Minimal",
      component: MinimalTemplate,
      description: "Quiet, clean spacing that keeps the focus on your content.",
      accent: "from-slate-300 to-slate-500",
      tag: "Simple",
    },
    {
      id: "professional",
      name: "Professional",
      component: ProfessionalTemplate,
      description: "Structured and confident for business-facing applications.",
      accent: "from-slate-700 to-slate-950",
      tag: "Business",
    },
    {
      id: "executive",
      name: "Executive",
      component: ExecutiveTemplate,
      description: "High-trust layout tailored for senior leadership profiles.",
      accent: "from-indigo-700 to-slate-900",
      tag: "Leadership",
    },
    {
      id: "ats-optimized",
      name: "ATS Optimized",
      component: AtsOptimizedTemplate,
      description: "Streamlined formatting designed for maximum parser clarity.",
      accent: "from-stone-500 to-slate-800",
      tag: "ATS",
    },
    {
      id: "creative",
      name: "Creative",
      component: CreativeTemplate,
      description: "Expressive visual rhythm for design-forward applications.",
      accent: "from-orange-500 to-rose-600",
      tag: "Creative",
    },
    {
      id: "academic",
      name: "Academic",
      component: AcademicTemplate,
      description: "Roomy and research-friendly for education-heavy resumes.",
      accent: "from-blue-600 to-indigo-700",
      tag: "Research",
    },
    {
      id: "engineering",
      name: "Engineering",
      component: EngineeringTemplate,
      description:
        "A sharper dev-first layout with stronger hierarchy and side-panel organization.",
      accent: "from-cyan-500 to-slate-950",
      tag: "New",
    },
    {
      id: "technical",
      name: "Technical",
      component: TechnicalTemplate,
      description: "Terminal-inspired styling for a classic engineering resume look.",
      accent: "from-emerald-500 to-slate-900",
      tag: "Code",
    },
    {
      id: "classic",
      name: "Classic",
      component: ClassicTemplate,
      description: "Timeless typography and balance for broad job markets.",
      accent: "from-slate-500 to-slate-700",
      tag: "Classic",
    },
  ];

  const handleSelect = (template) => {
    localStorage.removeItem("editingResume");
    dispatch(setTemplate(template.id));
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.45),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Resume Gallery
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            Choose a template that matches the story you want to tell
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start with a polished layout, then customize the content in the builder.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              previewResume={previewResume}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
