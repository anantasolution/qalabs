import React from 'react';
import {  useNavigate } from 'react-router-dom';

const BlogCardsPage = ({ data }) => {

    const navigate = useNavigate();

    const handleBlog = (id) => {
        navigate("/blogsarchive/blog", { state: id });
    }

    return (
        <>
            <div>
                <div className="flex md:px-4 py-12 bg-[#151515] justify-center overflow-hidden w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-10/12 place-items-start">
                        {data.map((post, index) => 
                            <div
                                key={index }
                                onClick={() => handleBlog(post?._id)}
                                className="bg-[#242424] rounded-lg overflow-hidden transition-transform duration-300 cursor-pointer w-full"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video overflow-hiddenw w-full flex justify-center items-center bg-black">
                                    <img
                                        src={`${process.env.REACT_APP_API_BASE}/${post?.image?.filename}`}
                                        alt={post?.title}
                                        className="h-full object-contain bg-black opacity-80 hover:opacity-100 transition-all duration-300"
                                    />
                                    <span className="absolute top-4 right-4 bg-slate-900/60 text-white px-4 py-1 rounded-full text-sm">
                                        {post?.category_name?.charAt(0).toUpperCase() + post?.category_name?.slice(1)}
                                    </span>
                                </div>

                                {/* Content Container */}
                                <div className=''>
                                    <div className='p-6'>
                                        <h3 className="text-xl text-white mb-4 transition-colors">
                                            {post?.title}
                                        </h3>
                                        <p className={`text-[#777777] mb-2 line-clamp-4`}>
                                            {post?.content} jhgdjhgjdgjdgjdfghjkhgfdsfghjkhgfdghjkhgfdghjhgfdghjhgfdghjhgfdghjgfdgjhgfdsfghjhgfdghjhgfghjhgfdddddddghjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhh
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
                                            <span>{post?.updatedAt}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCardsPage;