import { useState } from 'react';
import { X, Armchair, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Seat {
  id: string;
  row: number;
  col: number;
  status: 'available' | 'selected' | 'occupied';
  price: number;
}

interface SeatSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  busDetails: {
    operator: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    basePrice: number;
  } | null;
  onBookingComplete: (bookingData: {
    seats: string[];
    totalPrice: number;
    passengerCount: number;
  }) => void;
}

export default function SeatSelection({ isOpen, onClose, busDetails, onBookingComplete }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'seats' | 'passengers' | 'confirm'>('seats');
  const [passengerDetails, setPassengerDetails] = useState<Array<{ name: string; phone: string; idNumber: string }>>([]);

  // Generate seat layout - 12 rows, 4 seats per row (2x2 configuration)
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const occupiedSeats = ['1B', '2A', '3C', '4D', '5A', '6B', '7C', '8D', '9A', '10B'];
    
    for (let row = 1; row <= 12; row++) {
      for (let col = 0; col < 4; col++) {
        const colLabel = ['A', 'B', 'C', 'D'][col];
        const seatId = `${row}${colLabel}`;
        seats.push({
          id: seatId,
          row,
          col,
          status: occupiedSeats.includes(seatId) ? 'occupied' : 'available',
          price: busDetails?.basePrice || 1000,
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'occupied') return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      if (prev.length >= 6) return prev; // Max 6 seats
      return [...prev, seatId];
    });
  };

  const getSeatStatus = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat) return 'occupied';
    if (seat.status === 'occupied') return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const totalPrice = selectedSeats.length * (busDetails?.basePrice || 1000);

  const handleContinue = () => {
    if (currentStep === 'seats' && selectedSeats.length > 0) {
      setCurrentStep('passengers');
      setPassengerDetails(selectedSeats.map(() => ({ name: '', phone: '', idNumber: '' })));
    } else if (currentStep === 'passengers') {
      setCurrentStep('confirm');
    } else if (currentStep === 'confirm') {
      onBookingComplete({
        seats: selectedSeats,
        totalPrice,
        passengerCount: selectedSeats.length,
      });
    }
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    setPassengerDetails(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  if (!isOpen || !busDetails) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {currentStep === 'seats' && 'Select Your Seats'}
              {currentStep === 'passengers' && 'Passenger Details'}
              {currentStep === 'confirm' && 'Booking Confirmation'}
            </h2>
            <p className="text-sm text-gray-500">{busDetails.operator} • {busDetails.from} → {busDetails.to}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {['Select Seats', 'Passengers', 'Confirm'].map((step, index) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index < ['seats', 'passengers', 'confirm'].indexOf(currentStep) + 1
                    ? 'bg-[#0070C0] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < ['seats', 'passengers', 'confirm'].indexOf(currentStep) + 1 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  index < ['seats', 'passengers', 'confirm'].indexOf(currentStep) + 1
                    ? 'text-[#0070C0]'
                    : 'text-gray-400'
                }`}>{step}</span>
                {index < 2 && <div className="flex-1 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Seat Selection */}
        {currentStep === 'seats' && (
          <div className="p-6">
            {/* Legend */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-gray-300 rounded-lg bg-white" />
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-[#0070C0] rounded-lg bg-[#0070C0]" />
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-gray-200 rounded-lg bg-gray-100 opacity-50" />
                <span className="text-sm text-gray-600">Occupied</span>
              </div>
            </div>

            {/* Driver */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500 flex items-center gap-2">
                <Armchair className="w-4 h-4" />
                Driver
              </div>
            </div>

            {/* Seat Grid */}
            <div className="flex justify-center">
              <div className="inline-block">
                {Array.from({ length: 12 }, (_, rowIndex) => {
                  const row = rowIndex + 1;
                  const leftSeats = seats.filter(s => s.row === row && s.col < 2);
                  const rightSeats = seats.filter(s => s.row === row && s.col >= 2);
                  
                  return (
                    <div key={row} className="flex items-center gap-4 mb-2">
                      {/* Left side */}
                      <div className="flex gap-2">
                        {leftSeats.map(seat => {
                          const status = getSeatStatus(seat.id);
                          return (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(seat.id)}
                              disabled={status === 'occupied'}
                              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                                status === 'available'
                                  ? 'border-gray-300 bg-white hover:border-[#0070C0] hover:scale-110'
                                  : status === 'selected'
                                  ? 'border-[#0070C0] bg-[#0070C0] text-white scale-105'
                                  : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              {status === 'selected' ? <Check className="w-4 h-4" /> : seat.id}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Row number */}
                      <div className="w-8 text-center text-sm text-gray-400 font-medium">{row}</div>
                      
                      {/* Right side */}
                      <div className="flex gap-2">
                        {rightSeats.map(seat => {
                          const status = getSeatStatus(seat.id);
                          return (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(seat.id)}
                              disabled={status === 'occupied'}
                              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                                status === 'available'
                                  ? 'border-gray-300 bg-white hover:border-[#0070C0] hover:scale-110'
                                  : status === 'selected'
                                  ? 'border-[#0070C0] bg-[#0070C0] text-white scale-105'
                                  : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              {status === 'selected' ? <Check className="w-4 h-4" /> : seat.id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Info */}
            {selectedSeats.length > 0 && (
              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Selected Seats: <span className="font-semibold text-[#0070C0]">{selectedSeats.join(', ')}</span></p>
                    <p className="text-sm text-gray-600">Passengers: <span className="font-semibold">{selectedSeats.length}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-[#0070C0]">KES {totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Passenger Details */}
        {currentStep === 'passengers' && (
          <div className="p-6 space-y-4">
            {selectedSeats.map((seatId, index) => (
              <div key={seatId} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#0070C0] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {seatId}
                  </div>
                  <h3 className="font-semibold text-gray-900">Passenger {index + 1}</h3>
                </div>
                <div className="grid gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={passengerDetails[index]?.name || ''}
                      onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="07XX XXX XXX"
                        value={passengerDetails[index]?.phone || ''}
                        onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                      <input
                        type="text"
                        placeholder="ID/Passport"
                        value={passengerDetails[index]?.idNumber || ''}
                        onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation */}
        {currentStep === 'confirm' && (
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Book!</h3>
              <p className="text-gray-600">Please review your booking details</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-semibold">{busDetails.from} → {busDetails.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Operator</span>
                <span className="font-semibold">{busDetails.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Departure</span>
                <span className="font-semibold">{busDetails.departure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats</span>
                <span className="font-semibold">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers</span>
                <span className="font-semibold">{selectedSeats.length}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-[#0070C0]">KES {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Payment Methods:</strong> M-Pesa, Bank Transfer, or Pay at Station
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3">
            {currentStep !== 'seats' && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep === 'passengers' ? 'seats' : 'passengers')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={currentStep === 'seats' && selectedSeats.length === 0}
              className="flex-1 bg-[#0070C0] hover:bg-[#005a9c] text-white gap-2 btn-shine"
            >
              {currentStep === 'seats' && `Continue (${selectedSeats.length} seats)`}
              {currentStep === 'passengers' && 'Review Booking'}
              {currentStep === 'confirm' && 'Complete Booking'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
