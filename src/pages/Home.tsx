import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import PopularRoutes from '../sections/PopularRoutes';
import Amenities from '../sections/Amenities';
import HowItWorks from '../sections/HowItWorks';
import SearchResults from '../sections/SearchResults';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <PopularRoutes />
      <Amenities />
      <HowItWorks />
      <SearchResults />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
