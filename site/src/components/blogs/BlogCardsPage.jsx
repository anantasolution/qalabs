import React from 'react';

// importing image
import blogimage from "../../assets/blogimage.jpg"
import { Link } from 'react-router-dom';

const BlogCardsPage = () => {
    const blogPosts = [
        {
            id: 1,
            tag: 'VISUAL CONTENT',
            title: 'The Role of Visual Content in Web Design: How Images and Videos Impact User Engagement',
            image: '/api/placeholder/800/600',
            date: 'June 21, 2024',
            comments: 'No Comments',
            description: 'Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience. A well-designed website can lead to higher conversion rates,'
        },
        {
            id: 2,
            tag: 'MOBILE OPTIMIZATION',
            title: 'Mobile Optimization: Why Your Website Needs to Be Mobile-Friendly in 2024',
            image: '/api/placeholder/800/600',
            date: 'June 21, 2024',
            comments: 'No Comments',
            description: 'Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience. A well-designed website can lead to higher conversion rates,'
        },
        {
            id: 3,
            tag: 'CASE STUDIES',
            title: 'Case Study: Transforming a Local Business with a New Website Design',
            image: '/api/placeholder/800/600',
            date: 'June 21, 2024',
            comments: 'No Comments',
            description: 'Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience. A well-designed website can lead to higher conversion rates,'
        },
        {
            id: 4,
            tag: 'MOBILE OPTIMIZATION',
            title: 'Mobile Optimization: Why Your Website Needs to Be Mobile-Friendly in 2024',
            image: '/api/placeholder/800/600',
            date: 'June 21, 2024',
            comments: 'No Comments',
            description: 'Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience. A well-designed website can lead to higher conversion rates,'
        },
        {
            id: 5,
            tag: 'CASE STUDIES',
            title: 'Case Study: Transforming a Local Business with a New Website Design',
            image: '/api/placeholder/800/600',
            date: 'June 21, 2024',
            comments: 'No Comments',
            description: 'Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience. A well-designed website can lead to higher conversion rates,'
        },
    ];

    return (
        <>
        <Link to={"/blogsarchive/blog"}>
            <div className="flex px-4 py-12 bg-[#151515] w-full justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-10/12 place-items-center">
                    {blogPosts.map((post) => (
                        <div
                        key={post.id}
                            className="bg-[#242424] rounded-lg overflow-hidden transition-transform duration-300 cursor-pointer"
                            >
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={blogimage}
                                    alt={post.title}
                                    className="w-full h-full object-cover bg-black opacity-80 hover:opacity-100 transition-all duration-300"
                                />
                                <span className="absolute top-4 right-4 bg-slate-900/50 text-white px-4 py-1 rounded-full text-sm">
                                    {post.tag}
                                </span>
                            </div>

                            {/* Content Container */}
                            <div>
                                <div className='p-6'>
                                    <h3 className="text-xl text-white mb-4 transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-[#777777] mb-2">
                                        {post.description}
                                    </p>
                                </div>

                                {/* Meta Information */}
                                <div className="flex items-center space-x-4 text-sm border-t border-[#777777] text-[#777777] p-4">
                                    <div className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                        </svg>
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                        </svg>
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
        </>
    );
};

export default BlogCardsPage;