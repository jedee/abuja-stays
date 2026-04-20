// ── Footer Component
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">A</div>
            <span className="font-bold text-lg">AbujaStays</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Your gateway to Abuja's best accommodation. From luxury flats in Maitama to cozy rooms in Wuse — find your home away from home.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/search?location=Maitama" className="hover:text-white transition-colors">Maitama</Link></li>
            <li><Link to="/search?location=Wuse" className="hover:text-white transition-colors">Wuse</Link></li>
            <li><Link to="/search?location=Jabi" className="hover:text-white transition-colors">Jabi</Link></li>
            <li><Link to="/search?location=Asokoro" className="hover:text-white transition-colors">Asokoro</Link></li>
            <li><Link to="/search" className="hover:text-white transition-colors">View All Listings</Link></li>
          </ul>
        </div>

        {/* Host */}
        <div>
          <h4 className="font-semibold mb-4">Become a Host</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/become-a-host" className="hover:text-white transition-colors">List Your Space</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Host Dashboard</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Host Resources</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Community Forum</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://github.com/ojeh-a" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
              <Globe size={16} /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition-colors text-sm">X (Twitter)</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-white/40">
          © 2026 AbujaStays. Built with love in Abuja, Nigeria.
        </p>
        <p className="text-xs text-white/30">
          Prices in NGN (₦). All listings verified by our team.
        </p>
      </div>
    </footer>
  );
}