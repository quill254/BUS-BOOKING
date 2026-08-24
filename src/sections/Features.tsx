import { useEffect, useRef } from 'react';
import { Wifi, Coffee, Armchair, Zap, Shield, Clock, Headphones, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Wifi,
    title: 'Free WiFi',
    description: 'Stay connected throughout your journey with complimentary high-speed internet.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Armchair,
    title: 'Comfortable Seats',
    description: 'Ergonomic reclining seats with extra legroom for a relaxing trip.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Zap,
    title: 'USB Charging',
    description: 'Power outlets and USB ports at every seat to keep your devices charged.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Coffee,
    title: 'Onboard Services',
    description: 'Refreshments and snacks available for purchase during your journey.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'GPS tracking, professional drivers, and comprehensive insurance coverage.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: '98% punctuality rate with real-time updates on any schedule changes.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service ready to assist you anytime.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: CreditCard,
    title: 'Easy Booking',
    description: 'Secure payment options with instant confirmation and free cancellation.',
    color: 'bg-teal-50 text-teal-600',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Travel in Comfort & Style
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience premium bus travel with modern amenities designed to make your journey enjoyable and stress-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#0070C0]/20 hover:shadow-lg hover:shadow-[#0070C0]/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
