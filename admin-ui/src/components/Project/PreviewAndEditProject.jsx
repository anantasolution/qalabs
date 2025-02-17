import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import PopUp from './PopUp';

const PreviewAndEditProject = ({ placeholder }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const editor = useRef(null);

    // for setting content of texteditor
    const [content, setContent] = useState('');

    // for setting if editing or not
    const [isEditing, setIsEditing] = useState(false);

    // setting data of form
    const [project, setProject] = useState({
        title: '',
        description: '',
        photo: null,
        photoPreview: ''
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
            setProject(prev => ({
                ...prev,
                photo: file,
                photoPreview: previewUrl
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
        if (file && file.type.startsWith('photo/')) {
            const previewUrl = URL.createObjectURL(file);
            setProject(prev => ({
                ...prev,
                photo: file,
                photoPreview: previewUrl
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!project.title) {
            toast.error("Title is required.");
            setIsSubmitting(false);
            return;
        }

        if (!project.description) {
            toast.error("Description is required.");
            setIsSubmitting(false);
            return;
        }

        const fileData = new FormData();

        if (project.photo && project.photo instanceof File) {
            fileData.append("photo", project.photo);
        }

        fileData.append('title', project.title);
        fileData.append('description', project.description);

        try {
            // Simulating API call
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/project/updateproject/${location.state}`, fileData, {
                headers: { "Content-Type": 'multipart/formdata' }
            });

            console.log(response);
            // Setting updated data for preview
            setProject({
                title: response.data?.updatedProject.title,
                description:parse(response.data?.updatedProject.description),
                photo: response.data?.updatedProject?.photo?.filename,
            });

            // Setting content empty for preview
            setContent(response.data?.updatedProject?.description);

            setIsEditing(false);

            toast.success("Project updated successfully!")
        } catch (error) {
            console.log("Error in submit", error);
            toast.error(error?.response?.data?.message || "Failed to update project.");
        } finally {
            setIsSubmitting(false);
        }
    };
      console.log(location.state); 

      console.log(project)

    // for getting project data
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/project/getproject/${location.state}`);
            console.log(response.data);
            setProject({
                title: response.data?.title,
                description: parse(response.data?.description),
                photo: response.data?.photo?.filename,
            });
            setContent(response?.data?.description);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    // for getting data of current project
    useEffect(() => {
        fetchData();
    }, [])

    const [deletePopup, setDeletePopUp] = useState(false);

    const onClose = () => {
        setDeletePopUp(false);
    }

    console.log(process.env.REACT_APP_API_BASE_PROJECT)

    const onConfirm = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/project/deleteproject/${location.state}`);
            toast.success("Project deleted successfully.");
            navigate("/admin/projects/allprojects");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete project.");
        }
    }



    return (
        <>
            {deletePopup &&
                <div className='relative border'>
                    <PopUp isOpen={deletePopup} projectTitle={project.title} onClose={onClose} onConfirm={onConfirm} />
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
                        <span className="text-gray-400">{isEditing ? "Edit Project" : "Project"}</span>
                    </div>
                </div>
            </section>
            {isEditing ? <div className='h-[88.5%] overflow-y-auto'>
                <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                        <div className='flex w-full justify-between items-center mb-8'>
                            <h1 className="text-2xl sm:text-3xl font-bold text-center">{isEditing ? "Edit Project" : "Project"}</h1>
                            <div className='flex gap-5'>
                                <button className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border ${isEditing ? "bg-red-500 hover:bg-red-600" : ""}`} onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Disable Edit" : "Edit"} </button>
                                <button onClick={() => setDeletePopUp(true)} className='px-6 py-2 text-white rounded transition-colors border bg-red-500 hover:bg-red-700'>Delete</button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-9">
                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Image
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-4 text-center  ${project.photo ? '' : 'border-gray-300 h-[300px]'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    {project.photo ? (
                                        <div className="relative">
                                            <img
                                                src={!project.photoPreview ? `${process.env.REACT_APP_API_BASE_PROJECT}/${project?.photo}` : `${project?.photoPreview}`}
                                                alt={project?.title}
                                                className="max-h-64 mx-auto rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                                onClick={() => setProject(prev => ({ ...prev, photo: null, photoPreview: '' }))}
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

                            {/* Title and Description Input*/}
                            <div className='grid md:grid-cols-2 gap-5 py-3 '>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={project.title}
                                        onChange={(e) => setProject(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-4 py-2 border rounded-lg "
                                        placeholder="Enter your project title"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Description
                                </label>
                                <JoditEditor
                                    id='description'
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1}
                                    onBlur={(newContent) => setContent(newContent)}
                                    onChange={(newContent) => { setProject(prev => ({ ...prev, description: newContent })) }}
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
                                <h1 className="text-2xl sm:text-3xl font-bold text-center">{isEditing ? "Edit Project" : "Project"}</h1>
                                <button className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border ${isEditing ? "bg-red-500 hover:bg-red-600" : ""}`} onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Disable Edit" : "Edit"} </button>
                            </div>

                            <form className="space-y-9">
                                {/* Image Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Image
                                    </label>
                                    <div
                                        className={`border-2 rounded-lg p-4 text-center`}
                                    >
                                        {project?.photo ? (
                                            <div className="relative">
                                                <img
                                                    src={`${process.env.REACT_APP_API_BASE_PROJECT}/${project?.photo}`}
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

                                {/* Title and Description Input*/}
                                <div className='grid md:grid-cols-2 gap-5 py-3 '>
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Project Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={project.title}
                                            className="w-full px-4 py-2 border rounded-lg "
                                            placeholder="Enter your project title"
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* Description Input */}
                                <div className=' space-y-4'>
                                    <label htmlFor="preview" className='font-medium'>Project Description</label>
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

export default PreviewAndEditProject;