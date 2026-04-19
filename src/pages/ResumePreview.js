import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import ResumePdfDocument from "../pdf/ResumePdfDocument";
import normalizeResumeData from "../utils/normalizeResumeData";

const ResumePreview = () => {
  const { currentResume, selectedTemplate } = useSelector(
    (state) => state.resume,
  );
  const [previewUrl, setPreviewUrl] = useState("");

  const templateToRender = currentResume?.template ?? selectedTemplate ?? "modern";
  const normalizedResume = normalizeResumeData(currentResume);
  const resumeSignature = JSON.stringify(normalizedResume);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = "";

    const generatePreview = async () => {
      const resumeData = JSON.parse(resumeSignature);

      try {
        const blob = await pdf(
          <ResumePdfDocument
            resume={resumeData}
            template={templateToRender}
          />,
        ).toBlob();

        objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setPreviewUrl((currentUrl) => {
            if (currentUrl) {
              URL.revokeObjectURL(currentUrl);
            }

            return objectUrl;
          });
        } else {
          URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        if (isMounted) {
          setPreviewUrl("");
        }
      }
    };

    generatePreview();

    return () => {
      isMounted = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [resumeSignature, templateToRender]);

  return (
    <div
      id="preview-container"
      className="flex justify-center bg-gray-200 min-h-screen p-4 md:p-6"
    >
      <div
        id="resume-preview"
        className="w-full max-w-[794px] min-h-[1123px] overflow-hidden rounded bg-white shadow-lg"
      >
        {previewUrl ? (
          <iframe
            title="Resume PDF Preview"
            src={previewUrl}
            className="h-[1123px] w-full border-0"
          />
        ) : (
          <div className="flex h-[1123px] items-center justify-center text-sm text-gray-500">
            Generating preview...
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
