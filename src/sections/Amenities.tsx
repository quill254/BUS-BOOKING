import { useEffect, useRef, useState } from 'react';
import { Wifi, Power, Snowflake, Monitor, Luggage, Armchair, Headphones, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const busTypes = [
  {
    name: 'Standard',
    description: 'Comfortable and affordable travel with essential amenities.',
    price: 'From €15',
    image: '/bus-interior.jpg',
    features: [
      { icon: Wifi, label: 'Free WiFi' },
      { icon: Power, label: 'USB Charging' },
      { icon: Snowflake, label: 'Air Conditioning' },
      { icon: Luggage, label: 'Luggage Allowance' },
    ],
  },
  {
    name: 'Premium',
    description: 'Enhanced comfort with extra legroom and premium services.',
    price: 'From €25',
    image: '/bus-interior.jpg',
    features: [
      { icon: Wifi, label: 'High-Speed WiFi' },
      { icon: Power, label: 'Power Outlets' },
      { icon: Monitor, label: 'Entertainment System' },
      { icon: Coffee, label: 'Complimentary Snacks' },
      { icon: Headphones, label: 'Noise-Canceling Headphones' },
    ],
  },
  {
    name: 'Luxury',
    description: 'Ultimate travel experience with first-class amenities.',
    price: 'From €45',
    image: '/bus-interior.jpg',
    features: [
      { icon: Wifi, label: 'Premium WiFi' },
      { icon: Power, label: 'AC & USB Ports' },
      { icon: Monitor, label: 'Personal Screen' },
      { icon: Coffee, label: 'Gourmet Meals' },
      { icon: Headphones, label: 'Premium Audio' },
      { icon: Armchair, label: 'Onboard Restroom' },
    ],
  },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeBus, setActiveBus] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.amenities-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentBus = busTypes[activeBus];

  return (
    <section id="amenities" ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
            Our Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Comfort Level
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From standard to luxury, we have the perfect bus for every traveler and budget.
          </p>
        </div>

        {/* Bus Type Selector */}
        <div className="flex justify-center gap-2 mb-12">
          {busTypes.map((bus, index) => (
            <button
              key={index}
              onClick={() => setActiveBus(index)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeBus === index
                  ? 'bg-[#0070C0] text-white shadow-lg shadow-[#0070C0]/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {bus.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="amenities-content grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentBus.image}
                alt={currentBus.name}
                className="w-full h-[400px] object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Price Badge */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-white rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-[#0070C0]">{currentBus.price}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6">
              <button
                onClick={() => setActiveBus((prev) => (prev === 0 ? busTypes.length - 1 : prev - 1))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-[#0070C0] hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6">
              <button
                onClick={() => setActiveBus((prev) => (prev === busTypes.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-[#0070C0] hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="lg:pl-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {currentBus.name} Class
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {currentBus.description}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {currentBus.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-[#0070C0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#0070C0]" />
                  </div>
                  <span className="font-medium text-gray-700">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#0070C0] hover:bg-[#005a9c] text-white px-8 py-6 text-lg font-semibold btn-shine">
                Book {currentBus.name}
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg">
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {busTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBus(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeBus === index
                  ? 'bg-[#0070C0] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
