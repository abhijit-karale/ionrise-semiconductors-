import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { fetchGithubRepos } from '../services/GitHubApi';
import { Star, GitCommit, ExternalLink, Code } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Portfolio.css';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchGithubRepos();
      setRepos(data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  return (
    <div className="portfolio-page">
      <PageHeader 
        title="Featured Projects" 
        subtitle="Explore our live silicon IP and verification environments directly from GitHub." 
      />
      
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-state tech-text">FETCHING_GITHUB_DATA...</div>
          ) : (
            <div className="portfolio-grid">
              {repos.map((repo, index) => (
                <Tilt 
                  key={repo.id}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={250}
                  className="tilt-wrapper"
                >
                  <motion.div 
                    className="portfolio-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="card-header">
                      <h3 className="repo-name">{repo.name}</h3>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="github-link">
                        <Code size={20} />
                      </a>
                    </div>
                    
                    <p className="repo-desc">
                      {repo.description || 'RTL Design & Verification project.'}
                    </p>
                    
                    <div className="repo-meta">
                      <span className="meta-item tech-text">
                        <Star size={14} /> {repo.stargazers_count}
                      </span>
                      <span className="meta-item tech-text">
                        <GitCommit size={14} /> {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      {repo.language && (
                        <span className="language-tag">{repo.language}</span>
                      )}
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          )}
          
          <div className="portfolio-hardcoded mt-5">
            <h2 className="section-title">Case Studies</h2>
            <div className="portfolio-grid">
              {/* Hardcoded case studies for the specific requests (NTT accelerator, RISC-V core) */}
              {[
                { title: 'NTT Accelerator', desc: 'Number Theoretic Transform hardware accelerator for post-quantum cryptography.', tags: ['SystemVerilog', 'UVM', 'Yosys'] },
                { title: 'RISC-V Core', desc: 'Out-of-order superscalar RV64GC core tailored for edge AI inference.', tags: ['Verilog', 'Formal', 'Verilator'] },
                { title: 'APB Peripherals', desc: 'High-speed UART and FIFO buffers connected via AMBA APB bus.', tags: ['RTL', 'UVM'] }
              ].map((study, idx) => (
                <Tilt key={`study-${idx}`} tiltMaxAngleX={5} tiltMaxAngleY={5} className="tilt-wrapper">
                  <div className="portfolio-card glass-card study-card">
                    <h3>{study.title}</h3>
                    <p>{study.desc}</p>
                    <div className="tags-flex mt-3">
                      {study.tags.map(tag => <span key={tag} className="tech-badge" style={{margin: '0 0.5rem 0.5rem 0'}}>{tag}</span>)}
                    </div>
                  </div>
                </Tilt>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
