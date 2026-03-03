const sendMessage = async (message: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/req", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mess: message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("AI Response:", data.response);
    return data.response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default sendMessage;