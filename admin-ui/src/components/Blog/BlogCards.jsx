import React from "react";

const BlogCards = ({data}) => {
    return (            
            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap w-full pb-4">
                {data.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex flex-col md:flex-row bg-white rounded-md shadow-[0px_0px_17px_1px_rgba(0,_0,_0,_0.1)] overflow-hidden w-full  border-red-500 "
                        >
                        <img
                            src={`https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg`}
                            alt={blog.title}
                            className=" md:w-40 object-cover"
                            />
                        <div className="p-4 flex flex-col justify-center">
                            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                            <span className="text-gray-600">{blog.category_name}</span>
                            <p className="text-gray-600 mt-2 w-11/12 line-clamp-3">{blog.content}</p>
                            <div className="w-full flex justify-end ">
                                <span className="text-gray-700">{blog.updatedAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default BlogCards;