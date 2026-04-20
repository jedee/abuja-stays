// ── Header Component
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, UserCircle, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent
      ? 'bg-transparent'
      : 'bg-white border-b border-[var(--color-border)] shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${transparent ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-primary)] text-white'}`}>
            A
          </div>
          <span className={`font-bold text-lg tracking-tight ${transparent ? 'text-white' : 'text-[var(--color-primary)]'}`}>
            AbujaStays
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium ${transparent ? 'text-white/90 hover:text-white' : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'} transition-colors`}>
            Explore
          </Link>
          <Link to="/become-a-host" className={`text-sm font-medium ${transparent ? 'text-white/90 hover:text-white' : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'} transition-colors`}>
            Become a Host
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className={`text-sm font-medium flex items-center gap-1.5 px-4 py-2 rounded-full border transition-colors ${transparent
            ? 'border-white/40 text-white hover:bg-white/10'
            : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
            <UserCircle size={16} />
            Dashboard
          </Link>
          <Link to="/become-a-host" className="text-sm font-semibold px-4 py-2 rounded-full bg-[var(--color-primary)] text-white hover:bg-[#163826] transition-colors flex items-center gap-1.5">
            <PlusCircle size={16} />
            List Your Space
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${transparent ? 'text-white' : 'text-[var(--color-text)]'}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border)] px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-[var(--color-text)]">
            <Home size={18} /> Explore
          </Link>
          <Link to="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-[var(--color-text)]">
            <span>🔍</span> Search
          </Link>
          <Link to="/become-a-host" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-[var(--color-text)]">
            <PlusCircle size={18} /> Become a Host
          </Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-[var(--color-text)]">
            <UserCircle size={18} /> Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}