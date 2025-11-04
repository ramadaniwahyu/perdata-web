import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";


const uploadFile = async (dataFile) => {
    const formData = new FormData();

    //append image file to form data
    formData.append("file", dataFile);

    try {
        const response = await axiosInstance.post(API_PATHS.UPLOAD.FILE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data
    } catch (error) {
        console.error("Error uploading the file", error);
        throw error;
    }
};

export default uploadFile;