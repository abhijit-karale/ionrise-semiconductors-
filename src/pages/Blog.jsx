import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchBlogPosts } from '../services/api';
import PageHeader from '../components/PageHeader';
import { Calendar, User, ArrowRight } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data in case Firebase is not configured
  const mockPosts = [
    { id: '1', title: 'Why Formal Verification is Non-Negotiable', author: 'Dr. Alan Turing', date: '2026-06-15', excerpt: 'In edge AI chips, a single logical bug can cost millions. We explore how formal methods guarantee zero escapes.' },
    { id: '2', title: 'Optimizing the RISC-V Pipeline for Matrix Math', author: 'Grace Hopper', date: '2026-05-22', excerpt: 'Deep dive into extending the RV64GC ISA with custom vector instructions for neural network acceleration.' },
    { id: '3', title: 'The Future of UVM in a SystemC World', author: 'John Von Neumann', date: '2026-04-10', excerpt: 'Bridging the gap between high-level architectural models and RTL testbenches.' }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchBlogPosts();
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <PageHeader 
        title="Technical Insights" 
        subtitle="Thoughts, tutorials, and research from the Ionrise engineering team." 
      />
      
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-state tech-text">FETCHING_DATABASE_RECORDS...</div>
          ) : (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  className="blog-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="blog-meta">
                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                    <span className="meta-item"><User size={14} /> {post.author}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <button className="btn btn-outline read-more-btn">
                    Read Article <ArrowRight size={16} />
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
