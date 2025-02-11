import React, { useState, useRef } from 'react';

const BlogCreationForm = ({setShow}) => {
    const [blogPost, setBlogPost] = useState ({
        title: '',
        content: '',
        image: null,
        imagePreview: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', isError: false });
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setBlogPost(prev => ({
                ...prev,
                image: file,
                imagePreview: previewUrl
            }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            setBlogPost(prev => ({
                ...prev,
                image: file,
                imagePreview: previewUrl
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', isError: false });

        try {
            // Here you would typically send the data to your backend
            console.log('Blog post to be submitted:', blogPost);

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setMessage({ text: 'Blog post created successfully!', isError: false });
            // Reset form
            setBlogPost({
                title: '',
                content: '',
                image: null,
                imagePreview: ''
            });
        } catch (error) {
            setMessage({ text: 'Failed to create blog post. Please try again.', isError: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-2/5">
                <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Create New Blog</h1>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Image
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-4 text-center ${blogPost.imagePreview ? 'border-green-500' : 'border-gray-300'
                                }`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {blogPost.imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={blogPost.imagePreview}
                                        alt="Preview"
                                        className="max-h-64 mx-auto rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        onClick={() => setBlogPost(prev => ({ ...prev, image: null, imagePreview: '' }))}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="text-gray-500">
                                        <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm">Drag and drop an image here, or click to select</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={blogPost.title}
                            onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2 border rounded-lg "
                            placeholder="Enter your blog title"
                            required
                        />
                    </div>

                    {/* Content Input */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Content
                        </label>
                        <textarea
                            id="content"
                            value={blogPost.content}
                            onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your blog content here..."
                            rows={8}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                   <div className='flex gap-5 justify-center items-center'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={` w-full sm:wauto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Publishing...
                                </span>
                            ) : 'Publish'}
                        </button>
                        <button onClick={e => setShow(false)} className={`w-full sm:wauto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors`}>
                            Cancel
                        </button>
                   </div>
                </form>
            </div>
        </div>
    );
};

export default BlogCreationForm;