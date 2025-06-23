import { Link } from 'react-router-dom';
import { Droplets, Gauge, AlertTriangle, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 text-slate-800 relative">
      {/* Navigation Bar */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur border-b border-slate-200 shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-600 w-6 h-6" />
          <Link to="/" className="text-lg font-bold text-slate-800">
            Water System
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex flex-col items-center justify-center px-8 pt-20 pb-16 text-center">
        <div className="max-w-4xl w-full space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
              <Droplets className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Updated Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
            Empowering Water Management, Anytime, Anywhere
          </h1>

          {/* Updated Subheading */}
          <p className="text-lg text-slate-600">
            Our innovative platform allows you to monitor, analyze, and optimize your water systems with ease. 
            Whether you're managing water tanks, analyzing usage trends, or monitoring system health, we've got you covered.
          </p>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Our Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition border-t-4 border-blue-500">
                <Gauge className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-semibold text-lg">Monitor Water Tanks</h3>
                <p className="text-sm text-slate-500">Real-time tracking of water levels and tank performance.</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition border-t-4 border-emerald-500">
                <TrendingUp className="h-8 w-8 text-emerald-500 mb-2" />
                <h3 className="font-semibold text-lg">Gain Insights & Analytics</h3>
                <p className="text-sm text-slate-500">Visualize trends and optimize water usage across systems.</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition border-t-4 border-amber-500">
                <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                <h3 className="font-semibold text-lg">Instant Alerts & Notifications</h3>
                <p className="text-sm text-slate-500">Receive immediate alerts for leaks or system irregularities.</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16 bg-slate-100 py-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center gap-10">
              <div className="max-w-xs text-center bg-white p-6 rounded-xl shadow-lg">
                <p className="text-sm text-slate-600 italic">"This system has drastically improved the way we manage water. The real-time data has been invaluable!"</p>
                <h4 className="mt-4 text-lg font-semibold text-slate-800">John D.</h4>
                <p className="text-sm text-slate-500">Water System Manager</p>
              </div>
              <div className="max-w-xs text-center bg-white p-6 rounded-xl shadow-lg">
                <p className="text-sm text-slate-600 italic">"I can now easily track usage and receive notifications instantly. It’s made our operations so much smoother."</p>
                <h4 className="mt-4 text-lg font-semibold text-slate-800">Jane R.</h4>
                <p className="text-sm text-slate-500">Operations Director</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10">
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition"
            >
              Explore the Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
