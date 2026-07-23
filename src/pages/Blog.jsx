import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DuotoneImage from '../components/DuotoneImage';
import { Clock, User } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      slug: 'uvm-coverage-closure',
      title: 'Why UVM Coverage Closure Matters More Than Line Count',
      excerpt: 'Writing thousands of lines of verification IP means nothing if your functional coverage holes are hiding edge-case bugs. Here is how we track meaningful metrics.',
      author: 'Abhijit Karale',
      date: 'Oct 12, 2026',
      readTime: '6 min read',
      seed: 'uvm-coverage'
    },
    {
      slug: 'amba-apb-verification',
      title: 'Inside Our AMBA-APB Verification Suite',
      excerpt: 'A deep dive into how we parameterize our APB VIP to stress-test slaves against protocol violations and burst constraints.',
      author: 'Sarah Chen',
      date: 'Sep 28, 2026',
      readTime: '8 min read',
      seed: 'amba-bus'
    },
    {
      slug: 'riscv-vs-custom-cores',
      title: 'RISC-V vs Custom Cores: What SoC Teams Should Weigh',
      excerpt: 'When does it make sense to adopt a standard RISC-V ISA versus rolling a completely custom application-specific pipeline? We break down the PPA tradeoffs.',
      author: 'David Roa',
      date: 'Sep 14, 2026',
      readTime: '5 min read',
      seed: 'riscv-cpu'
    },
    {
      slug: 'cdc-bugs-simulation',
      title: 'Clock Domain Crossing: The Bugs That Don\'t Show Up in Simulation',
      excerpt: 'If you aren\'t running structural CDC checks, your RTL might pass every testbench but fail in the fab. Here is how to catch metastability before tape-out.',
      author: 'Abhijit Karale',
      date: 'Aug 30, 2026',
      readTime: '7 min read',
      seed: 'clock-domain'
    },
    {
      slug: 'formal-verification-sva',
      title: 'Scaling Formal Verification with SystemVerilog Assertions',
      excerpt: 'Integrating SVA directly into the RTL design phase allows formal tools to mathematically prove mutual exclusion and liveness properties.',
      author: 'Elena Rostova',
      date: 'Aug 15, 2026',
      readTime: '10 min read',
      seed: 'formal-sva'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Engineering Blog" 
        subtitle="Deep dives into RTL design, UVM methodologies, and silicon verification from the Ionrise team." 
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {posts.map((post, i) => (
              <motion.div 
                key={post.slug}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
              >
                <div style={{ height: '200px', width: '100%' }}>
                  <DuotoneImage 
                    src={`https://picsum.photos/seed/${post.seed}/600/400?grayscale`}
                    alt={post.title}
                  />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                    <span>{post.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.25rem', lineHeight: 1.4 }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-teal)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      <User size={16} style={{ color: 'var(--accent-teal)' }} />
                      {post.author}
                    </div>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'var(--accent-teal)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
