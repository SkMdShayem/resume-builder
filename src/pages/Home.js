import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const features = [
    {
      icon: "✨",
      title: "AI-Powered Templates",
      description:
        "Choose from 10 professionally designed templates optimized for ATS systems and recruiters.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Create a professional resume in minutes with our intuitive builder and real-time preview.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Build and edit your resume on any device with our fully responsive design.",
    },
    {
      icon: "💾",
      title: "Auto-Save",
      description:
        "Never lose your work. All changes are automatically saved to your browser.",
    },
    {
      icon: "📄",
      title: "PDF Export",
      description:
        "Download your resume as a high-quality PDF ready to send to employers.",
    },
    {
      icon: "🎨",
      title: "Customizable",
      description:
        "Switch templates anytime and customize every section to match your unique experience.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose a Template",
      description:
        "Browse our collection of professionally designed resume templates and pick your favorite.",
    },
    {
      number: "02",
      title: "Fill in Your Details",
      description:
        "Add your experience, education, skills, and projects with our easy-to-use form builder.",
    },
    {
      number: "03",
      title: "Download & Apply",
      description:
        "Export your polished resume as a PDF and start applying to your dream jobs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Build Your Perfect Resume in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create a professional, ATS-friendly resume with our easy-to-use
              builder. Choose from 10 modern templates and land your dream job
              faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => user ? navigate("/dashboard") : navigate("/templates")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {user ? "Go to Dashboard" : "Start Building Free"}
              </button>
              <button
                onClick={() => {
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
              >
                See Features
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-600">
              <span className="flex items-center gap-2">
                ✅ No signup required
              </span>
              <span className="flex items-center gap-2">
                ✅ 100% free
              </span>
              <span className="flex items-center gap-2">
                ✅ Export to PDF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Everything you need to create a winning resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Three simple steps to your perfect resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-xl mb-10">
            Join thousands of job seekers who have successfully created their
            resumes with our builder. Start building yours today — completely
            free.
          </p>
          <button
            onClick={() => user ? navigate("/dashboard") : navigate("/templates")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition"
          >
            {user ? "Go to Dashboard" : "Create Your Resume Now"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">ResumeBuilder</h3>
              <p className="text-sm">
                Create your perfect resume in minutes with our AI-powered builder.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("/templates")} className="hover:text-white">Templates</button></li>
                <li><button onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })} className="hover:text-white">Features</button></li>
                <li><button className="hover:text-white">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">About</button></li>
                <li><button className="hover:text-white">Blog</button></li>
                <li><button className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">Privacy</button></li>
                <li><button className="hover:text-white">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 ResumeBuilder. Build your future.</p>
            <div className="mt-4 space-x-4">
              <span>Free to use • No credit card required</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
