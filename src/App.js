import React, { useState } from 'react';
import './styles.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const API_URL = 'https://ai-quote-backend-f9f611699b31.herokuapp.com/' ;

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/get-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      setError('Failed to fetch quote.');
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="App">
      <div className="welcome-message">
      <h1>Welcome to the AI Quote Generator</h1>
    <p></p>
      <button onClick={toggleInstructions}>
        {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
      </button>
      </div>
      
      {showInstructions && (
      <div className="instructions-container">
        <h2>How to Use the AI Quote Generator</h2>
        <p>Welcome to the AI Quote Generator! This tool leverages artificial intelligence to provide you with relevant and inspirational quotes from our carefully cultivated database based on your input. Here’s how to use it:</p>
        <ol>
          <li><strong>Enter Your Prompt:</strong> Type in a keyword or a phrase related to the type of quote you're looking for. For example, you can enter "inspiration," "friendship," or "positivity."</li>
          <li><strong>Get Your Quote:</strong> Click the "Get Quote" button. Our AI will analyze your prompt and fetch a quote that matches your request.</li>
        </ol>
        <p><strong>Note:</strong> The AI model uses advanced techniques to find the most relevant quotes based on your input. However, if you encounter any issues or if the quotes don’t quite match your expectations, try rephrasing your prompt or exploring different keywords.</p>
      </div>
      )}
      <h1>AI Quote Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={fetchQuote}>Get Quote</button>
      {loading && <p className="loading">Loading...</p>}
      {error && !loading && <p className="error">{error}</p>}
      {quote && !loading && (
        <div className="quote-box">
          <p>{quote}</p>
        </div>
      )}
    </div>
  );
}

export default App;



// import React, { useState } from 'react';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [quote, setQuote] = useState('');

//   const fetchQuote = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/get-quote', {  // Match Flask port
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await response.json();
//       setQuote(data.quote);
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>AI Quote Generator</h1>
//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter your prompt"
//       />
//       <button onClick={fetchQuote}>Get Quote</button>
//       {quote && <p>{quote}</p>}
//     </div>
//   );
// }

// export default App;
