import React from 'react';
import { CalendarDays } from 'lucide-react';

const BlogHeroSection = ({data}) =>{

   
    return (
        <div className="relative pb-10  md:pb-0 md:min-h-[600px] w-full">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_BASE}/${data?.image})`,
                }}
            >
                {/* Dark Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 lg:px-12 md:pt-12 md:h-[600px]">
                {/* Tag */}
                <span className="bg-green-400 text-white px-4 py-1 rounded-lg text-sm mb-8">
                    {data?.category?.charAt(0).toUpperCase() + data?.category?.slice(1)}
                </span>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center  max-w-4xl leading-tight text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
                    {data?.title}
                </h1>

                {/* Meta Information */}
                <div className="pt-8 text-white/80">
                    <div className="flex items-center gap-1">
                        <CalendarDays className='text-[#BAFE6D]' />
                        <span>{data?.updatedAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogHeroSection;