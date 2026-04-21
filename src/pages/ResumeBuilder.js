import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ResumeBuilder = () => {
  const { currentResume } = useSelector((state) => state.resume);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);

    try {
      const resumeNode = document.getElementById("resume-preview");
      if (!resumeNode) {
        return;
      }

      const printWindow = window.open("", "_blank", "width=900,height=1200");
      if (!printWindow) {
        return;
      }

      const styleMarkup = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]'),
      )
        .map((node) => node.outerHTML)
        .join("\n");
      const resumeTitle = currentResume?.personalInfo?.name || "My_Resume";

      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${resumeTitle}</title>
            ${styleMarkup}
            <style>
              @page {
                size: A4;
                margin: 0;
              }

              html, body {
                margin: 0;
                padding: 0;
                background: #ffffff;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              body {
                display: flex;
                justify-content: center;
              }

              #print-root {
                width: 794px;
                min-height: 1123px;
                margin: 0 auto;
                background: #ffffff;
                overflow: hidden;
              }

              #print-root * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            </style>
          </head>
          <body>
            <div id="print-root">${resumeNode.innerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();

      const handlePrint = () => {
        printWindow.focus();
        printWindow.print();
      };

      printWindow.onload = () => {
        setTimeout(handlePrint, 250);
      };
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
                {isDownloading ? "Preparing PDF..." : "Save as PDF"}
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
