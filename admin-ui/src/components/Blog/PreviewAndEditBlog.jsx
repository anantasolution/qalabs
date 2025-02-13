import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import PopUp from './PopUp';
import { formGroupClasses } from '@mui/material';


const PreviewAndEditBlog = ({ placeholder }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const editor = useRef(null);

    // for setting content of texteditor
    const [content, setContent] = useState('');

    //for setting categories
    const [categories, setCategories] = useState([]);

    // for setting if editing or not
    const [isEditing, setIsEditing] = useState(false);

    // setting data of form
    const [blogPost, setBlogPost] = useState({
        title: '',
        category: '',
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
        height: 400,
    }),
        [placeholder]
    );


    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    // for setting image file
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            console.log(previewUrl);
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

        if (!blogPost.category) {
            toast.error("Select category before submiting");
            setIsSubmitting(false);
            return;
        }

        if (!blogPost.content) {
            toast.error("Content is Required.");
            setIsSubmitting(false);
            return;
        }

        const fileData = new FormData();


        if (blogPost.image && blogPost.image instanceof File) {
            fileData.append("image", blogPost.image);
        }

        // fileData.append('image', blogPost.image);
        fileData.append('title', blogPost.title);
        fileData.append('content', blogPost.content);
        fileData.append('category', blogPost.category);

        // console.log(fileData, blogPost);

        try {

            // Simulating API call
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/blogs/updateBlog/${location.state}`, fileData, {
                headers: { "Content-Type": 'multipart/formdata' }
            });


            //settting Updated Data for preview
            setBlogPost({
                category: response.data?.data?.category._id,
                content: parse(response.data?.data?.content),
                image: response.data?.data?.image?.filename,
                title: response.data?.data?.title,
            });

            //setting content empty in for preview 
            setContent(response.data?.data?.content);

            setIsEditing(false);

            toast.success("Blog Updated successfully!")
        } catch (error) {
            console.log("Error in submit", error);
            toast.error(error?.response?.data?.message || "Falied to Update Blog.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // for getting blog data
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs/getSpecificBlog/${location.state}`);
            setBlogPost({
                category: response.data?.data?.category._id,
                content: parse(response.data?.data?.content),
                image: response.data?.data?.image?.filename,
                title: response.data?.data?.title,
            });
            setContent(response?.data?.data?.content);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }


    // for getting data of current blog
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/all`);
                setCategories(response.data.data);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }

        }

        getCategories();
        fetchData();
    }, [])


    const [deletePopup, setDeletePopUp] = useState(false);

    const onClose = () => {
        setDeletePopUp(false);
    }

    const onConfirm = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/blogs/deleteBlog/${location.state}`);
            toast.success("Blog deleted successfully.");
            navigate("/admin/blogs/allblogs");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete blog.");
        }
    }
    return (
        <>
            {deletePopup &&
                <div className='relative border'>
                    <PopUp isOpen={deletePopup} blogTitle={blogPost.title} onClose={onClose} onConfirm={onConfirm} />
                </div>

            }
            <section className="flex flex-col">
                {/* Navbar code */}
                <div className="w-full flex items-center justify-between p-4 bg-white border-b">
                    {/* Left side - Breadcrumbs */}
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-500">Home</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">{isEditing ? "Edit Blog" : "Blog"}</span>
                    </div>
                </div>
            </section>
            {isEditing ? <div className='h-[88.5%] overflow-y-auto'>
                <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                        <div className='flex w-full justify-between items-center mb-8'>
                            <h1 className="text-2xl sm:text-3xl font-bold text-center">{isEditing ? "Edit blog" : "Blog"}</h1>
                            <div className='flex gap-5'>
                                <button className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border ${isEditing ? "bg-red-500 hover:bg-red-600" : ""}`} onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Disable Edit" : "Edit"} </button>
                                <button onClick={()=> setDeletePopUp(true)} className='px-6 py-2 text-white rounded transition-colors border bg-red-500 hover:bg-red-700'>Delete</button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-9">
                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Image
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-4 text-center  ${blogPost.image ? '' : 'border-gray-300 h-[300px]'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    {blogPost.image ? (
                                        <div className="relative">
                                            <img
                                                src={!blogPost.imagePreview ? `${process.env.REACT_APP_API_BASE}/${blogPost?.image}` : `${blogPost?.imagePreview}`}
                                                alt={blogPost?.title}
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
                                            className="cursor-pointer flex flex-col justify-center items-center h-full"
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
                                    onChange={(newContent) => { setBlogPost(prev => ({ ...prev, content: newContent })) }}
                                />
                            </div>
                            <div className=' space-y-4'>
                                <label htmlFor="preview" className='font-medium'>Preview</label>
                                <div id='preview' className={`${!content ? 'h-[350px]' : 'h-[350px] overflow-y-scroll'}`} dangerouslySetInnerHTML={{ __html: content }} />
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
                                    ) : 'Publish edit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                :
                <div className='h-[88.5%] overflow-y-auto'>
                    <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                            <div className='flex w-full justify-between items-center mb-8'>
                                <h1 className="text-2xl sm:text-3xl font-bold text-center">{isEditing ? "Edit blog" : "Blog"}</h1>
                                <button className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border ${isEditing ? "bg-red-500 hover:bg-red-600" : ""}`} onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Disable Edit" : "Edit"} </button>
                            </div>

                            <form className="space-y-9">
                                {/* Image Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blog Image
                                    </label>
                                    <div
                                        className={`border-2 rounded-lg p-4 text-center`}
                                    >
                                        {blogPost?.image ? (
                                            <div className="relative">
                                                <img
                                                    src={`${process.env.REACT_APP_API_BASE}/${blogPost?.image}`}
                                                    className="max-h-64 mx-auto rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="cursor-pointer"
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
                                            className="w-full px-4 py-2 border rounded-lg "
                                            placeholder="Enter your blog title"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                            Blog Category
                                        </label>
                                        <select
                                            id="category"
                                            value={blogPost.category}
                                            className="w-full px-4 py-2 border rounded-lg bg-white"
                                            disabled
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
                                <div className=' space-y-4'>
                                    <label htmlFor="preview" className='font-medium'>Blog Content</label>
                                    <div id='preview' className={`${!content ? 'h-[350px]' : 'h-[350px] overflow-y-scroll'}`} dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PreviewAndEditBlog;