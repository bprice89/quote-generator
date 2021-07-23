const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote() {
    loading();
    // pick a random quote form array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // replace null author with unknow
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // if quote to long change font size
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // show quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}
// function newQuote() {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// import api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}

// open twitter and post quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();
// newQuote()
