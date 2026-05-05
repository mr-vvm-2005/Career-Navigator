import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-slate-200 py-10">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <span>Created with</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                    <span>for students globally</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-slate-200"></div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-[0.3em]">
                        Designed by <span className="text-indigo-600">Mr-vvm</span>
                    </p>
                    <div className="h-[1px] w-8 bg-slate-200"></div>
                </div>

                <p className="text-xs text-slate-400 font-medium">
                    © {new Date().getFullYear()} CareerNavigator. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
