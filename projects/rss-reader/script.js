document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const feedSelect = document.getElementById('feed-select');
    const refreshBtn = document.getElementById('refresh-btn');
    const contentDiv = document.getElementById('content');
    const loadingIndicator = document.getElementById('loading');
    const lastUpdatedSpan = document.getElementById('last-updated');
    
    // RSS to JSON API URL
    const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    // Initialize the dashboard
    function init() {
        // Load the default feed
        loadFeed(feedSelect.value);
        
        // Add event listeners
        feedSelect.addEventListener('change', () => {
            loadFeed(feedSelect.value);
        });
        
        refreshBtn.addEventListener('click', () => {
            loadFeed(feedSelect.value);
        });
    }
    
    // Load and display the selected feed
    function loadFeed(feedUrl) {
        showLoading();
        contentDiv.innerHTML = '';
        
        fetch(`${RSS_TO_JSON_API}${encodeURIComponent(feedUrl)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                hideLoading();
                updateLastUpdated();
                
                if (data.status === 'ok') {
                    displayArticles(data.items, data.feed);
                } else {
                    displayError('Failed to parse the feed. Please try another one.');
                }
            })
            .catch(error => {
                hideLoading();
                console.error('Error fetching feed:', error);
                displayError('Failed to load the feed. Please check your connection and try again.');
            });
    }
    
    // Display articles in the content area
    function displayArticles(articles, feedInfo) {
        if (!articles || articles.length === 0) {
            displayError('No articles found in this feed.');
            return;
        }
        
        articles.forEach(article => {
            const articleCard = createArticleCard(article, feedInfo);
            contentDiv.appendChild(articleCard);
        });
    }
    
    // Create an article card element
    function createArticleCard(article, feedInfo) {
        const card = document.createElement('div');
        card.className = 'article-card';
        
        // Format publication date
        const pubDate = article.pubDate ? new Date(article.pubDate).toLocaleDateString() : 'Unknown date';
        
        // Clean up description (remove HTML tags)
        const description = cleanDescription(article.description);
        
        card.innerHTML = `
            <h2>${article.title}</h2>
            <div class="meta">
                <span class="source">${feedInfo.title}</span>
                <span class="date">${pubDate}</span>
            </div>
            <div class="description">${description}</div>
            <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="read-more">Read more →</a>
        `;
        
        return card;
    }
    
    // Clean up description by removing HTML tags and limiting length
    function cleanDescription(description) {
        if (!description) return '';
        
        // Remove HTML tags
        let cleanDesc = description.replace(/<[^>]*>/g, '');
        
        // Limit length
        if (cleanDesc.length > 200) {
            cleanDesc = cleanDesc.substring(0, 200) + '...';
        }
        
        return cleanDesc;
    }
    
    // Display error message
    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        contentDiv.appendChild(errorDiv);
    }
    
    // Show loading indicator
    function showLoading() {
        loadingIndicator.style.display = 'flex';
    }
    
    // Hide loading indicator
    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }
    
    // Update last updated time
    function updateLastUpdated() {
        const now = new Date();
        lastUpdatedSpan.textContent = now.toLocaleString();
    }
    
    // Initialize the dashboard
    init();
});