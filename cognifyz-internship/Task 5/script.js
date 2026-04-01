document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const loader = document.getElementById('loader');

    // Fetch data from public API
    const fetchPosts = async () => {
        try {
            // we limit to 9 posts for a nice 3x3 grid aesthetic
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const posts = await response.json();
            
            // Artificial delay to show loader (optional, for aesthetics)
            setTimeout(() => {
                renderPosts(posts);
                loader.classList.add('hidden');
                postsContainer.classList.remove('hidden');
            }, 800);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            loader.innerHTML = `<p style="color: red;">Failed to load data. Please try again later.</p>`;
        }
    };

    const renderPosts = (posts) => {
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            
            card.innerHTML = `
                <span class="post-id">Post #${post.id}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            `;
            
            postsContainer.appendChild(card);
        });
    };

    fetchPosts();
});
