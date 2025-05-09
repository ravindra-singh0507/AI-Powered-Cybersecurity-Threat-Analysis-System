import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";

const App = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 text-white p-6">
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-4">Cyber Attack Predictor</h1>
      <InputForm setResponse={setResponse} setIsLoading={setIsLoading} />
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : response && (
        <ResultCard prediction={response.prediction} probability={response.probability} />
      )}
    </div>
  );
};

export default App;
