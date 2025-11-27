import { QrCode, Copy, Printer, Clock } from 'lucide-react';
import { Booking } from '@/app/types';
import Image from "next/image";

interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-[#0f172a]">{booking.tourName}</h2>
                    <p className="text-sm text-gray-500 mt-1">Mã: {booking.id}</p>
                    <p className="text-sm text-gray-500">Ngày: {booking.date}</p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'upcoming'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'completed'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-red-100 text-red-700'
                    }`}
                >
                    {booking.status === 'upcoming'
                        ? 'Sắp diễn ra'
                        : booking.status === 'completed'
                            ? 'Hoàn thành'
                            : 'Đã hủy'}
                </span>
            </div>

            <div className="bg-[#F7FBFF] rounded-xl p-6 mb-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                    <QrCode className="w-32 h-32 text-[#0B6EFD]" />
                </div>

                <p className="text-sm text-gray-600 mb-3">Mã QR: {booking.qrCode}</p>

                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Sao chép
                    </button>

                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        In
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-[#0f172a] mb-3">Lịch trình chi tiết</h3>

                {(!booking.itinerary || booking.itinerary.length === 0) && (
                    <p className="text-sm text-gray-500 italic">Không có hành trình nào.</p>
                )}

                {booking.itinerary &&
                    booking.itinerary.length > 0 &&
                    booking.itinerary.map((item, idx) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-[#0B6EFD] text-white flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </div>

                                {idx < booking.itinerary.length - 1 && (
                                    <div className="w-0.5 h-full bg-gray-200 my-2" />
                                )}
                            </div>

                            <div className="flex-1 pb-6">
                                <Image
                                    src={item.image}
                                    alt={item.location}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                />

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                    <Clock className="w-4 h-4" />
                                    {item.time}
                                </div>

                                <h4 className="font-bold text-[#0f172a] mb-1">{item.location}</h4>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
