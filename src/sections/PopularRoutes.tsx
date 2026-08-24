import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Star, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const routes = [
  {
    from: 'Nairobi',
    to: 'Mombasa',
    image: '/route-nairobi-mombasa.jpg',
    duration: '8h 30m',
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 3241,
    tag: 'Most Popular',
    operator: 'Modern Coast',
  },
  {
    from: 'Nairobi',
    to: 'Kisumu',
    image: '/route-nairobi-kisumu.jpg',
    duration: '6h 15m',
    price: 1000,
    originalPrice: 1300,
    rating: 4.7,
    reviews: 2156,
    tag: 'Best Value',
    operator: 'Easy Coach',
  },
  {
    from: 'Nairobi',
    to: 'Nakuru',
    image: '/route-nairobi-nakuru.jpg',
    duration: '2h 30m',
    price: 600,
    originalPrice: 800,
    rating: 4.9,
    reviews: 4124,
    tag: 'Top Rated',
    operator: 'Guardian Angel',
  },
  {
    from: 'Mombasa',
    to: 'Malindi',
    image: '/route-mombasa-malindi.jpg',
    duration: '2h 45m',
    price: 700,
    originalPrice: 900,
    rating: 4.6,
    reviews: 1567,
    tag: 'Trending',
    operator: 'Mash East Africa',
  },
];

export default function PopularRoutes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.route-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="routes" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
              Popular Routes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Top Kenya Destinations
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Most booked routes with the best prices
            </p>
          </div>
          <Button variant="outline" className="gap-2 border-[#0070C0] text-[#0070C0] hover:bg-[#0070C0] hover:text-white self-start sm:self-auto">
            View All Routes
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="route-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0070C0] to-[#005a9c]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold">{route.from}</div>
                    <ArrowRight className="w-8 h-8 mx-auto my-2" />
                    <div className="text-3xl font-bold">{route.to}</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#0070C0] text-white text-xs font-semibold rounded-full">{route.tag}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 line-through">KES {route.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-xl font-bold text-[#0070C0]">KES {route.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-[#0070C0]" />
                    <span className="text-lg font-semibold text-gray-900">{route.to}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-1">{route.operator}</div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {route.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-700">{route.rating}</span>
                    <span>({route.reviews})</span>
                  </div>
                </div>

                <Button className="w-full bg-[#0070C0] hover:bg-[#005a9c] text-white gap-2 btn-shine">
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
