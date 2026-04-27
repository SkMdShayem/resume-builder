import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import Header from "../components/Header";
import {
  AI_ENDPOINTS,
  AI_HEALTH_ENDPOINTS,
} from "../services/gptServices";

const ResumeBuilder = () => {
  const { currentResume } = useSelector((state) => state.resume);
  const [isDownloading, setIsDownloading] = useState(false);
  const [aiHealth, setAiHealth] = useState({
    checked: false,
    reachable: true,
    keyConfigured: true,
    activeHealthEndpoint: "",
  });

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
    let isMounted = true;

    const checkAiHealth = async () => {
      for (const endpoint of AI_HEALTH_ENDPOINTS) {
        try {
          const response = await fetch(endpoint);
          const data = await response.json().catch(() => null);

          if (!response.ok) {
            throw new Error(`Health check failed (${response.status}).`);
          }

          if (isMounted) {
            setAiHealth({
              checked: true,
              reachable: true,
              keyConfigured: Boolean(data?.openAiKeyConfigured),
              activeHealthEndpoint: endpoint,
            });
          }

          return;
        } catch {
          continue;
        }
      }

      if (isMounted) {
        setAiHealth({
          checked: true,
          reachable: false,
          keyConfigured: false,
          activeHealthEndpoint: "",
        });
      }
    };
    checkAiHealth();

    return () => {
      isMounted = false;
    };
  }, []);

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
      {aiHealth.checked && !aiHealth.reachable ? (
        <div className="mx-10 mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          AI server is offline. Start it with <code>npm run ai-server</code>. Tried
          health checks at <code>{AI_HEALTH_ENDPOINTS.join(", ")}</code> and summary
          endpoints at <code>{AI_ENDPOINTS.join(", ")}</code>.
        </div>
      ) : null}
      {aiHealth.checked && aiHealth.reachable && !aiHealth.keyConfigured ? (
        <div className="mx-10 mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          AI server is running, but <code>OPENAI_API_KEY</code> is missing. Add it to
          <code> .env </code> in the project root, then restart
          <code> npm run ai-server</code>.
        </div>
      ) : null}
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
