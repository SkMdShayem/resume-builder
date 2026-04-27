import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    let exportRoot = null;

    try {
      const resumeNode = document.getElementById("resume-preview");
      if (!resumeNode) {
        alert("Resume preview not found");
        return;
      }

      const resumeTitle = currentResume?.personalInfo?.name || "My_Resume";
      const safeResumeTitle = resumeTitle
        .trim()
        .replace(/[\\/:*?"<>|]+/g, "_")
        .replace(/\s+/g, "_");
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Render an offscreen fixed-width clone so export always uses A4 layout.
      exportRoot = document.createElement("div");
      exportRoot.style.position = "fixed";
      exportRoot.style.left = "-10000px";
      exportRoot.style.top = "0";
      exportRoot.style.width = "794px";
      exportRoot.style.zIndex = "-1";
      exportRoot.style.background = "#ffffff";

      const clonedResume = resumeNode.cloneNode(true);
      if (!(clonedResume instanceof HTMLElement)) {
        throw new Error("Unable to clone resume preview.");
      }

      clonedResume.style.width = "794px";
      clonedResume.style.maxWidth = "794px";
      clonedResume.style.boxShadow = "none";
      exportRoot.appendChild(clonedResume);
      document.body.appendChild(exportRoot);

      const canvas = await html2canvas(clonedResume, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Split by page-sized canvas chunks to avoid floating point blank pages.
      const sourcePageHeight = Math.round((canvas.width * pageHeight) / pageWidth);
      const tinyRemainderThreshold = 12;

      let renderedHeight = 0;
      let pageIndex = 0;

      while (renderedHeight < canvas.height) {
        const remainingHeight = canvas.height - renderedHeight;
        const shouldMergeTinyRemainder =
          remainingHeight <= sourcePageHeight + tinyRemainderThreshold;

        const pageCanvas = document.createElement("canvas");
        const currentSliceHeight = shouldMergeTinyRemainder
          ? remainingHeight
          : sourcePageHeight;
        const isFullPageSlice = currentSliceHeight >= sourcePageHeight;
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSliceHeight;

        const pageContext = pageCanvas.getContext("2d");
        if (!pageContext) {
          throw new Error("Unable to create PDF page context.");
        }

        pageContext.drawImage(
          canvas,
          0,
          renderedHeight,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height,
        );

        const pageImageData = pageCanvas.toDataURL("image/png");
        const pageImageHeight = isFullPageSlice
          ? pageHeight
          : (pageCanvas.height * pageWidth) / pageCanvas.width;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(pageImageData, "PNG", 0, 0, pageWidth, pageImageHeight);

        renderedHeight += currentSliceHeight;
        pageIndex += 1;
      }

      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${safeResumeTitle || "My_Resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      if (exportRoot && exportRoot.parentNode) {
        exportRoot.parentNode.removeChild(exportRoot);
      }
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
