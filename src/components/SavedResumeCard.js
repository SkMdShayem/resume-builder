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

const templateMap = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  "ats-optimized": AtsOptimizedTemplate,
  creative: CreativeTemplate,
  academic: AcademicTemplate,
  engineering: EngineeringTemplate,
  technical: EngineeringTemplate,
  classic: ClassicTemplate,
};

const SavedResumeCard = ({ resume, onEdit, onDelete }) => {
  const Template = templateMap[resume.template] || ModernTemplate;
  const normalizedResume = normalizeResumeData(resume.data);
  const templateName = resume.template
    ? resume.template
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "No template";

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white w-56 h-[318px] flex flex-col">
      <div className="p-3">
        <div className="mb-2">
          <h3 className="text-sm font-semibold truncate">
            {normalizedResume.personalInfo.name || "Untitled"}
          </h3>
          <p className="text-[10px] text-gray-500 truncate">
            {resume.template ? `${templateName} Template` : "No template"}
          </p>
        </div>
      </div>

      <div className="flex-1 relative rounded border overflow-hidden m-3" style={{ width: 200, height: 283 }}>
        <div
          className="absolute top-0 left-0"
          style={{
            transform: "scale(0.25)",
            transformOrigin: "top left",
            width: 794,
            height: 1123,
          }}
        >
          <div className="w-[794px] h-[1123px] bg-white">
            <Template data={normalizedResume} />
          </div>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between gap-2">
        <button
          onClick={() => onEdit(resume)}
          className="flex-1 text-xs bg-blue-500 text-white px-2 py-1 rounded"
        >
          View / Edit
        </button>
        <button
          onClick={() => onDelete(resume.id)}
          className="flex-1 text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SavedResumeCard;
