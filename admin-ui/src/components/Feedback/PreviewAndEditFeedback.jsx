import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from "html-react-parser";

const PreviewAndEditFeedback = ({ placeholder }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editor = useRef(null);

  // State for the review message content (rich text)
  const [content, setContent] = useState('');

  // Toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Feedback state contains the fields for feedback
  const [feedback, setFeedback] = useState({
    name: '',
    designation: '',
    reviewMessage: '',
    profilePicture: '',
    profilePicturePreview: ''
  });

  // Editor configuration
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...',
    toolbarAdaptive: false,
    toolbarSticky: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      "bold", "italic", "underline", "strikethrough", "|",
      "ul", "ol", "|",
      "image", "link", "brush", "|",
      "align", "font", "fontsize", "|",
      "undo", "redo", "eraser", "|",
      "source"
    ],
    height: 400,
  }), [placeholder]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Handle image change (for profile picture)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFeedback(prev => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: previewUrl
      }));
    }
  };

  // Drag and drop events for the image file
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => { 
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('profilePicture/')) {
      const previewUrl = URL.createObjectURL(file);
      setFeedback(prev => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: previewUrl
      }));
    }
  };
  console.log(location.state)

  // Submit update for the feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!feedback.name) {
      toast.error("Name is required.");
      setIsSubmitting(false);
      return;
    }

    if (!feedback.designation) {
      toast.error("Designation is required.");
      setIsSubmitting(false);
      return;
    }

    if (!feedback.reviewMessage) {
      toast.error("Review message is required.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    if (feedback.profilePicture && feedback.profilePicture instanceof File) {
      formData.append("profilePicture", feedback.profilePicture);
    }
    formData.append('name', feedback.name);
    formData.append('designation', feedback.designation);
    formData.append('reviewMessage', feedback.reviewMessage);
 
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/feedback/updatefeedback/${location.state}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response);

      // Update state with returned updated feedback data
      setFeedback({
        name: response.data?.updatedFeedback.name,
        designation: response.data?.updatedFeedback.designation,
        reviewMessage: response.data?.updatedFeedback.reviewMessage,
        profilePicture: response.data?.updatedFeedback.profilePicture,
        profilePicturePreview: ''
      });
      setContent(response.data?.updatedFeedback.reviewMessage);
      setIsEditing(false);
      toast.success("Feedback updated successfully!");
    } catch (error) {
      console.log("Error updating feedback", error);
      toast.error(error?.response?.data?.message || "Failed to update feedback.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  // Fetch feedback data using its ID (passed via location.state)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/feedback/Getallfeedback/${location.state}`
      );
      setFeedback({
        name: response.data?.name,
        designation: response.data?.designation,
        reviewMessage: response.data?.reviewMessage,
        profilePicture: response.data?.profilePicture,
        profilePicturePreview: ''
      });
      setContent(response.data?.reviewMessage);
    } catch (error) {
      console.log("Error fetching feedback", error);
      toast.error(error?.response?.data?.message || "Failed to fetch feedback.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="flex flex-col">
        <div className="w-full flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">Home</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">{isEditing ? "Edit Feedback" : "Feedback"}</span>
          </div>
        </div>
      </section>
      {isEditing ? (
        <div className='h-[88.5%] overflow-y-auto'>
          <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
              <div className='flex w-full justify-between items-center mb-8'>
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                  {isEditing ? "Edit Feedback" : "Feedback"}
                </h1>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Disable Edit" : "Edit"}
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-9">
                {/* Profile Picture Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${feedback.profilePicture ? '' : 'border-gray-300 h-[300px]'}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {feedback.profilePicture ? (
                      <div className="relative">
                        <img
                          src={
                            !feedback.profilePicturePreview
                              ? `${process.env.REACT_APP_API_BASE_FEEDBACK}/${feedback.profilePicture}`
                              : `${feedback.profilePicturePreview}`
                          }
                          alt={feedback.name}
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          onClick={() =>
                            setFeedback(prev => ({
                              ...prev,
                              profilePicture: '',
                              profilePicturePreview: ''
                            }))
                          }
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
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
                {/* Feedback Information Inputs */}
                <div className='grid md:grid-cols-2 gap-5 py-3 '>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={feedback.name}
                      onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      id="designation"
                      value={feedback.designation}
                      onChange={(e) => setFeedback(prev => ({ ...prev, designation: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter your designation"
                      required
                    />
                  </div>
                </div>
                {/* Review Message Input */}
                <div>
                  <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700 mb-2">
                    Review Message
                  </label>
                  <JoditEditor
                    id='reviewMessage'
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setFeedback(prev => ({ ...prev, reviewMessage: newContent }))}
                  />
                </div>
                <div className='space-y-4'>
                  <label htmlFor="preview" className='font-medium'>Preview</label>
                  <div id='preview' className={`${!content ? 'h-[350px]' : 'h-[350px] overflow-y-scroll'}`} dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                {/* Submit Button */}
                <div className='w-full flex justify-end items-center'>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`sm:wauto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      ) : (
        // Non-editing mode (preview mode)
        <div className='h-[88.5%] overflow-y-auto'>
          <div className="w-full p-4 sm:p-6 lg:p-8 flex justify-center items-center ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
              <div className='flex w-full justify-between items-center mb-8'>
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                  {isEditing ? "Edit Feedback" : "Feedback"}
                </h1>
                <button
                  className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border ${isEditing ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Disable Edit" : "Edit"}
                </button>
              </div>
              <form className="space-y-9">
                {/* Profile Picture Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className={`border-2 rounded-lg p-4 text-center`}>
                    {feedback?.profilePicture ? (
                      <div className="relative">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_FEEDBACK}/${feedback?.profilePicture}`}
                          className="max-h-64 mx-auto rounded-lg"
                          alt={feedback.name}
                        />
                      </div>
                    ) : (
                      <div className="cursor-pointer">
                        <div className="text-gray-500">
                          <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm">Drag and drop an image here, or click to select</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Feedback Information (Preview) */}
                <div className='grid md:grid-cols-2 gap-5 py-3 '>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={feedback.name}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      id="designation"
                      value={feedback.designation}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Review Message Preview */}
                <div className='space-y-4'>
                  <label htmlFor="preview" className='font-medium'>Review Message</label>
                  <div id='preview' className={`${!content ? 'h-[350px]' : 'h-[350px] overflow-y-scroll'}`} dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewAndEditFeedback;
