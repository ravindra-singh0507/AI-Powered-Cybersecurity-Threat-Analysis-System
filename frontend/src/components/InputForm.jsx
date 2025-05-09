import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [formData, setFormData] = useState({
    packet_length: "",
    duration: "",
    source_port: "",
    destination_port: "",
    bytes_sent: "",
    bytes_received: "",
    flow_packets: "",
    total_fwd_packets: "",
    total_bwd_packets: "",
    sub_flow_fwd_bytes: "",
    sub_flow_bwd_bytes: "",
    attack_type: "Normal", // Default value
    label: "",
  });

  const [response, setResponse] = useState(null); // State to store API response
  const [isLoading, setIsLoading] = useState(false); // State to show loading indicator

  // Handle form field changes

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state
    // Call an API or function to process the data (e.g., submit the data to the backend)
    console.log(formData);
    // Example: You can use fetch or axios to send data to the backend
    try {
      const res = await axios.post("http://localhost:5002/predict", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data); // Save the response to state
      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponse("Error occurred while processing the request.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
    <form onSubmit={handleSubmit} id="model-input-form" className="space-y-4 font-sans">
      <br></br>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="packet_length">Packet Length:</label>
          <input
            type="number"
            id="packet_length"
            name="packet_length"
            value={formData.packet_length}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="source_port">Source Port:</label>
          <input
            type="number"
            id="source_port"
            name="source_port"
            value={formData.source_port}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="destination_port">Destination Port:</label>
          <input
            type="number"
            id="destination_port"
            name="destination_port"
            value={formData.destination_port}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="bytes_sent">Bytes Sent:</label>
          <input
            type="number"
            id="bytes_sent"
            name="bytes_sent"
            value={formData.bytes_sent}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="bytes_received">Bytes Received:</label>
          <input
            type="number"
            id="bytes_received"
            name="bytes_received"
            value={formData.bytes_received}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="flow_packets">Flow Packets/s:</label>
          <input
            type="number"
            id="flow_packets"
            name="flow_packets"
            value={formData.flow_packets}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="total_fwd_packets">Total Forward Packets:</label>
          <input
            type="number"
            id="total_fwd_packets"
            name="total_fwd_packets"
            value={formData.total_fwd_packets}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="total_bwd_packets">Total Backward Packets:</label>
          <input
            type="number"
            id="total_bwd_packets"
            name="total_bwd_packets"
            value={formData.total_bwd_packets}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="sub_flow_fwd_bytes">Sub Flow Forward Bytes:</label>
          <input
            type="number"
            id="sub_flow_fwd_bytes"
            name="sub_flow_fwd_bytes"
            value={formData.sub_flow_fwd_bytes}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="sub_flow_bwd_bytes">Sub Flow Backward Bytes:</label>
          <input
            type="number"
            id="sub_flow_bwd_bytes"
            name="sub_flow_bwd_bytes"
            value={formData.sub_flow_bwd_bytes}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="attack_type">Attack Type:</label>
          <select
            id="attack_type"
            name="attack_type"
            value={formData.attack_type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="DDoS">DDoS</option>
            <option value="Brute Force">Brute Force</option>
            <option value="Normal">Normal</option>
            <option value="Ransomware">Ransomware</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
    </form>

    {/* Display the response */}
    {response && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {response.error ? (
            <p className="text-red-500">{response.error}</p>
          ) : (
            <>
              <p><strong>Prediction:</strong> {response.prediction}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InputForm;
