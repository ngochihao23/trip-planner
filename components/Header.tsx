import { MapPin, Phone } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-[#0B6EFD]" />
                    <span className="font-bold text-xl text-[#0f172a]">Du Lịch VN</span>
                </div>
                <a
                    href="tel:1900xxxx"
                    className="flex items-center gap-2 bg-[#0B6EFD] text-white px-4 py-2 rounded-lg hover:bg-[#0654C6] transition"
                >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">1900 xxxx</span>
                </a>
            </div>
        </header>
    );
}