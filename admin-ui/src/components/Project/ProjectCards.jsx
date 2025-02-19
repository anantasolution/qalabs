import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCards = ({ data }) => {

    const navigate = useNavigate();

    const handleNavigatePreview = (id) => {
        navigate("/admin/projects/preview", { state: id });
    }

    return (
        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap w-full pb-4">
            {data.map((project, index) => (
                <div
                    key={index}
                    onClick={() => handleNavigatePreview(project._id)}
                    className="flex flex-col md:flex-row bg-white rounded-md shadow-[0px_0px_17px_1px_rgba(0,_0,_0,_0.1)] overflow-hidden w-full border-red-500"
                >
                    <img
                        src={`${process.env.REACT_APP_API_BASE_PROJECT}/${project.photo?.filename}`} alt={project?.title}
                        className="md:w-40 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-center w-full">
                        <h2 className="text-xl font-semibold text-gray-800">{project?.title}</h2>
                        <p className="text-gray-600 mt-2 w-11/12 line-clamp-3" dangerouslySetInnerHTML={{__html:project?.description}} />
                        <div className="w-full flex justify-end">
                            <span className="text-gray-700">{project?.updatedAt}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectCards;