import { useEffect, useRef } from 'react';
import { Search, CalendarCheck, CreditCard, Ticket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Search Your Route',
    description: 'Enter your departure, destination, and travel date. Compare prices and schedules from multiple operators.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Choose Your Seat',
    description: 'Select your preferred seat from our interactive seat map. Filter by price, time, or amenities.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Secure Payment',
    description: 'Pay safely with your preferred method. We support credit cards, PayPal, and digital wallets.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Ticket,
    number: '04',
    title: 'Get Your Ticket',
    description: 'Receive your e-ticket instantly via email. Show it on your phone or print it - your choice!',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
      });

      gsap.from('.step-connector', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scaleX: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book in 4 Easy Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planning your bus journey has never been easier. Follow these simple steps to book your ticket.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gray-200">
            <div className="step-connector h-full bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 origin-left" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card relative text-center"
              >
                {/* Icon */}
                <div className="relative inline-flex mb-6">
                  <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center`}>
                    <step.icon className="w-10 h-10 text-[#0070C0]" />
                  </div>
                  {/* Number Badge */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '2M+', label: 'Tickets Sold' },
              { value: '10K+', label: 'Daily Routes' },
              { value: '500+', label: 'Bus Operators' },
              { value: '30+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-[#0070C0] mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
