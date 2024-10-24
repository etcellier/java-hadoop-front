"use client";

import {FileUpload} from '@/components/FileUpload';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
                        Upload Your Files
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto px-4">
                        Seamlessly process and manage your text files
                    </p>
                </div>
                <FileUpload/>
            </div>
        </div>
    );
}
