const express = require('express');
const app = express();
const PORT = process.env.PORT || 8888;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Dummy data for blog posts with tags
const blogPosts = [
  {
    id: 1,
    title: "How to make a free movies website:- an orange cat guide",
    category: "Piracy and streaming",
    description: "In this blog, i will tell you how you can make your own movies site",
    tags: ["Piracy", "Coding", "proxies", "Humor"]
  },
  // Additional posts can be added here
];

// Home route: render all posts
app.get('/', (req, res) => {
  res.render('index', { posts: blogPosts });
});

// API route for instant search (returns JSON)
app.get('/api/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  const results = blogPosts.filter(post => {
    const inTitle = post.title.toLowerCase().includes(query);
    const inTags = post.tags && post.tags.some(tag => tag.toLowerCase().includes(query));
    return inTitle || inTags;
  });
  res.json(results);
});

// Single blog post route (URL is now /posts/:id)
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = blogPosts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('blog', { post });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
