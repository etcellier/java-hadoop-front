"use client";

import React, {useState, useCallback} from 'react';
import {Upload} from 'lucide-react';

interface UploadStatus {
    type: 'success' | 'error';
    message: string;
}

export function FileUpload() {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
    const [dragCounter, setDragCounter] = useState<number>(0);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev - 1);
        if (dragCounter - 1 === 0) {
            setIsDragging(false);
        }
    }, [dragCounter]);

    const handleFile = useCallback((file: File) => {
        if (file && file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result as string;
                setFileContent(result);
                setUploadStatus({
                    type: 'success',
                    message: 'File loaded successfully!'
                });
            };
            reader.onerror = () => {
                setUploadStatus({
                    type: 'error',
                    message: 'Error reading file.'
                });
            };
            reader.readAsText(file);
        } else {
            setUploadStatus({
                type: 'error',
                message: 'Please upload a valid text file (.txt)'
            });
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setDragCounter(0);

        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            {/* Zone de dépôt principale */}
            <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                    relative rounded-xl sm:rounded-2xl border-2 border-dashed
                    transition-all duration-300 ease-in-out
                    p-6 sm:p-8 lg:p-12
                    min-h-[200px] 
                    flex items-center justify-center
                    group
                    ${isDragging
                    ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
                    : 'border-gray-300 hover:border-gray-400 bg-white/50 hover:shadow-md'
                }
                `}
            >
                {/* Zone de dépôt overlay */}
                {isDragging && (
                    <div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-500/10 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="text-blue-600 text-xl font-medium animate-pulse">
                            Release to upload file
                        </div>
                    </div>
                )}

                {/* Input file caché */}
                <input
                    type="file"
                    accept=".txt"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* Contenu principal */}
                <div className="flex flex-col items-center gap-4 sm:gap-6 p-4">
                    <div className={`
                        p-4 sm:p-5 rounded-full bg-gray-100
                        transition-all duration-300
                        ${isDragging ? 'bg-blue-100 scale-110' : 'group-hover:bg-gray-200'}
                    `}>
                        <Upload
                            className={`
                                h-8 w-8 sm:h-10 sm:w-10
                                transition-colors duration-300
                                ${isDragging ? 'text-blue-500' : 'text-gray-600 group-hover:text-gray-800'}
                            `}
                        />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-lg sm:text-xl font-medium text-gray-700">
                            Drop your file here, or <span className="text-blue-500">browse</span>
                        </p>
                        <p className="text-sm sm:text-base text-gray-500">
                            Supports .txt files
                        </p>
                    </div>
                </div>
            </div>

            {/* Affichage du contenu du fichier */}
            {fileContent && (
                <div
                    className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden animate-slide-up">
                    <div className="p-4 sm:p-6">
                        <pre
                            className="whitespace-pre-wrap text-sm text-gray-700 max-h-64 sm:max-h-96 overflow-y-auto">
                            {fileContent}
                        </pre>
                    </div>
                </div>
            )}

            {/* Notifications */}
            {uploadStatus && (
                <div className={`
                    fixed top-4 right-4 p-4 rounded-lg shadow-lg
                    transition-all duration-300
                    max-w-[calc(100vw-2rem)] sm:max-w-sm
                    z-50 animate-slide-in
                    ${uploadStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}
                `}>
                    <p className="text-sm sm:text-base">
                        {uploadStatus.message}
                    </p>
                </div>
            )}
        </div>
    );
}
