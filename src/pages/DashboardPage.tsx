// ── Host Dashboard Page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp, Calendar, Star, Home, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEED_LISTINGS } from '../data/listings';

function formatN(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
}

export default function DashboardPage() {
  const [tab, setTab] = useState<'overview' | 'listings' | 'bookings'>('overview');
  const hostListings = SEED_LISTINGS.filter(l => l.hostId === 'host-001');

  const stats = {
    totalEarnings: hostListings.reduce((s, l) => s + l.pricePerNight * 12, 0),
    thisMonth: hostListings[0]?.pricePerNight * 8 || 0,
    avgRating: (hostListings.reduce((s, l) => s + l.rating, 0) / hostListings.length).toFixed(2),
    totalBookings: 34,
    activeListings: hostListings.length,
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <div className="pt-24 max-w-7xl mx-auto px-6 pb-16">
        {/* Dashboard header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Host Dashboard</h1>
            <p className="text-[var(--color-text-muted)] mt-1">Welcome back, Amara — here's your performance overview.</p>
          </div>
          <Link to="/become-a-host" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[#163826] transition-colors">
            <PlusCircle size={16} /> Add Listing
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <TrendingUp size={20} className="text-[var(--color-primary)]" />, label: 'Total Earnings', value: formatN(stats.totalEarnings), sub: 'All time' },
            { icon: <Calendar size={20} className="text-[var(--color-secondary)]" />, label: 'This Month', value: formatN(stats.thisMonth), sub: 'Apr 2026' },
            { icon: <Star size={20} className="text-amber-500" />, label: 'Avg Rating', value: stats.avgRating, sub: '★ across listings' },
            { icon: <Home size={20} className="text-[var(--color-success)]" />, label: 'Active Listings', value: stats.activeListings, sub: `${stats.totalBookings} total bookings` },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-[var(--color-border)] p-5">
              <div className="flex items-center gap-2 mb-3">{stat.icon}<span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">{stat.label}</span></div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white rounded-xl border border-[var(--color-border)] mb-6 w-fit">
          {(['overview','listings','bookings'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
              <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { time: '2 hours ago', event: 'New booking', detail: 'Luxury 3-Bedroom Flat — Maitama', amount: '+₦850,000' },
                  { time: 'Yesterday', event: 'Review received', detail: '⭐ 5 stars from Chidi O. — Jabi stay', amount: null },
                  { time: '2 days ago', event: 'Check-out', detail: 'Modern 2-Bed in Jabi —Guest completed', amount: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between py-3 border-b border-[var(--color-border)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold">{item.event}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{item.detail}</p>
                    </div>
                    <div className="text-right">
                      {item.amount && <span className="text-sm font-bold text-[var(--color-success)]">{item.amount}</span>}
                      <p className="text-xs text-[var(--color-text-muted)]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/become-a-host" className="bg-[var(--color-primary)] text-white rounded-xl p-6 flex items-center gap-4 hover:bg-[#163826] transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><PlusCircle size={22} /></div>
                <div>
                  <h3 className="font-bold">Add Another Listing</h3>
                  <p className="text-sm text-white/70">Expand your portfolio in Abuja</p>
                </div>
              </Link>
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
                <h3 className="font-bold mb-1">Pending Reviews</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">You have 2 reviews to respond to</p>
                <button className="text-sm font-semibold text-[var(--color-primary)]">View reviews →</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'listings' && (
          <div className="space-y-4">
            {hostListings.map(l => (
              <div key={l.id} className="bg-white rounded-xl border border-[var(--color-border)] p-4 flex items-center gap-4">
                <img src={l.images[0]} alt={l.title} className="w-20 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{l.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{l.location.area} · {l.beds} beds</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-semibold">{l.rating}★</span>
                    <span className="text-xs text-[var(--color-text-muted)]">({l.reviewCount} reviews)</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${l.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {l.available ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--color-primary)]">{formatN(l.pricePerNight)}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">per night</p>
                </div>
                <button className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'bookings' && (
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="font-bold text-lg mb-4">Upcoming Bookings</h2>
            <div className="space-y-3">
              {[
                { ref: 'ABJ-8K2M9X3P', guest: 'Emeka O.', listing: 'Luxury 3-Bed in Maitama', checkIn: '2026-04-22', checkOut: '2026-04-25', guests: 4, total: 255000 },
                { ref: 'ABJ-4N7H2L1Q', guest: 'Aisha M.', listing: 'Lakeside Penthouse in Utako', checkIn: '2026-04-28', checkOut: '2026-05-03', guests: 3, total: 600000 },
              ].map(b => (
                <div key={b.ref} className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
                  <div>
                    <p className="text-sm font-bold">{b.guest}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{b.listing}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{b.checkIn} → {b.checkOut} · {b.guests} guests</p>
                    <span className="text-[10px] font-mono bg-[var(--color-background)] px-2 py-0.5 rounded mt-1 inline-block">{b.ref}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[var(--color-primary)]">{formatN(b.total)}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-semibold">Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}