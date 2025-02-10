import React, { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import blogimage from "../../assets/blogimage.jpg"
import SocialShare from './SocialShare';

const BlogContent = () => {

    const categories = [
        'Case Studies',
        'Visual Content',
        'Web Design Trends',
        'SEO & Digital Marketing',
        'Mobile Optimization',
        'User Experience'
    ];

    return (
        <div className="min-h-screen bg-[#151515] text-gray-300 w-full flex justify-center py-5">
            {/* Main Content and Sidebar */}
            <div className="flex flex-col lg:flex-row w-10/12 gap-3 md:gap-10 ">
                {/* Main Content */}

                <div className="flex flex-col gap-1  border-blue-400 text-lg">
                    <section className="bg-[#151515] flex flex-col text-white w-11/12 gap-6">
                            <p className="text-gray-400">
                                Creating a user-friendly website is crucial for engaging visitors and ensuring they have a positive experience.
                                A well-designed website can lead to higher conversion rates, better SEO rankings, and increased customer satisfaction.
                            </p>
                        <p className="text-gray-400">
                            First, focus on simplicity. A clean and straightforward design helps users navigate your site without confusion. Avoid clutter by using white space effectively and keeping the number of elements on each page to a minimum. This approach enhances readability and directs attention to important content.
                        </p>
                        <p className="text-gray-400">
                            Second, ensure your website is mobile-friendly. With the increasing use of smartphones and tablets, it’s essential that your site looks and functions well on all devices. Use responsive design techniques to adapt your site’s layout to different screen sizes, providing a seamless experience for all users.
                        </p>
                    </section>

                    {/* Loading Times Section */}
                    <section className="bg-[#151515] flex justify-center pb-5">
                        <div className="max-w-4xl flex flex-col gap-4 text-gray-400">
                            <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                                <img
                                    src={blogimage}
                                    alt="Female programmer writing code on a laptop"
                                    className="w-full md:w-1/2 rounded-lg"
                                />
                            </div>

                            <p >
                                Third, prioritize fast loading times. Slow websites frustrate users and
                                lead to higher bounce rates. Optimize images, use efficient coding
                                practices, and leverage browser caching to improve your site’s
                                performance. Aim for your pages to load within three seconds to keep
                                users engaged.
                            </p>

                            <p >
                                Fourth, create intuitive navigation. Users should be able to find what
                                they’re looking for with minimal effort. Use a clear and consistent menu
                                structure, and include a search bar for easy access to specific content.
                                Properly labeled buttons and links also guide users through your site
                                effectively.
                            </p>

                            <p>
                                Fifth, ensure your content is accessible. Use readable fonts, sufficient
                                color contrast, and descriptive alt text for images. These practices not
                                only help users with disabilities but also improve overall user
                                experience and SEO.
                            </p>

                            <p>
                                Finally, gather user feedback. Regularly ask your visitors for their
                                opinions and use analytics tools to track their behavior. This data
                                provides valuable insights into areas where your website can improve,
                                helping you make informed decisions to enhance user experience.
                            </p>

                            <p >
                                By implementing these seven tips, you can create a website that is not
                                only visually appealing but also user-friendly and functional. A
                                well-designed website can significantly impact your business’s success
                                and reputation online.
                            </p>
                        </div>
                    </section>

                    <SocialShare />

                    {/* Author details */}
                    {/* <section className="flex items-center space-x-4 p-6 bg-[#242424] rounded-xl">
                        <div className=" rounded-full overflow-hidden">
                            <img
                                src={blogimage}
                                alt="Author"
                                className="h-16 w-16  object-cover"
                            />
                        </div>
                        <div>
                            <h3 className=" font-semibold ">Natalie Stanley</h3>
                            <p className="text-sm text-gray-400">
                                Hi, this is dummy biographical info for the design template kit moxcreative.
                                If any questions do hesitate to send us a message on the profile page ThemeForest.
                            </p>
                        </div>
                    </section> */}

                    {/* Comment Form */}
                    {/* <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Leave a Reply</h2>
                        <p className="text-sm text-gray-400 mb-6">
                            Your email address will not be published. Required fields are marked *
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                                    Comment *
                                </label>
                                <textarea
                                    id="comment"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500  focus:border-transparent"
                                />
                            </div>

                            
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500  focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg focus:outline-none focus:border focus:border-green-500 focus:border-transparent"
                                    />
                                </div>

                            {/* Website Input */}
                    {/* <div>
                                <label
                                    htmlFor="website"
                                    className="block text-lg font-medium text-gray-200 mb-2"
                                >
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#242424] border border-gray-700 rounded-lg 
                                     text-gray-200 focus:outline-none focus:border focus:border-green-500 focus:border-transparent
                                     transition-colors duration-200"
                                />
                            </div> */}

                    {/* Remember Me Checkbox */}
                    {/* <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 
                                     text-green-500 focus:ring-2 focus:ring-green-500"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-gray-200"
                                >
                                    Save my name, email, and website in this browser for the next time I comment.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-400 text-black font-medium rounded-full hover:bg-green-500 transition-colors duration-200"
                            >
                                Post Comment
                            </button>
                        </form>
                    </section> */}
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-8/12 flex flex-col justify-center md:justify-start">

                    <div className='px-3 space-y-4'>

                        {/* Popular Categories */}
                        <div className="bg-[#242424] rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-white">Popular Categories</h2>
                            <ul className="space-y-3">
                                {categories.map((category, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="text-green-400">↗</span>
                                        <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="bg-[#030303] rounded-xl p-6">
                            <h2 className="text-xl  mb-4 text-white">Newsletter</h2>
                            <p className='pb-5 text-gray-400'>
                                Signup our newsletter to get update information, news, insight or promotions.
                            </p>
                            <input
                                type="Name"
                                placeholder="Enter your Name"
                                className="w-full px-4 py-2 mb-3 bg-[#242424] rounded-full text-white focus:outline-none focus:border focus:border-green-400"
                            />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mb-3 bg-[#242424] rounded-full text-white focus:outline-none focus:border focus:border-green-400"
                            />
                            <button className="w-full bg-green-400 text-gray-900 py-2 flex justify-center items-center gap-2 rounded-full hover:bg-green-500 transition-colors">
                                <Mail />
                                Sign up
                            </button>
                        </div>

                        {/* Latest posts  */}
                        <div className="bg-[#242424] p-8 rounded-lg">
                            <h2 className="text-2xl  mb-6">Latest Post</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "The Role of Visual Content in Web Design",
                                        date: "June 21, 2024",
                                        image: blogimage
                                    },
                                    {
                                        title: "The Role of Visual Content in Web Design",
                                        date: "June 21, 2024",
                                        image: blogimage
                                    },
                                    {
                                        title: "The Role of Visual Content in Web Design",
                                        date: "June 21, 2024",
                                        image: blogimage
                                    },
                                    {
                                        title: "Mobile Optimization: Why Your Website Needs to Be Mobile-Friendly",
                                        date: "June 21, 2024",
                                        image: blogimage
                                    }
                                ].map((post, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium hover:text-blue-400 transition-colors duration-200">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-400">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;