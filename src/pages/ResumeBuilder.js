import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle";
import { useEffect } from "react";
import Header from "../components/Header";

const ResumeBuilder = () => {
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");

    const options = {
      margin: 0,
      filename: "My_Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
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
          <div className="sticky top-10">
            <div className="scale-[0.75] origin-top">
              <ResumePreview />
              {/* DOWNLOAD BUTTON */}
              <button
                onClick={downloadPDF}
                className="fixed top-6 right-6 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
