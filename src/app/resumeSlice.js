import { createSlice } from "@reduxjs/toolkit";

const getInitialTemplate = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("selectedTemplate");
};

const initialState = {
  resumes: [],
  selectedTemplate: getInitialTemplate(),
  currentResume: {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    addResume: (state, action) => {
      state.resumes.push(action.payload);
    },
    updateResume: (state, action) => {
      const index = state.resumes.findIndex(
        (resume) => resume.id === action.payload.id,
      );
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    setTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      state.currentResume.template = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedTemplate", action.payload);
      }
    },
    setCurrentResumeTemplate: (state, action) => {
      state.currentResume.template = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      state.currentResume.personalInfo = {
        ...state.currentResume.personalInfo,
        ...action.payload,
      };
    },
    updateLinks: (state, action) => {
      state.currentResume.links = {
        ...state.currentResume.links,
        ...action.payload,
      };
    },
    updateSummary: (state, action) => {
      state.currentResume.summary = action.payload;
    },
    addEducation: (state, action) => {
      state.currentResume.education.push(action.payload);
    },
    removeEducation: (state, action) => {
      state.currentResume.education.splice(action.payload, 1);
    },
    updateEducation: (state, action) => {
      const { index, data } = action.payload;
      state.currentResume.education[index] = data;
    },
    addExperience: (state, action) => {
      state.currentResume.experience.push(action.payload);
    },
    removeExperience: (state, action) => {
      state.currentResume.experience.splice(action.payload, 1);
    },

    updateExperience: (state, action) => {
      const { index, data } = action.payload;
      state.currentResume.experience[index] = data;
    },
    setResumeData: (state, action) => {
      state.currentResume = action.payload;
    },
    addSkill: (state, action) => {
      state.currentResume.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.currentResume.skills.splice(action.payload, 1);
    },
    addLanguage: (state, action) => {
      state.currentResume.languages.push(action.payload);
    },
    removeLanguage: (state, action) => {
      state.currentResume.languages.splice(action.payload, 1);
    },
    
  },
});

export const {
  addResume,
  updateResume,
  setTemplate,
  setCurrentResumeTemplate,
  updatePersonalInfo,
  setResumeData,
  updateSummary,
  addExperience,
  removeExperience,
  updateExperience,
  addSkill,
  removeSkill,
  addLanguage,
  removeLanguage,
  addEducation,
  removeEducation,
  updateEducation,
  updateLinks
} = resumeSlice.actions;

export default resumeSlice.reducer;
