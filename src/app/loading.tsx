
'use client'

import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Page() {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
            <div className="mb-8">
                <ClipLoader color="#0ea5e9" loading={true} size={80} />
            </div>
        </div>
    );
}
