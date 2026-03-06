import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import TemplateCard from "../components/TemplateCard";
import { useDispatch } from "react-redux";
import { setTemplate } from "../app/resumeSlice";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const templates = [
    { id: "modern", component: ModernTemplate },
    { id: "minimal", component: MinimalTemplate },
    { id: "professional", component: ProfessionalTemplate },
  ];

  const handleSelect = (template) => {
    // Clear any previous editing state so selecting a template starts fresh
    localStorage.removeItem("editingResume");
    dispatch(setTemplate(template.id));
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">
        Choose Your Resume Template
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            templateComponent={template.component}
            onSelect={() => handleSelect(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default Templates;