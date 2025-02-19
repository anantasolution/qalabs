import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DeleteFeedback from "../components/Feedback/DeleteFeedback";
import Breadcrumbs from "../components/Breadcrumbs";

const Feedback = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 55) + 200;
    const g = Math.floor(Math.random() * 55) + 200;
    const b = Math.floor(Math.random() * 55) + 200;
    return { 
      background: `rgb(${r}, ${g}, ${b})`,
      text: `rgb(${Math.floor(r * 0.2)}, ${Math.floor(g * 0.2)}, ${Math.floor(b * 0.2)})`,
    };
  };

  const [feedbacks, setFeedbacks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]); 

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/feedback/getallfeedbacks`);
      console.log(data);
      setFeedbacks(data.data);
      setFilteredFeedbacks(data.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to fetch feedback.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = feedbacks;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (feedback) =>
            feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.designation.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredFeedbacks(filteredData);
    };

    filterData();
  }, [searchQuery, feedbacks]);

  const handleDelete = (feedback) => {
    setIsDeleting(true);
    setSelectedFeedback(feedback);
  };

  const onConfirm = async () => {
    if (!selectedFeedback) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/feedback/deletefeedback/${selectedFeedback._id}`);
      toast.success("Feedback deleted successfully.");
      setIsDeleting(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete feedback.");
    }
  };

  // Handle navigation to the preview page
  const handleNavigatePreview = (id) => {
    navigate("/admin/feedback/preview", { state: id }); // Passing feedback ID as state
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Breadcrumbs setSearchQuery={setSearchQuery} />
      <div className="p-6 h-full w-full">
        <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => {
                const colors = generatePastelColor();
                return (
                  <div
                    key={feedback._id}
                    className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    style={{ backgroundColor: colors.background, color: colors.text }}
                    onClick={() => handleNavigatePreview(feedback._id)} // On click, navigate to preview
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_FEEDBACK}/${feedback.profilePicture?.filename}`}
                        alt="profile"
                        className="w-12 h-12 rounded-full border border-gray-300"
                      />

                      <div className="flex-grow">
                        <h3 className="text-lg font-bold">{feedback.name}</h3>
                        <p className="text-sm">{feedback.designation}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when delete button is clicked
                          handleDelete(feedback);
                        }}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>

                    </div>
                    <p className="mt-3 text-sm" dangerouslySetInnerHTML={{ __html: feedback?.reviewMessage }} />
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center text-gray-500">No Feedback found.</div>
            )}
          </div>
        </div>
      </div>
      {isDeleting && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <DeleteFeedback
            onCancel={() => setIsDeleting(false)} 
            feedbackName={selectedFeedback.name}
            onConfirm={onConfirm}
          />
        </div>
      )}
    </div>
  );
};

export default Feedback;