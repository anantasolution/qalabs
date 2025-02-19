import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProject = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  // Editor configurations
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      toolbarSticky: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        "bold",
        "italic",
        "underline",
      ],
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
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setProject((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProject((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!project.image) {
      toast.error("Project image is required.");
      setIsSubmitting(false);
      return;
    }

    if (!project.description) {
      toast.error("Project description is required.");
      setIsSubmitting(false);
      return;
    }

    const fileData = new FormData();
    fileData.append("photo", project.image); // Ensure the field name matches the server configuration
    fileData.append("title", project.title);
    fileData.append("description", project.description);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/project/createproject`,
        fileData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Project added successfully!");
      setProject({ title: "", description: "", image: null, imagePreview: "" });
      setContent("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add project.");
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
            <span className="text-gray-400">Add Project</span>
          </div>
        </div>
      </section>
      <div className="h-[88.5%] overflow-y-auto">
        <div className="w-full p-6 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h1 className="text-2xl font-bold mb-8 text-center">
              Create New Project
            </h1>
            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    project.imagePreview
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {project.imagePreview ? (
                    <div className="relative">
                      <img
                        src={project.imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        onClick={() =>
                          setProject((prev) => ({
                            ...prev,
                            image: null,
                            imagePreview: "",
                          }))
                        }
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
                      onClick={() => fileInputRef.current?.click()}
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
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title Input */}
              <div className="grid md:grid-cols-2 gap-5 py-3">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={project.title}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter project title"
                    required
                  />
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Description
                </label>
                <JoditEditor
                  id="description"
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) =>
                    setProject((prev) => ({ ...prev, description: newContent }))
                  }
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="preview" className="font-medium">
                  Preview
                </label>
                <div
                  id="preview"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`sm:wauto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    "Publish"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
