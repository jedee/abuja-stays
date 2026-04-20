// ── Hero Component with Search Bar
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import type { SearchFilters } from '../types';

export default function Hero() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    type: '',
    minPrice: 0,
    maxPrice: 500000,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.checkIn) params.set('checkIn', filters.checkIn);
    if (filters.checkOut) params.set('checkOut', filters.checkOut);
    params.set('guests', String(filters.guests));
    if (filters.type) params.set('type', filters.type);
    params.set('minPrice', String(filters.minPrice));
    params.set('maxPrice', String(filters.maxPrice));
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1587588370758-1c1c5e6e0e72?w=1600&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Find Your Perfect Stay<br />in Abuja
        </h1>
        <p className="text-lg text-white/80 mb-10">
          Flats, houses, and rooms across Abuja's best neighbourhoods
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
          {/* Location */}
          <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl ${filters.location ? 'bg-[var(--color-background)]' : 'bg-transparent'}`}>
            <MapPin size={18} className="text-[var(--color-primary)] shrink-0" />
            <input
              type="text"
              placeholder="Where in Abuja?"
              value={filters.location}
              onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
              className="flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none text-sm"
            />
          </div>

          <div className="h-px md:h-auto md:w-px bg-[var(--color-border)]" />

          {/* Dates */}
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[var(--color-background)] transition-colors"
            onClick={() => { setShowDatePicker(p => !p); setShowGuests(false); }}
          >
            <Calendar size={18} className="text-[var(--color-primary)] shrink-0" />
            <span className="flex-1 text-sm text-[var(--color-text)]">
              {filters.checkIn && filters.checkOut
                ? `${format(new Date(filters.checkIn), 'MMM d')} → ${format(new Date(filters.checkOut), 'MMM d')}`
                : filters.checkIn
                  ? `${format(new Date(filters.checkIn), 'MMM d')} → ?`
                  : 'Add dates'}
            </span>
            <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
          </div>

          <div className="h-px md:h-auto md:w-px bg-[var(--color-border)]" />

          {/* Guests */}
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[var(--color-background)] transition-colors"
            onClick={() => { setShowGuests(g => !g); setShowDatePicker(false); }}
          >
            <Users size={18} className="text-[var(--color-primary)] shrink-0" />
            <span className="flex-1 text-sm text-[var(--color-text)]">
              {filters.guests} guest{filters.guests > 1 ? 's' : ''}
            </span>
            <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
          </div>

          {/* Search CTA */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[#163826] transition-colors"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>

        {/* Date Picker Dropdown */}
        {showDatePicker && (
          <div className="mt-3 bg-white rounded-xl shadow-lg p-4 text-[var(--color-text)] max-w-sm mx-auto">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-2">Select check-in & check-out</p>
            <input
              type="date"
              className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm mb-2"
              value={filters.checkIn || ''}
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={e => setFilters(f => ({ ...f, checkIn: e.target.value }))}
            />
            <input
              type="date"
              className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm"
              value={filters.checkOut || ''}
              min={filters.checkIn || format(new Date(), 'yyyy-MM-dd')}
              onChange={e => setFilters(f => ({ ...f, checkOut: e.target.value }))}
            />
          </div>
        )}

        {/* Guests Dropdown */}
        {showGuests && (
          <div className="mt-3 bg-white rounded-xl shadow-lg p-4 text-[var(--color-text)] max-w-xs mx-auto">
            {[
              { label: 'Guests', field: 'guests' as const, min: 1, max: 10 },
            ].map(({ label, field, min, max }) => (
              <div key={field} className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilters(f => ({ ...f, [field]: Math.max(min, f[field] - 1) }))}
                    className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm hover:border-[var(--color-primary)] transition-colors"
                  >−</button>
                  <span className="w-6 text-center font-semibold">{filters[field]}</span>
                  <button
                    onClick={() => setFilters(f => ({ ...f, [field]: Math.min(max, f[field] + 1) }))}
                    className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm hover:border-[var(--color-primary)] transition-colors"
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular searches */}
        <div className="mt-4 flex items-center gap-2 justify-center flex-wrap text-sm text-white/60">
          <span>Popular:</span>
          {['Maitama', 'Wuse', 'Jabi', 'Asokoro'].map(area => (
            <button
              key={area}
              onClick={() => setFilters(f => ({ ...f, location: area }))}
              className="px-3 py-1 rounded-full border border-white/30 hover:bg-white/10 hover:border-white/60 transition-colors"
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}