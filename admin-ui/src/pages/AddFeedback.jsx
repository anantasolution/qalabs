import React, { useState, useRef, useMemo,useEffect } from "react";
import JoditEditor from "jodit-react";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AddFeedback = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [feedback, setFeedback] = useState({
    name: "",
    designation: "",
    reviewMessage: "",
    profilePicture: null,
    imagePreview: "",
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleNameChange = (e) => {
    const capitalized = capitalizeFirstLetter(e.target.value);
    setFeedback((prev) => ({ ...prev, name: capitalized }));
  };

  // Editor configurations
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      toolbarSticky: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: ["bold", "italic", "underline"],
      height: 400,
    }),
    [placeholder]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("profilePicture/")) {
      const previewUrl = URL.createObjectURL(file);
      setFeedback((prev) => ({
        ...prev,
        profilePicture: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleImageChange = (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    
    if (!file) return;
    e.target.value = null;

    console.log(file);

    const previewUrl = URL.createObjectURL(file);
    setFeedback((prev) => ({
        ...prev,
        profilePicture: file,
        imagePreview: previewUrl,
    }));
};


  const handleRemoveImage = (e)=>{
    if (feedback.imagePreview) {
      URL.revokeObjectURL(feedback.imagePreview); // Clean up memory
    }
    e.stopPropagation();
    setFeedback((prev)=>({
      ...prev,
      profilePicture : null,
      imagePreview : "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!feedback.profilePicture) {
      toast.error("Profile picture is required.");
      setIsSubmitting(false);
      return;
    }

    if (!feedback.reviewMessage) {
      toast.error("Review message is required.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", feedback.profilePicture);
    formData.append("name", feedback.name.trim());
    formData.append("designation", feedback.designation.trim());
    formData.append("reviewMessage", feedback.reviewMessage.trim());

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/feedback/createfeedback`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Feedback added successfully!");
      setFeedback({
        name: "",
        designation: "",
        reviewMessage: "",
        profilePicture: null,
        imagePreview: "",
      });
      setContent("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add feedback.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="w-full flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">Home</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">Add Feedback</span>
          </div>
        </div>
      </section>
      <div className="h-[88.5%] overflow-y-auto">
        <div className="w-full p-6 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h1 className="text-2xl font-bold mb-8 text-center">
              Create New Feedback
            </h1>
            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    feedback.imagePreview
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {feedback.imagePreview ? (
                    <div className="relative flex justify-center ">
                      <div className="w-64 h-64 overflow-hidden rounded-full relative">
                        <img
                          src={feedback.imagePreview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
                        onClick={(e) => {
                          handleRemoveImage(e);
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={(e) => fileInputRef.current?.click()}
                    >
                      <div className="text-gray-500">
                        <svg
                          className="mx-auto h-12 w-12 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    e
                    ref={fileInputRef}
                    onChange={(e)=>handleImageChange(e)}
                    // onClick={(e) => handleImageChange(e)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name and Designation Inputs */}
              <div className="grid md:grid-cols-2 gap-5 py-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={feedback.name}
                    // onChange={(e) => setFeedback((prev) => ({ ...prev, name: e.target.value }))}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    value={feedback.designation}
                    onChange={(e) =>
                      setFeedback((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter your designation"
                    required
                  />
                </div>
              </div>

              {/* Review Message Editor */}
              <div>
                <label
                  htmlFor="reviewMessage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Review Message
                </label>
                <JoditEditor
                  id="reviewMessage"
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) =>
                    setFeedback((prev) => ({
                      ...prev,
                      reviewMessage: newContent,
                    }))
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white bg-blue-500 rounded-lg ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFeedback;
