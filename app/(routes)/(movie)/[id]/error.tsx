'use client';

import Link from 'next/link';
import React from 'react';

const Error = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Oops! Something went wrong.</h1>
            <p>We couldn&apos;t find the page you were looking for.</p>
            <Link href="/" className='flex justify-center items-center rounded-full bg-gray-700 p-3 mt-4'>Go back to Home</Link>
        </div>
    );
};

export default Error;