import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SavedResumeCard from "../components/SavedResumeCard";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [resumes, setResumes] = useState([]);

  const handleEdit = (resume) => {
    localStorage.setItem("editingResume", JSON.stringify(resume));
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}</h1>

          <button
            onClick={() => {
              localStorage.removeItem("editingResume");
              navigate("/templates");
            }}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            + Create New Resume
          </button>
        </div>

        {resumes.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <SavedResumeCard
                key={resume.id}
                resume={resume}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
            No saved resumes yet. Create one to see it here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
