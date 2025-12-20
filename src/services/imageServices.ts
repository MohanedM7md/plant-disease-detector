import axios from "axios";

export const uploadImage = async (imageData: FormData) => {
  try {
    const response = await axios.post("http://51.107.1.58:8000/detect/", imageData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        },

    });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
