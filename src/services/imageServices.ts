import api from "./apiConfigs"

export const uploadImage = async (imageData: FormData) => {
  try {
    const response = await api.post("/upload-image", imageData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
