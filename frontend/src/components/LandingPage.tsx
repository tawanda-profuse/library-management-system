import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen py-8 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80"
          alt="Library background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="flex justify-center mb-6">
          <BookOpen className="w-20 h-20 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
          Library Management System
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Organize, manage, and explore your entire book collection with ease. A
          modern solution for efficient library management.
        </p>

        <button
          onClick={() => navigate("/books")}
          className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 cursor-pointer"
        >
          View All Books
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">∞</div>
            <div className="text-gray-300">Books</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Access</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-300">Digital</div>
          </div>
        </div>
      </div>
    </div>
  );
}
