// src/components/HomeTab/ServiceGrid.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Train, Plane, Hotel, MapPin } from 'lucide-react';

import TicketModal from '@/components/Service/ticket/TicketModal';
import TrainModal from '@/components/Service/train/TrainModal';
import FlightModal from '@/components/Service/Flight/FlightModal';
import HotelModal from '@/components/Service/Hotel/HotelModal';
import ExploreModal from '@/components/Service/Explore/ExploreModal';

const services = [
    { icon: Compass, label: 'Vé tham quan', color: 'from-blue-500 to-blue-600', type: 'ticket' },
    { icon: Train, label: 'Vé tàu', color: 'from-emerald-500 to-green-600', type: 'train' },
    { icon: Plane, label: 'Vé máy bay', color: 'from-red-500 to-rose-600', type: 'flight' },
    { icon: Hotel, label: 'Khách sạn', color: 'from-purple-500 to-pink-600', type: 'hotel' },
    { icon: MapPin, label: 'Khám phá', color: 'from-orange-500 to-amber-600', type: 'explore' },
] as const;

type ServiceType = typeof services[number]['type'];

export default function ServiceGrid() {
    const [openModal, setOpenModal] = useState<ServiceType | null>(null);

    return (
        <>
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-5 px-1">Dịch vụ nhanh</h2>

            {/* Grid - Responsive hoàn hảo */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {services.map((service) => (
                    <motion.button
                        key={service.type}
                        whileHover={{ scale: 1.06, y: -6 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setOpenModal(service.type)}
                        className="
              relative group flex flex-col items-center gap-3
              bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl
              border border-gray-100 overflow-hidden
              transition-all duration-300
            "
                    >
                        {/* Gradient Background Effect */}
                        <div
                            className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 
                bg-gradient-to-br ${service.color} 
                transition-opacity duration-500
              `}
                        />

                        {/* Icon Container */}
                        <div
                            className={`
                relative z-10 w-16 h-16 rounded-2xl 
                bg-gradient-to-br ${service.color} 
                shadow-xl flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300
              `}
                        >
                            <service.icon className="w-9 h-9 text-white drop-shadow-md" />
                        </div>

                        {/* Label */}
                        <span
                            className="
                relative z-10 text-sm font-bold text-gray-800
                group-hover:text-white transition-colors duration-300
                text-center leading-tight px-2
              "
                        >
              {service.label}
            </span>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
                    </motion.button>
                ))}
            </div>

            {/* Modals */}
            <TicketModal isOpen={openModal === 'ticket'} onClose={() => setOpenModal(null)} />
            <TrainModal isOpen={openModal === 'train'} onClose={() => setOpenModal(null)} />
            <FlightModal isOpen={openModal === 'flight'} onClose={() => setOpenModal(null)} />
            <HotelModal isOpen={openModal === 'hotel'} onClose={() => setOpenModal(null)} />
            <ExploreModal isOpen={openModal === 'explore'} onClose={() => setOpenModal(null)} />
        </>
    );
}