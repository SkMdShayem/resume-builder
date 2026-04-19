import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import ResumePdfDocument from "../pdf/ResumePdfDocument";
import normalizeResumeData from "../utils/normalizeResumeData";

const ResumeBuilder = () => {
  const { currentResume, selectedTemplate } = useSelector(
    (state) => state.resume,
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);

    try {
      const template = currentResume?.template ?? selectedTemplate ?? "modern";
      const normalizedResume = normalizeResumeData(currentResume);
      const blob = await pdf(
        <ResumePdfDocument resume={normalizedResume} template={template} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${currentResume?.personalInfo?.name || "My_Resume"}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const form = document.getElementById("form-container");
    const preview = document.getElementById("preview-container");

    const handleScroll = () => {
      const percentage =
        form.scrollTop / (form.scrollHeight - form.clientHeight);

      preview.scrollTop =
        percentage * (preview.scrollHeight - preview.clientHeight);
    };

    form.addEventListener("scroll", handleScroll);

    return () => form.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex gap-8 p-10 pt-20">
        {/* FORM SIDE */}
        <div
          id="form-container"
          className="w-1/2 h-screen overflow-y-scroll pr-6"
        >
          <ResumeForm />
        </div>

        {/* PREVIEW SIDE */}
        <div className="w-1/2 flex justify-center">
          <div className="sticky top-10 w-full max-w-[720px]">
            <div className="mb-4 flex justify-end">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="bg-green-600 text-white px-6 py-2 rounded shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDownloading ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
