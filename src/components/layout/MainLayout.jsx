import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileModal from './ProfileModal';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const location = useLocation();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 font-outfit overflow-x-hidden">
            <Sidebar onOpenProfile={() => setIsProfileModalOpen(true)} />

            <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                <Navbar onOpenProfile={() => setIsProfileModalOpen(true)} />

                <main className="pt-24 px-4 sm:px-8 pb-12 flex-1 w-full mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto w-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
                <div className="px-4 sm:px-8">
                    <Footer />
                </div>
            </div>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </div>
    );
};

export default MainLayout;
