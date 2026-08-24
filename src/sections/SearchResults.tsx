import { useState } from 'react';
import { ArrowRight, Clock, Wifi, Snowflake, Armchair, ChevronLeft, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeatSelection from './SeatSelection';

interface BusResult {
  id: number;
  operator: string;
  departure: string;
  arrival: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  originalPrice: number;
  amenities: string[];
}

const kenyaBusResults: BusResult[] = [
  {
    id: 1,
    operator: 'Modern Coast',
    departure: '07:00',
    arrival: '15:30',
    from: 'Nairobi',
    to: 'Mombasa',
    duration: '8h 30m',
    price: 1200,
    originalPrice: 1500,
    amenities: ['wifi', 'ac', 'recliner'],
  },
  {
    id: 2,
    operator: 'Mash East Africa',
    departure: '08:30',
    arrival: '17:00',
    from: 'Nairobi',
    to: 'Mombasa',
    duration: '8h 30m',
    price: 1100,
    originalPrice: 1400,
    amenities: ['wifi', 'ac'],
  },
  {
    id: 3,
    operator: 'Easy Coach',
    departure: '06:00',
    arrival: '12:15',
    from: 'Nairobi',
    to: 'Kisumu',
    duration: '6h 15m',
    price: 1000,
    originalPrice: 1300,
    amenities: ['wifi', 'ac', 'recliner'],
  },
  {
    id: 4,
    operator: 'Guardian Angel',
    departure: '09:00',
    arrival: '11:30',
    from: 'Nairobi',
    to: 'Nakuru',
    duration: '2h 30m',
    price: 600,
    originalPrice: 800,
    amenities: ['ac'],
  },
  {
    id: 5,
    operator: 'Transline Classic',
    departure: '07:30',
    arrival: '10:15',
    from: 'Nairobi',
    to: 'Eldoret',
    duration: '5h 45m',
    price: 900,
    originalPrice: 1200,
    amenities: ['wifi', 'ac'],
  },
  {
    id: 6,
    operator: 'Simba Coach',
    departure: '20:00',
    arrival: '04:30',
    from: 'Nairobi',
    to: 'Mombasa',
    duration: '8h 30m',
    price: 1300,
    originalPrice: 1600,
    amenities: ['wifi', 'ac', 'recliner'],
  },
];

const tabs = [
  { label: 'Cheapest', count: 24 },
  { label: 'Fastest', count: 14 },
  { label: 'Best', count: 8 },
];

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'wifi': return <Wifi className="w-4 h-4" />;
    case 'ac': return <Snowflake className="w-4 h-4" />;
    case 'recliner': return <Armchair className="w-4 h-4" />;
    default: return null;
  }
};

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState('Cheapest');
  const [selectedBus, setSelectedBus] = useState<BusResult | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [bookingBus, setBookingBus] = useState<BusResult | null>(null);

  const handleViewDetails = (bus: BusResult) => {
    setSelectedBus(bus);
    setShowDetail(true);
  };

  const handleBookNow = (bus: BusResult) => {
    setBookingBus(bus);
    setShowSeatSelection(true);
  };

  const handleBookingComplete = (bookingData: { seats: string[]; totalPrice: number; passengerCount: number }) => {
    setShowSeatSelection(false);
    setBookingBus(null);
    // Could show a success toast here
    alert(`Booking confirmed! Seats: ${bookingData.seats.join(', ')}, Total: KES ${bookingData.totalPrice.toLocaleString()}`);
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#0070C0]/10 text-[#0070C0] rounded-full text-sm font-semibold mb-4">
            Search Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Available Buses
          </h2>
          <p className="text-lg text-gray-600">
            Nairobi → Mombasa • Today • 1 Passenger
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.label
                  ? 'bg-[#0070C0] text-white shadow-lg shadow-[#0070C0]/25'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {kenyaBusResults.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{bus.departure}</div>
                      <div className="text-sm text-gray-500">{bus.from}</div>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <div className="text-sm text-gray-500">{bus.duration}</div>
                      <div className="w-24 h-0.5 bg-gray-300 my-1 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-400 rounded-full" />
                      </div>
                      <div className="text-xs text-[#0070C0]">Direct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{bus.arrival}</div>
                      <div className="text-sm text-gray-500">{bus.to}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0070C0]">KES {bus.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 line-through">KES {bus.originalPrice.toLocaleString()}</div>
                    <div className="text-xs text-[#0070C0] bg-blue-50 px-2 py-1 rounded mt-1">20% OFF</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-gray-700">{bus.operator}</div>
                    <div className="flex gap-2 text-gray-400">
                      {bus.amenities.map((amenity) => (
                        <div key={amenity} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center" title={amenity}>
                          <AmenityIcon type={amenity} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(bus)}
                      className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleBookNow(bus)}
                      className="bg-[#0070C0] hover:bg-[#005a9c] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why book with us?</h3>
              <ul className="space-y-4">
                {[
                  'Free cancellation up to 6h before',
                  'Instant confirmation via SMS',
                  'Best price guarantee',
                  'No hidden fees',
                  'Secure M-Pesa payment',
                  '24/7 Customer support',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#0070C0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0070C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Need help?</div>
                  <div className="text-lg font-bold text-[#0070C0]">0700 123 456</div>
                  <div className="text-xs text-gray-400 mt-1">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Overlay */}
      {showDetail && selectedBus && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowDetail(false)} />
          
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-[#EFF6FF] shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <button onClick={() => setShowDetail(false)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to results</span>
              </button>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedBus.from}</div>
                  <div className="text-sm text-gray-500">Main Bus Station</div>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <div className="text-sm text-gray-500">{selectedBus.duration}</div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{selectedBus.to}</div>
                  <div className="text-sm text-gray-500">Main Bus Station</div>
                </div>
              </div>
            </div>

            <div className="bg-white px-6 border-b border-gray-200">
              <div className="flex gap-6">
                {['Itinerary', 'Amenities', 'Conditions'].map((tab, index) => (
                  <button key={tab} className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                    index === 0 ? 'border-[#0070C0] text-[#0070C0]' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 pb-32">
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-0 w-px border-l-2 border-dashed border-gray-300" />
                
                <div className="relative mb-8">
                  <div className="absolute -left-5 w-4 h-4 bg-[#0070C0] rounded-full border-2 border-white shadow" />
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{selectedBus.from}</div>
                        <div className="text-sm text-gray-500">Main Bus Station</div>
                      </div>
                      <div className="text-xl font-bold text-[#0070C0]">{selectedBus.departure}</div>
                    </div>
                  </div>
                </div>

                <div className="relative mb-8">
                  <div className="absolute -left-5 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow" />
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-base font-semibold text-gray-700">Rest Stop</div>
                        <div className="text-sm text-gray-500">Quick break for refreshments</div>
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-gray-600 shadow-sm">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      15 min break
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-5 w-4 h-4 bg-[#0070C0] rounded-full border-2 border-white shadow" />
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{selectedBus.to}</div>
                        <div className="text-sm text-gray-500">Main Bus Station</div>
                      </div>
                      <div className="text-xl font-bold text-[#0070C0]">{selectedBus.arrival}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-gray-600">Price per person</div>
                <div className="text-2xl font-bold text-[#0070C0]">KES {selectedBus.price.toLocaleString()}</div>
              </div>
              <Button 
                onClick={() => { setShowDetail(false); handleBookNow(selectedBus); }}
                className="w-full bg-[#0070C0] hover:bg-[#005a9c] text-white py-6 text-lg font-semibold"
              >
                Select Seats & Book
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Seat Selection Modal */}
      <SeatSelection
        isOpen={showSeatSelection}
        onClose={() => { setShowSeatSelection(false); setBookingBus(null); }}
        busDetails={bookingBus ? {
          operator: bookingBus.operator,
          from: bookingBus.from,
          to: bookingBus.to,
          departure: bookingBus.departure,
          arrival: bookingBus.arrival,
          basePrice: bookingBus.price,
        } : null}
        onBookingComplete={handleBookingComplete}
      />
    </section>
  );
}
