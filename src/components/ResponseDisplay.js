import React from 'react';

function ResponseDisplay({ response, selectedOptions }) {
  return (
    <div className="space-y-4">
      {selectedOptions.includes('alphabets') && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Alphabets</h3>
          <p>{response.alphabets.join(', ')}</p>
        </div>
      )}
      {selectedOptions.includes('numbers') && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Numbers</h3>
          <p>{response.numbers.join(', ')}</p>
        </div>
      )}
      {selectedOptions.includes('highest_alphabet') && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Highest Alphabet</h3>
          <p>{response.highest_alphabet.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default ResponseDisplay;
