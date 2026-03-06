import { useSelector } from "react-redux";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";

const ResumePreview = () => {
  const { currentResume, selectedTemplate } = useSelector(
    (state) => state.resume,
  );

  const templateToRender = currentResume?.template ?? selectedTemplate;

  const renderTemplate = () => {
    switch (templateToRender) {
      case "modern":
        return <ModernTemplate data={currentResume} />;
      case "minimal":
        return <MinimalTemplate data={currentResume} />;
      case "professional":
        return <ProfessionalTemplate data={currentResume} />;
      default:
        return <ModernTemplate data={currentResume} />;
    }
  };

  return (
    <div id="preview-container"className="flex justify-center bg-gray-200 min-h-screen p-10">
      <div
        id="resume-preview"
        className="w-[794px] h-[1123px] bg-white shadow-lg"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
