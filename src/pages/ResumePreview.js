import { useSelector } from "react-redux";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import AtsOptimizedTemplate from "../templates/AtsOptimizedTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import AcademicTemplate from "../templates/AcademicTemplate";
import EngineeringTemplate from "../templates/EngineeringTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import normalizeResumeData from "../utils/normalizeResumeData";

const ResumePreview = () => {
  const { currentResume, selectedTemplate } = useSelector(
    (state) => state.resume,
  );

  const templateToRender = currentResume?.template ?? selectedTemplate;
  const normalizedResume = normalizeResumeData(currentResume);

  const renderTemplate = () => {
    switch (templateToRender) {
      case "modern":
        return <ModernTemplate data={normalizedResume} />;
      case "minimal":
        return <MinimalTemplate data={normalizedResume} />;
      case "professional":
        return <ProfessionalTemplate data={normalizedResume} />;
      case "executive":
        return <ExecutiveTemplate data={normalizedResume} />;
      case "ats-optimized":
        return <AtsOptimizedTemplate data={normalizedResume} />;
      case "creative":
        return <CreativeTemplate data={normalizedResume} />;
      case "academic":
        return <AcademicTemplate data={normalizedResume} />;
      case "engineering":
        return <EngineeringTemplate data={normalizedResume} />;
      case "technical":
        return <EngineeringTemplate data={normalizedResume} />;
      case "classic":
        return <ClassicTemplate data={normalizedResume} />;
      default:
        return <ModernTemplate data={normalizedResume} />;
    }
  };

  return (
    <div
      id="preview-container"
      className="flex justify-center bg-gray-200 min-h-screen p-4 md:p-6"
    >
      <div
        id="resume-preview"
        className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-lg overflow-hidden"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
