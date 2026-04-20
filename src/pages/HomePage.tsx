// ── Home Page
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import { SEED_LISTINGS } from '../data/listings';

const FEATURED = SEED_LISTINGS.slice(0, 6);

const HOW_IT_WORKS = [
  {
    icon: '🔍',
    title: 'Search',
    desc: 'Browse hundreds of verified listings across Abuja\'s top neighbourhoods.',
  },
  {
    icon: '📅',
    title: 'Book',
    desc: 'Select your dates, guest count, and book securely in seconds.',
  },
  {
    icon: '🏡',
    title: 'Stay',
    desc: 'Check in, settle in, and enjoy your Abuja stay. We\'re always a message away.',
  },
];

const AREAS = [
  { name: 'Maitama', count: 124, img: 'https://images.unsplash.com/photo-1587588370758-1c1c5e6e0e72?w=400&q=70' },
  { name: 'Wuse', count: 98, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=70' },
  { name: 'Jabi', count: 67, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=70' },
  { name: 'Asokoro', count: 43, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=70' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <Hero />

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">Featured Stays</h2>
            <p className="text-[var(--color-text-muted)] mt-1">Handpicked properties across Abuja</p>
          </div>
          <Link
            to="/search"
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:gap-2.5 transition-all"
          >
            View all listings <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[var(--color-border)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How AbujaStays Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(step => (
              <div key={step.title} className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Explore by Area</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AREAS.map(area => (
            <Link
              key={area.name}
              to={`/search?location=${area.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
            >
              <img
                src={area.img}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{area.name}</h3>
                <p className="text-xs text-white/70">{area.count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[var(--color-primary)] text-white py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Shield size={32} className="text-[var(--color-accent)]" />
            <h3 className="font-bold">Verified Listings</h3>
            <p className="text-sm text-white/60">Every property is verified by our team before going live.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={32} className="text-[var(--color-accent)]" />
            <h3 className="font-bold">24/7 Support</h3>
            <p className="text-sm text-white/60">Our Abuja-based team is always a message or call away.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star size={32} className="text-[var(--color-accent)]" />
            <h3 className="font-bold">Superhost Quality</h3>
            <p className="text-sm text-white/60">Our top-rated hosts consistently earn ★ 4.8+ ratings.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Have a property in Abuja?</h2>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto">
          Join hundreds of Abuja property owners earning steady income from short-term rentals. List your space in under 10 minutes.
        </p>
        <Link
          to="/become-a-host"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-secondary)] text-white font-bold text-lg hover:bg-[#9a7a35] transition-colors"
        >
          Start Hosting <ArrowRight size={20} />
        </Link>
      </section>

      <Footer />
    </div>
  );
}