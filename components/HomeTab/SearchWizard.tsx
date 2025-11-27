import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, X } from 'lucide-react';
import Image from "next/image";


interface TourResult {
    id: string;
    name: string;
    location: string;
    duration: string;
    price: string;
    rating: number;
    image: string;
    people: number;
}

export default function SearchWizard() {
    const [step, setStep] = useState(1);
    const [searchData, setSearchData] = useState({
        destination: '',
        date: '',
        budget: '',
    });
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<TourResult[] | null>(null);

    const mockTours: TourResult[] = [
        {
            id: '1',
            name: 'Khám phá Vịnh Hạ Long 2N1Đ',
            location: 'Quảng Ninh',
            duration: '2 ngày 1 đêm',
            price: '3.990.000đ',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
            people: 12,
        },
        {
            id: '2',
            name: 'Hội An - Phố cổ đèn lồng',
            location: 'Quảng Nam',
            duration: '3 ngày 2 đêm',
            price: '4.500.000đ',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
            people: 8,
        },
    ];

    const handleSearch = () => {
        setSearching(true);

        setTimeout(() => {
            const hasResults =
                searchData.destination.toLowerCase().includes('hạ long') ||
                searchData.destination.toLowerCase().includes('hội an') ||
                searchData.destination === '';

            setResults(hasResults ? mockTours : []);
            setSearching(false);
        }, 1500);
    };

    const resetSearch = () => {
        setResults(null);
        setStep(1);
        setSearchData({ destination: '', date: '', budget: '' });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4">
            {/* Thanh bước */}
            {!results && (
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((s) => (
                        <button
                            key={s}
                            onClick={() => !searching && setStep(s)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                                step === s ? 'bg-[#0B6EFD] text-white' : 'bg-[#F7FBFF] text-gray-600'
                            } ${searching ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={searching}
                        >
                            {s === 1 && 'Địa điểm'}
                            {s === 2 && 'Thời gian'}
                            {s === 3 && 'Giá cả'}
                        </button>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {!results && !searching && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {step === 1 && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Bạn muốn đi đâu? (VD: Hạ Long, Hội An, Phú Quốc...)"
                                    value={searchData.destination}
                                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B6EFD] text-gray-800"
                                />
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-[#0B6EFD] text-white py-3 rounded-lg font-medium hover:bg-[#0654C6] transition"
                                >
                                    Tiếp theo
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <input
                                    type="date"
                                    value={searchData.date}
                                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B6EFD]"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 border border-gray-300 py-3 rounded-lg font-medium text-gray-600"
                                    >
                                        Quay lại
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex-1 bg-[#0B6EFD] text-white py-3 rounded-lg font-medium hover:bg-[#0654C6]"
                                    >
                                        Tiếp theo
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <select
                                    value={searchData.budget}
                                    onChange={(e) => setSearchData({ ...searchData, budget: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B6EFD]"
                                >
                                    <option value="">Chọn mức giá</option>
                                    <option>Dưới 2 triệu</option>
                                    <option>2-5 triệu</option>
                                    <option>5-10 triệu</option>
                                    <option>Trên 10 triệu</option>
                                </select>
                                <button
                                    onClick={handleSearch}
                                    disabled={!searchData.destination && !searchData.date && !searchData.budget}
                                    className="w-full bg-[#0B6EFD] text-white py-3 rounded-lg font-medium hover:bg-[#0654C6] disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    Tìm kiếm tour
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
                {searching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center"
                    >
                        <div className="inline-block animate-spin w-10 h-10 border-4 border-[#0B6EFD] border-t-transparent rounded-full mb-4" />
                        <p className="text-gray-600 font-medium">Đang tìm tour phù hợp cho bạn...</p>
                    </motion.div>
                )}
                {results !== null && !searching && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 -mx-4 sm:mx-0"
                    >
                        <div className="flex items-center justify-between px-4 sm:px-0">
                            <h3 className="text-lg font-bold text-[#0f172a]">
                                {results.length > 0 ? `Tìm thấy ${results.length} tour` : 'Không tìm thấy'}
                            </h3>
                            <button
                                onClick={resetSearch}
                                className="text-[#0B6EFD] text-sm font-medium flex items-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                Tìm lại
                            </button>
                        </div>

                        {results.length === 0 ? (
                            <div className="text-center py-12 px-4">
                                <div className="bg-gray-100 border-2 border-dashed rounded-2xl w-28 h-28 mx-auto mb-5" />
                                <p className="text-gray-600 font-medium text-lg">
                                    Rất tiếc, chưa có tour phù hợp
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Hãy thử thay đổi địa điểm hoặc mức giá nhé!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 pb-4">
                                {results.map((tour) => (
                                    <motion.div
                                        key={tour.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mx-4 sm:mx-0"
                                    >
                                        <div className="flex flex-col sm:flex-row">
                                            <div className="w-full sm:w-36 h-48 sm:h-auto">
                                                <Image
                                                    src={tour.image}
                                                    alt={tour.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-5 flex-1">
                                                <h4 className="font-bold text-lg text-[#0f172a] line-clamp-2">
                                                    {tour.name}
                                                </h4>
                                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                              {tour.location}
                          </span>
                                                    <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                                                        {tour.duration}
                          </span>
                                                </div>

                                                <div className="flex items-end justify-between mt-4">
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#0B6EFD]">
                                                            {tour.price}
                                                        </p>
                                                        <p className="text-xs text-gray-500">/khách</p>
                                                    </div>
                                                    <button className="bg-[#0B6EFD] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0654C6] transition">
                                                        Xem chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}