import React, { useState, useRef, useMemo, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import JoditEditor from 'jodit-react'; 
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddBlog = ({ placeholder }) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);

    const [blogPost, setBlogPost] = useState({
        title: '',
        category :'',
        content: '',
        image: null,
        imagePreview: ''
    });

    // Editor configurations
    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...',
        toolbarAdaptive: false, // Ensures the toolbar is always visible
        toolbarSticky: true, // Toolbar stays fixed while scrolling
        uploader: {
            insertImageAsBase64URI: true, // Allows direct image upload as base64 (No server needed)
        },
        buttons: [
            "bold", "italic", "underline", "strikethrough", "|",
            "ul", "ol", "|",
            "image", "link", "brush", "|",
            "align", "font", "fontsize", "|",
            "undo", "redo", "eraser", "|",
            "source"
        ], // Customize buttons
        height : 400,
    }),
        [placeholder]
    );


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

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if(!blogPost.category){
            toast.error("Select category before submiting");
            setIsSubmitting(false);
            return;
        }

        if(!blogPost.content){
            toast.error("Content is Required.");
            setIsSubmitting(false);
            return;
        }

        const fileData = new FormData();

        fileData.append('image',blogPost.image);
        fileData.append('title',blogPost.title);
        fileData.append('content',blogPost.content);
        fileData.append('category',blogPost.category);

        try {

            // Simulating API call
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/blogs/createBlog`,fileData,{
                headers: {"Content-Type":'multipart/formdata'}
            });

            toast.success("Blog created successfully!");

            navigate("/admin/blogs/allblogs")            
            // Reset form
            setBlogPost({
                title: '',
                category :'',
                content: '',
                image: null,
                imagePreview: ''
            });

            //setting content empty in texteditor 
            setContent("");
        } catch (error) {
            setMessage({ text: 'Failed to create blog post. Please try again.', isError: true });
            console.log("Error in submit",error);
            toast.error(error?.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(()=>{
        const getCategories = async ()=>{
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/all`);
                console.log(response);
                setCategories(response.data.data);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
           
        }

        getCategories();
    },[])

    return (
        <>
            <section className="flex flex-col">
                {/* Navbar code */}
                <div className="w-full flex items-center justify-between p-4 bg-white border-b">
                    {/* Left side - Breadcrumbs */}
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500">Home</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">Add Blogs</span>
                        
                    </div>
                </div>
            </section>
            <div className='h-[88.5%] overflow-y-auto'>
                <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Create New Blog</h1>

                        <form onSubmit={handleSubmit} className="space-y-9">
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

                            {/* Title and Category Input*/}
                            <div className='grid md:grid-cols-2 gap-5 py-3 '>
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
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Blog Category
                                    </label>
                                    <select
                                        id="category"
                                        value={blogPost.category}
                                        onChange={(e) => setBlogPost(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-4 py-2 border rounded-lg bg-white"
                                        required
                                    >
                                        <option value={undefined}>Select Category</option>
                                        {
                                            categories.map((val, i) => (
                                                <option key={i} value={val?._id}>{val?.category_name?.charAt(0).toUpperCase()}{val?.category_name?.slice(1)}</option>
                                            ))
                                        }
                                        
                                    </select>
                                </div>

                            </div>

                            {/* Content Input */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Content
                                </label>
                                <JoditEditor
                                    id='content'
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1}
                                    onBlur={(newContent) => setContent(newContent)}
                                    onChange={(newContent) => {setBlogPost(prev=> ({...prev, content : newContent})) }}
                                />
                            </div>
                            <div className=' space-y-4'>
                                <label htmlFor="preview" className='font-medium'>Preview</label>
                                <div id='preview' dangerouslySetInnerHTML={{ __html: content }} />
                            </div>

                            {/* Submit Button */}

                            <div className='w-full flex justify-end items-center'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={` sm:wauto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBlog;