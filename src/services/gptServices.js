const LOCALHOST_AI_ENDPOINT = "http://localhost:8787/api/improve-summary";
const LOOPBACK_AI_ENDPOINT = "http://127.0.0.1:8787/api/improve-summary";
const LOCALHOST_AI_HEALTH_ENDPOINT = "http://localhost:8787/health";
const LOOPBACK_AI_HEALTH_ENDPOINT = "http://127.0.0.1:8787/health";

const buildEndpointCandidates = (...endpoints) =>
  [...new Set(endpoints.filter((endpoint) => Boolean(endpoint)))];

export const AI_ENDPOINT = process.env.REACT_APP_AI_ENDPOINT || LOCALHOST_AI_ENDPOINT;
export const AI_HEALTH_ENDPOINT =
  process.env.REACT_APP_AI_HEALTH_ENDPOINT || LOCALHOST_AI_HEALTH_ENDPOINT;
export const AI_ENDPOINTS = buildEndpointCandidates(
  AI_ENDPOINT,
  LOCALHOST_AI_ENDPOINT,
  LOOPBACK_AI_ENDPOINT,
);
export const AI_HEALTH_ENDPOINTS = buildEndpointCandidates(
  AI_HEALTH_ENDPOINT,
  LOCALHOST_AI_HEALTH_ENDPOINT,
  LOOPBACK_AI_HEALTH_ENDPOINT,
);

const getErrorMessage = (data, status) => {
  if (data?.error && typeof data.error === "string") {
    return data.error;
  }

  if (data?.message && typeof data.message === "string") {
    return data.message;
  }

  return `AI request failed with status ${status}.`;
};

const parseImproveResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  const improvedSummary = data?.result || data?.summary;
  if (typeof improvedSummary !== "string" || !improvedSummary.trim()) {
    throw new Error("AI service returned an empty summary.");
  }

  return improvedSummary.trim();
};

const improveSummary = async (summary) => {
  const trimmedSummary = summary?.trim();
  if (!trimmedSummary) {
    throw new Error("Add a summary first, then click Improve with AI.");
  }

  for (const endpoint of AI_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: trimmedSummary }),
      });

      return await parseImproveResponse(response);
    } catch (error) {
      if (error instanceof Error && error.name === "TypeError") {
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    `Could not reach AI service. Tried: ${AI_ENDPOINTS.join(", ")}. Start the AI server and check REACT_APP_AI_ENDPOINT.`,
  );
};

export default improveSummary;
