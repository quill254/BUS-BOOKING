import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Wanjiku Mwangi',
    avatar: 'WM',
    role: 'Business Traveler',
    rating: 5,
    text: 'I travel between Nairobi and Mombasa every week for work. BusBooking Pro has made my life so much easier. The seats are comfortable, buses are always on time, and the M-Pesa payment is super convenient!',
    route: 'Nairobi → Mombasa',
    date: 'December 2024',
  },
  {
    name: 'John Ochieng',
    avatar: 'JO',
    role: 'University Student',
    rating: 5,
    text: 'As a student at University of Nairobi, I travel home to Kisumu often. The student discounts are amazing! I save so much money and the online booking means no more queues at the bus station.',
    route: 'Nairobi → Kisumu',
    date: 'November 2024',
  },
  {
    name: 'Amina Hassan',
    avatar: 'AH',
    role: 'Tour Operator',
    rating: 5,
    text: 'I book buses for my tour groups and BusBooking Pro is a lifesaver. Being able to select seats for all my clients and get instant confirmation makes my work so much smoother.',
    route: 'Mombasa → Malindi',
    date: 'October 2024',
  },
  {
    name: 'Peter Kimani',
    avatar: 'PK',
    role: 'Family Man',
    rating: 4,
    text: 'Traveling with my family of five used to be stressful. Now I can book all our seats together in advance. The kids love the reclining seats and WiFi keeps them entertained!',
    route: 'Nairobi → Nakuru',
    date: 'September 2024',
  },
  {
    name: 'Grace Akinyi',
    avatar: 'GA',
    role: 'Sales Representative',
    rating: 5,
    text: 'I visit clients across Kenya and need reliable transport. The seat selection feature ensures I always get a window seat to work during the journey. Highly recommend!',
    route: 'Nairobi → Eldoret',
    date: 'August 2024',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.7,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevTestimonial = () => setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Kenyan Travelers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from passengers who trust us for their journeys across Kenya.
          </p>
        </div>

        <div className="testimonial-card max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#0070C0] to-[#005a9c] rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="absolute top-8 right-8 opacity-20">
              <Quote className="w-24 h-24" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-lg lg:text-xl leading-relaxed mb-8 relative z-10">
              "{current.text}"
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  {current.avatar}
                </div>
                <div>
                  <div className="font-semibold text-lg">{current.name}</div>
                  <div className="text-white/70">{current.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm">{current.route}</div>
                <div className="text-white/50 text-sm">{current.date}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prevTestimonial} className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-[#0070C0] w-8' : 'bg-gray-300 hover:bg-gray-400'}`} />
              ))}
            </div>

            <button onClick={nextTestimonial} className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((t, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0070C0]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#0070C0]">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
