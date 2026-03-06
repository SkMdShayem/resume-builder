import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SavedResumeCard from "../components/SavedResumeCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [resumes, setResumes] = useState([]);

  const handleEdit = (resume) => {
    localStorage.setItem("editingResume", JSON.stringify(resume));

    // Navigate to the resume builder route
    navigate("/builder");
  };

  const handleDelete = (id) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== id);

    localStorage.setItem("resumes", JSON.stringify(updatedResumes));

    setResumes(updatedResumes);
  };


  useEffect(() => {
    const storedResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    setResumes(storedResumes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "User"} 👋
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("editingResume");
            navigate("/templates");
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create New Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <SavedResumeCard
            key={resume.id}
            resume={resume}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
