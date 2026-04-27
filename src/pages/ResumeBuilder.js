import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Header from "../components/Header";

const ResumeBuilder = () => {
  const { currentResume } = useSelector((state) => state.resume);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);

    try {
      const resumeNode = document.getElementById("resume-preview");
      if (!resumeNode) {
        alert("Resume preview not found");
        setIsDownloading(false);
        return;
      }

      const resumeTitle = currentResume?.personalInfo?.name || "My_Resume";

      // Add temporary styles to the document head
      const style = document.createElement("style");
      style.id = "pdf-download-style";
      style.innerHTML = `
        .skills-tags, .languages-tags {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        
        .skills-tags span, .languages-tags span {
          display: list-item !important;
          list-style-type: disc !important;
          margin-left: 20px !important;
          background-color: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
      `;
      document.head.appendChild(style);

      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the resume as a canvas
      const canvas = await html2canvas(resumeNode, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
      });

      // Remove temporary styles
      document.head.removeChild(style);

      // Get canvas dimensions
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF, creating new pages as needed
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save(`${resumeTitle}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const form = document.getElementById("form-container");
    const preview = document.getElementById("preview-container");

    if (!form || !preview) {
      return undefined;
    }

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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-8 p-10 pt-20">
        <div
          id="form-container"
          className="h-screen w-1/2 overflow-y-scroll pr-6"
        >
          <ResumeForm />
        </div>

        <div className="flex w-1/2 justify-center">
          <div className="sticky top-10 w-full max-w-[720px]">
            <div className="mb-4 flex justify-end">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="rounded bg-green-600 px-6 py-2 text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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
