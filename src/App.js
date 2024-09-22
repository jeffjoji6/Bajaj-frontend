import React, { useState } from "react";
import ResponseDisplay from "./components/ResponseDisplay";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [file, setFile] = useState(null); // State for the selected file

  // File details from backend response
  const [fileDetails, setFileDetails] = useState({
    valid: null,
    mimeType: "",
    size: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonInput = JSON.parse(input);
      if (!jsonInput.data) {
        throw new Error("Invalid JSON input");
      }

      // Create FormData to send both the file and the JSON data
      const formData = new FormData();
      formData.append("data", JSON.stringify(jsonInput)); // Append JSON input as a string
      if (file) {
        formData.append("file", file); // Append the selected file
      }

      // Send the request as multipart/form-data
      const res = await fetch("https://bajaj-backend-1dff.onrender.com/bfhl", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data);
      setError(null);

      // Extract file details from backend response
      setFileDetails({
        valid: data.file_valid,
        mimeType: data.file_mime_type,
        size: data.file_size_kb,
      });
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">BFHL API Client</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON input, e.g., { "data": ["A", "C", "z"] }'
            rows="4"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* Display file details after receiving the response */}
        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">File Details</h2>
            <div className="bg-gray-200 p-4 rounded-lg mb-4">
              <p>
                <strong>File Valid:</strong> {fileDetails.valid ? "Yes" : "No"}
              </p>
              <p>
                <strong>File MIME Type:</strong> {fileDetails.mimeType || "N/A"}
              </p>
              <p>
                <strong>File Size (KB):</strong> {fileDetails.size || "N/A"}
              </p>
            </div>

            {/* Checkbox options */}
            <div className="flex gap-2 flex-wrap mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="alphabets"
                  checked={selectedOptions.includes("alphabets")}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Alphabets</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="numbers"
                  checked={selectedOptions.includes("numbers")}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Numbers</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="highest_lowercase_alphabet"
                  checked={selectedOptions.includes(
                    "highest_lowercase_alphabet"
                  )}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Highest Lowercase Alphabet</span>
              </label>
            </div>
            <ResponseDisplay
              response={response}
              selectedOptions={selectedOptions}
            />
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </header>
    </div>
  );
}

export default App;
