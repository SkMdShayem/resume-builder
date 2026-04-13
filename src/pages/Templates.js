import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import AtsOptimizedTemplate from "../templates/AtsOptimizedTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import AcademicTemplate from "../templates/AcademicTemplate";
import TechnicalTemplate from "../templates/TechnicalTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import { useDispatch } from "react-redux";
import { setTemplate } from "../app/resumeSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const templates = [
    { id: "modern", name: "Modern", component: ModernTemplate },
    { id: "minimal", name: "Minimal", component: MinimalTemplate },
    { id: "professional", name: "Professional", component: ProfessionalTemplate },
    { id: "executive", name: "Executive", component: ExecutiveTemplate },
    { id: "ats-optimized", name: "ATS Optimized", component: AtsOptimizedTemplate },
    { id: "creative", name: "Creative", component: CreativeTemplate },
    { id: "academic", name: "Academic", component: AcademicTemplate },
    { id: "technical", name: "Technical", component: TechnicalTemplate },
    { id: "classic", name: "Classic", component: ClassicTemplate },
  ];

  const handleSelect = (template) => {
    // Clear any previous editing state so selecting a template starts fresh
    localStorage.removeItem("editingResume");
    dispatch(setTemplate(template.id));
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-3">
          Choose Your Resume Template
        </h1>
        <p className="text-gray-600 mb-8">
          Select from our professionally designed templates to get started
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => handleSelect(template)}
            >
              <div className="h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                <div className="scale-[0.4] origin-top-left w-[250%]">
                  <template.component data={null} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <button
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(template);
                  }}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;