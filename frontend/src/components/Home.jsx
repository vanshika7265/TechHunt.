import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import CategoryCarousel from './CategoryCarousel';
import { Briefcase, Building, Users } from 'lucide-react';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);

  // Safe destructuring with default empty array
  const { jobs = [] } = useSelector(store => store.jobs || {});

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate("/admin/companies");
    }
  }, []);

  // Stats Cards with "+"
  const stats = [
    { id: 1, title: "Total Jobs", value: "125+", icon: <Briefcase className="w-6 h-6 text-white" /> },
    { id: 2, title: "Companies Hiring", value: "35+", icon: <Building className="w-6 h-6 text-white" /> },
    { id: 3, title: "Applicants", value: "500+", icon: <Users className="w-6 h-6 text-white" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Welcome to College Placement Portal
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Empowering Students to Land Their Dream Careers
        </p>
        <button
          onClick={() => navigate("/jobs")}
          className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 py-3 rounded-lg text-lg font-medium transition"
        >
          Browse Jobs
        </button>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {stats.map(stat => (
          <div
            key={stat.id}
            className="flex items-center gap-4 bg-[#6A38C2] text-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform"
          >
            <div className="p-4 bg-blue-800 rounded-full">{stat.icon}</div>
            <div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </section>

      

      <Footer />
    </div>
  );
};

export default Home;
