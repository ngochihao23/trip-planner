import HeroCarousel from './HeroCarousel';
import SearchWizard from './SearchWizard';
import ServiceGrid from './ServiceGrid';
import UtilityList from './UtilityList';
import { motion } from 'framer-motion';

export default function HomeTab() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            <HeroCarousel />
            <div className="px-4 -mt-8 relative z-10">
                <SearchWizard />
            </div>
            <div className="px-4 mt-8">
                <ServiceGrid />
            </div>
            <div className="px-4 mt-8">
                <UtilityList />
            </div>
        </motion.div>
    );
}