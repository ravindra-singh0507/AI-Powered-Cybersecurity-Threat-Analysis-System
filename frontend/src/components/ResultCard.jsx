import React from "react";

const ResultCard = ({ prediction, probability }) => {
  return (
    <div className="mt-4 p-4 border border-blue-500 rounded-lg">
      <h3 className="text-blue-600 font-semibold text-lg">Prediction Result</h3>
      <p>
        <strong>Prediction:</strong> {prediction === 0 ? "Normal" : "Attack"}
      </p>
      <p>
        <strong>Probability:</strong> {(probability * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default ResultCard;
