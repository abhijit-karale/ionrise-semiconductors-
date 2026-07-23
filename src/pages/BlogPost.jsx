import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import DuotoneImage from '../components/DuotoneImage';

const BlogPost = () => {
  const { slug } = useParams();

  // In a real app, we would fetch this based on the slug.
  // We use the requested mockup article here.
  const article = {
    title: 'Clock Domain Crossing: The Bugs That Don\'t Show Up in Simulation',
    author: 'Abhijit Karale',
    role: 'Founder & Principal Engineer',
    date: 'August 30, 2026',
    readTime: '7 min read',
    content: `
      <p>In modern System-on-Chip (SoC) designs, multiple asynchronous clock domains are practically unavoidable. You might have a high-speed CPU core running at 1.5GHz, a memory controller at 800MHz, and slow peripheral buses running at 50MHz. When data traverses these boundaries, you enter the perilous territory of Clock Domain Crossing (CDC).</p>
      
      <p>The problem with CDC bugs is their insidious nature: they almost never show up in standard RTL simulation. In simulation, clock edges are perfect, setup and hold times don't exist unless you back-annotate them, and flip-flops never go metastable. Everything looks perfectly functional.</p>

      <h3>The Metastability Trap</h3>
      <p>When a signal from a source clock domain changes exactly at the setup/hold window of a destination flip-flop, that flip-flop can enter a metastable state—an intermediate voltage level that is neither a logical 0 nor a 1. If this metastable state doesn't resolve before the next clock edge, it propagates through the combinatorial logic, causing functional failure in the silicon.</p>
      <p>To mitigate this, designers use synchronizers—typically 2-stage or 3-stage flip-flop chains for single-bit signals, or asynchronous FIFOs with gray-coded pointers for multi-bit buses. But just dropping down a 2-flop synchronizer isn't enough.</p>

      <h3>Why Structural CDC Checking is Mandatory</h3>
      <p>At Ionrise, our verification methodology treats CDC verification with the same rigor as functional correctness. You cannot rely on directed tests or even constrained-random UVM testbenches to catch CDC issues. Instead, we use dedicated structural CDC analysis tools (like SpyGlass CDC or Questa CDC) during the linting phase.</p>
      <p>These tools statically analyze the RTL to ensure:</p>
      <ul>
        <li>Every cross-domain signal has a valid synchronization structure.</li>
        <li>No combinatorial logic exists between the source flop and the first synchronizer flop (which causes glitches).</li>
        <li>Multi-bit signals aren't incorrectly synchronized using parallel 2-flop synchronizers (which causes data incoherency due to variable routing delays).</li>
      </ul>

      <h3>Our Verification Approach</h3>
      <p>Before any Ionrise IP is marked as "silicon-ready", it must pass a zero-warning CDC structural check. Furthermore, we run our gate-level simulations (GLS) with Standard Delay Format (SDF) back-annotation to verify that our reset distribution and CDC paths behave predictably under real-world timing corners.</p>
      <p>Don't wait for post-silicon validation to discover a CDC bug. If it fails in the lab, it's already a million-dollar mistake. Verify it structurally, verify it formally, and sleep better at night.</p>
    `
  };

  return (
    <div className="page-container" style={{ padding: '6rem 0' }}>
      <div className="container">
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-teal)', textDecoration: 'none', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} /> {article.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> {article.readTime}</span>
            </div>
            <h1 style={{ color: 'var(--text-main)', fontSize: '2.5rem', lineHeight: 1.3, marginBottom: '2rem' }}>{article.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', padding: '1.5rem 0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                <DuotoneImage src="https://picsum.photos/seed/abhijit/100/100?grayscale" alt={article.author} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{article.author}</div>
                <div style={{ color: 'var(--accent-teal)', fontSize: '0.85rem' }}>{article.role}</div>
              </div>
            </div>
          </header>

          <div style={{ marginBottom: '3rem', height: '400px', borderRadius: '4px', overflow: 'hidden' }}>
            <DuotoneImage src="https://picsum.photos/seed/clock-domain/1200/600?grayscale" alt="Clock Domain Crossing" />
          </div>

          <div 
            className="blog-content"
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.article>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content h3 {
          color: var(--text-main);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-mono);
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content ul {
          margin-bottom: 2rem;
          padding-left: 2rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
      `}} />
    </div>
  );
};

export default BlogPost;
