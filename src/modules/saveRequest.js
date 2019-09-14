import axios from "axios";

const saveRequest = async (title, category, details, budget, time_frame, image) => {
  try {
    let response = await axios.post(
      "http://localhost:3000/api/service_request",
      {
        title: title,
        category: category,
        details: details,
        budget: budget,
        time_frame: time_frame,
        image: [image]
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export { saveRequest };
