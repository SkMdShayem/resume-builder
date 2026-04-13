import { useSelector } from "react-redux";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import AtsOptimizedTemplate from "../templates/AtsOptimizedTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import AcademicTemplate from "../templates/AcademicTemplate";
import TechnicalTemplate from "../templates/TechnicalTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";

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
      case "executive":
        return <ExecutiveTemplate data={currentResume} />;
      case "ats-optimized":
        return <AtsOptimizedTemplate data={currentResume} />;
      case "creative":
        return <CreativeTemplate data={currentResume} />;
      case "academic":
        return <AcademicTemplate data={currentResume} />;
      case "technical":
        return <TechnicalTemplate data={currentResume} />;
      case "classic":
        return <ClassicTemplate data={currentResume} />;
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
