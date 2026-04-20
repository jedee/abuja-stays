// ── Search Page
import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, MapPin } from 'lucide-react';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import { SEED_LISTINGS } from '../data/listings';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    location: params.get('location') || '',
    type: params.get('type') || '',
    minPrice: Number(params.get('minPrice') || 0),
    maxPrice: Number(params.get('maxPrice') || 500000),
    guests: Number(params.get('guests') || 1),
  };

  const filtered = useMemo(() => {
    return SEED_LISTINGS.filter(l => {
      if (filters.location && !l.location.area.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.type && l.type !== filters.type) return false;
      if (l.pricePerNight < filters.minPrice) return false;
      if (l.pricePerNight > filters.maxPrice) return false;
      if (l.maxGuests < filters.guests) return false;
      return true;
    });
  }, [filters]);

  const setFilter = (key: string, val: string) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val); else next.delete(key);
    setParams(next);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      {/* Search bar strip */}
      <div className="sticky top-16 z-40 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <MapPin size={16} className="text-[var(--color-primary)]" />
            <input
              type="text"
              placeholder="Search by area..."
              value={filters.location}
              onChange={e => setFilter('location', e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          <div className="text-sm text-[var(--color-text-muted)] font-medium">
            {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-border)] text-sm font-semibold hover:border-[var(--color-primary)] transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="max-w-7xl mx-auto px-6 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={filters.type} onChange={e => setFilter('type', e.target.value)} className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
              <option value="">All types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="room">Room</option>
              <option value="flat">Flat</option>
            </select>
            <select value={filters.guests} onChange={e => setFilter('guests', e.target.value)} className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
            </select>
            <div className="flex items-center gap-1">
              <input type="number" placeholder="Min ₦" value={filters.minPrice || ''} onChange={e => setFilter('minPrice', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm" />
              <span className="text-[var(--color-text-muted)]">—</span>
              <input type="number" placeholder="Max ₦" value={filters.maxPrice || ''} onChange={e => setFilter('maxPrice', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm" />
            </div>
            <button onClick={() => { setParams({}); }} className="px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Listings grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold mb-2">No listings found</h2>
            <p className="text-[var(--color-text-muted)]">Try adjusting your filters or exploring different areas.</p>
            <button onClick={() => setParams({})} className="mt-4 px-6 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}