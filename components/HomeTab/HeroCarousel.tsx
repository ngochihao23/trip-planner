import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    { url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800', alt: 'Hạ Long Bay' },
    { url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', alt: 'Hội An' },
    { url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800', alt: 'Sapa' },
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-64 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index].url}
                    alt={images[index].alt}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full">
                <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => setIndex((i) => (i + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full">
                <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition ${i === index ? 'bg-white w-6' : 'bg-white/50'}`} />
                ))}
            </div>

            <div className="absolute top-4 left-4 text-white">
                <h1 className="text-2xl font-bold mb-1">Du Lịch Việt Nam</h1>
                <p className="text-sm opacity-90">Khám phá vẻ đẹp non nước</p>
            </div>
        </div>
    );
}