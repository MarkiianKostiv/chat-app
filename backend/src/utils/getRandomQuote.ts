const getRandomQuote = async () => {
  try {
    // I use FavQs API because Quotable isn't working

    const response = await fetch("https://favqs.com/api/qotd");
    const data: any = await response.json();
    return data.quote.body;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Sorry, I'm unable to generate a quote right now.";
  }
};

export default getRandomQuote;
