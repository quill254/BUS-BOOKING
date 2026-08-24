import { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Search, TrendingUp, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';

const kenyaTowns = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 
  'Malindi', 'Machakos', 'Thika', 'Nyeri', 'Meru',
  'Kakamega', 'Kericho', 'Kitale', 'Garissa', 'Naivasha'
];

const popularRoutes = [
  'Nairobi → Mombasa',
  'Nairobi → Kisumu', 
  'Nairobi → Nakuru',
  'Mombasa → Malindi'
];

export default function Hero() {
  const [fromTown, setFromTown] = useState('');
  const [toTown, setToTown] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
      gsap.from('.search-card', { opacity: 0, y: 40, duration: 0.8, delay: 0.8 });
      gsap.from('.hero-stats', { opacity: 0, y: 20, duration: 0.6, delay: 1, stagger: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const swapTowns = () => {
    setFromTown(toTown);
    setToTown(fromTown);
  };

  const filteredFromTowns = kenyaTowns.filter(t => 
    t.toLowerCase().includes(fromTown.toLowerCase()) && t !== toTown
  );
  const filteredToTowns = kenyaTowns.filter(t => 
    t.toLowerCase().includes(toTown.toLowerCase()) && t !== fromTown
  );

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0070C0] via-[#005a9c] to-[#003d75]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float stagger-3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Leading bus booking in Kenya
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Travel Kenya,
              <span className="block text-[#7dd3fc]">Book Smarter</span>
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
              Book bus tickets to over 50 destinations across Kenya. Comfortable coaches, great prices, guaranteed seats.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {[
                { icon: Shield, label: 'Safe Travel', value: '100%' },
                { icon: Clock, label: 'On-time', value: '98%' },
                { icon: Users, label: 'Happy Riders', value: '500K+' },
              ].map((stat, index) => (
                <div key={index} className="hero-stats flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="search-card bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Bus</h2>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Select departure town"
                    value={fromTown}
                    onChange={(e) => { setFromTown(e.target.value); setShowFromDropdown(true); }}
                    onFocus={() => setShowFromDropdown(true)}
                    className="pl-10 h-12 border-gray-200 focus:border-[#0070C0] focus:ring-[#0070C0]"
                  />
                </div>
                {showFromDropdown && fromTown && filteredFromTowns.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredFromTowns.map((town) => (
                      <button key={town} onClick={() => { setFromTown(town); setShowFromDropdown(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                        {town}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <button onClick={swapTowns}
                  className="w-10 h-10 bg-[#0070C0] hover:bg-[#005a9c] rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Select destination town"
                    value={toTown}
                    onChange={(e) => { setToTown(e.target.value); setShowToDropdown(true); }}
                    onFocus={() => setShowToDropdown(true)}
                    className="pl-10 h-12 border-gray-200 focus:border-[#0070C0] focus:ring-[#0070C0]"
                  />
                </div>
                {showToDropdown && toTown && filteredToTowns.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredToTowns.map((town) => (
                      <button key={town} onClick={() => { setToTown(town); setShowToDropdown(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                        {town}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-[#0070C0] focus:ring-[#0070C0]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-lg focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0] outline-none appearance-none bg-white">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Button className="w-full h-14 bg-[#0070C0] hover:bg-[#005a9c] text-white text-lg font-semibold rounded-xl btn-shine gap-2">
                <Search className="w-5 h-5" />
                Search Buses
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Popular routes:</p>
              <div className="flex flex-wrap gap-2">
                {popularRoutes.map((route) => (
                  <button key={route}
                    onClick={() => {
                      const [from, to] = route.split(' → ');
                      setFromTown(from);
                      setToTown(to);
                    }}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-[#0070C0]/10 text-gray-600 hover:text-[#0070C0] rounded-lg text-sm font-medium transition-colors">
                    {route}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
