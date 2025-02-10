import React from "react";

const blogs = [
    {
        id: 1,
        title: "Understanding React Performance",
        category: "Tachnology",
        content: "Learn how to optimize your React applications for better performance.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 2,
        title: "Tailwind CSS: The Future of Styling?",
        category: "Nature",
        content: "Discover why Tailwind CSS is gaining popularity among developers.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.magicdecor.in/com/2024/08/29110555/Drona-Mountain-Lake-House-Sunrise-Scenery-Wallpaper-Mural-710x450.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 3,
        title: "Next.js vs React: Which One Should You Use?",
        category: "Artificial Intelligence",
        content: "A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 3,
        title: "Next.js vs React: Which One Should You Use?",
        category: "Artificial Intelligence",
        content: "A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 3,
        title: "Next.js vs React: Which One Should You Use?",
        category: "Artificial Intelligence",
        content: "A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 3,
        title: "Next.js vs React: Which One Should You Use?",
        category: "Artificial Intelligence",
        content: "A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
    {
        id: 3,
        title: "Next.js vs React: Which One Should You Use?",
        category: "Artificial Intelligence",
        content: "A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.A deep dive into the differences between Next.js and React.",
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
        date: "21 Jan, 2025"
    },
];

const BlogCards = () => {
    return (            
            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap w-full pb-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex flex-col md:flex-row bg-white rounded-md shadow-[0px_0px_17px_1px_rgba(0,_0,_0,_0.1)] overflow-hidden w-full  border-red-500 "
                        >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className=" md:w-40 object-cover"
                            />
                        <div className="p-4 flex flex-col justify-center">
                            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                            <span className="text-gray-600">{blog.category}</span>
                            <p className="text-gray-600 mt-2 w-11/12">{blog.content}</p>
                            <div className="w-full flex justify-end ">
                                <span className="text-gray-700">{blog.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default BlogCards;