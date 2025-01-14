import React, { useState, useEffect, useCallback } from 'react';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(() => {
    setLoading(true);
    setError(null);

    const apiKey = 'CTmUt3jmLDUPu3QSal4JcA==IE8xDQBMnTaIiJs5';
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

    fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuote(data[0].quote); // Assuming the API returns an array of quotes
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching the quote.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  if (loading) {
    return <p className="quote">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <blockquote className="quote">{quote}</blockquote>
    </div>
  );
};

export default QuoteDisplay;
