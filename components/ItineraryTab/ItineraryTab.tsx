"use client";
import { motion } from "framer-motion";
import BookingCard from "./BookingCard";
import { Booking } from "@/app/types";

interface ItineraryTabProps {
    bookings: Booking[];
}

export default function ItineraryTab({ bookings }: ItineraryTabProps) {
    const hasBookings = bookings.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-28 px-4"
        >

            {!hasBookings && (
                <div className="flex flex-col items-center justify-center mt-20">

                    <p className="text-lg font-semibold text-[#0f172a]">
                        Bạn chưa có hành trình nào
                    </p>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Đặt tour ngay để bắt đầu chuyến đi đầu tiên của bạn
                    </p>

                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition">
                        Khám phá tour
                    </button>
                </div>
            )}

            {hasBookings &&
                bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))
            }
        </motion.div>
    );
}
