import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-[#0070C0] to-[#005a9c] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="cta-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Download Our App
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
              Book bus tickets on the go, track your bus in real-time, and enjoy exclusive mobile-only discounts for Kenya routes.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-white/70 text-sm">4.8 on App Store</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-white">100K+</div>
                <div className="text-white/70 text-sm">Downloads in Kenya</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-3 h-14 px-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.92.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Download on</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-3 h-14 px-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.33 0 .65.1.92.29l15 8.5c.5.28.81.81.81 1.38s-.31 1.1-.81 1.38l-15 8.5c-.27.19-.59.29-.92.29-.83 0-1.5-.67-1.5-1.5z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-72 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-[#0070C0] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div className="text-sm font-semibold">BusBooking Kenya</div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full" />
                    </div>

                    <div className="bg-[#0070C0] rounded-xl p-4 text-white mb-4">
                      <div className="text-xs opacity-80 mb-1">From</div>
                      <div className="font-semibold mb-3">Nairobi</div>
                      <div className="text-xs opacity-80 mb-1">To</div>
                      <div className="font-semibold mb-3">Mombasa</div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
                          <div className="text-xs opacity-80">Date</div>
                          <div className="text-sm font-semibold">Today</div>
                        </div>
                        <div className="flex-1 bg-white/20 rounded-lg p-2 text-center">
                          <div className="text-xs opacity-80">Passengers</div>
                          <div className="text-sm font-semibold">1</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-semibold">{['Modern Coast', 'Mash East Africa', 'Simba Coach'][i-1]}</div>
                            <div className="text-sm font-bold text-[#0070C0]">KES {[1200, 1100, 1300][i-1]}</div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{['07:00', '08:30', '20:00'][i-1]}</span>
                            <div className="flex-1 h-px bg-gray-300" />
                            <span>8h 30m</span>
                            <div className="flex-1 h-px bg-gray-300" />
                            <span>{['15:30', '17:00', '04:30'][i-1]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Booked!</div>
                    <div className="text-gray-500">NBO → MSA</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg animate-float stagger-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">M-Pesa Paid</div>
                    <div className="text-gray-500">KES 1,200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
