import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import postmanLogo from '../assets/postman-logo.png';
import homePageImage from '../assets/home-page.png';
import postmanAIlogo from '../assets/postman-ai-strategy.png';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Navigation - Sticky */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo with Image */}
          <div className="flex items-center gap-3">
            <img src={postmanLogo} alt="Postman Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-bold text-gray-900">Postman Clone</span>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition">
              Sign In
            </Link>
            <Link to="/register" className="px-5 py-2 bg-[#FF6C37] text-white rounded-md hover:bg-[#E85C2A] font-medium transition">
              Sign Up for Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              AI needs context. APIs deliver it.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Postman is the platform where teams build those APIs together. With built-in support for the Model Context Protocol (MCP), Postman helps you design, test, and manage APIs that power both human workflows and intelligent agents.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              <Link to="/register" className="px-6 py-3 bg-[#FF6C37] text-white rounded-md hover:bg-[#E85C2A] font-semibold transition shadow-md">
                Sign Up for Free
              </Link>
              <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-semibold transition">
                Watch a Demo
              </button>
            </div>

            {/* Download Section */}
            <div>
              <p className="text-sm text-gray-600 font-medium mb-3">Download the desktop app for</p>
              <div className="flex gap-4">
                <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700 text-sm">
                  Windows
                </button>
                <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700 text-sm">
                  macOS
                </button>
                <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700 text-sm">
                  Linux
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - HOME PAGE IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img 
                src={homePageImage}
                alt="Postman API Platform" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      
{/* Second Section - AI Ready APIs */}
<div className="max-w-7xl mx-auto px-6 my-12"> 
  <section 
    className="text-white rounded-3xl px-6 py-20"
    style={{ background: 'linear-gradient(170deg, #150903 70%, #FF6C37)' }}
  >
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      {/* Left - Image */}
      <div className="lg:col-span-4 flex justify-center">
        <img 
          src="https://voyager.postman.com/illustration/postman-ai-strategy.svg"
          alt="AI Ready APIs" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right - Content */}
      <div className="lg:col-span-7">
        <h2 className="text-4xl font-bold mb-6">AI-ready APIs in 90 days</h2>
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Most APIs aren't built for AI. Inconsistent specs, hidden changes, and unreliable responses slow agents down and stall workflows. Get the playbook for AI-ready deployment in 90 days, with APIs that are structured, tested, and trusted by both humans and agents.
        </p>
        <button className="px-6 py-3 bg-[#FF6C37] text-white rounded-md hover:bg-[#E85C2A] font-semibold transition shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  </section>
</div>

    

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img src={postmanLogo} alt="Postman Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold text-gray-900">Postman Clone</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Build, test, and collaborate on APIs with the world's most popular API platform.
          </p>
          <p className="text-gray-500 text-xs">© 2025 Postman Clone. All rights Rishabh Chatterjee.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-[#FF6C37] text-white rounded-full shadow-lg hover:bg-[#E85C2A] transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
