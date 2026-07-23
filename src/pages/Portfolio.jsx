import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { fetchGithubRepos } from '../services/GitHubApi';
import { fetchProjectsFromDb } from '../services/api';
import { Star, GitCommit, ExternalLink, Code } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Portfolio.css';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dbProjects, setDbProjects] = useState([]);

  // The 6 seed projects requested
  const seedProjects = [
    { 
      title: '32-bit RISC-V Processor Design & Verification', 
      desc: '5-stage pipeline with full UVM environment (driver, monitor, scoreboard, constrained-random sequences). 95%+ functional coverage; hazards resolved via forwarding. Synthesized via Synopsys tools.', 
      tags: ['Verilog', 'UVM', 'Cadence Xcelium'] 
    },
    { 
      title: '8-bit RISC Processor — Complete ASIC Flow', 
      desc: '32-instruction RISC architecture, RTL to gate level. Floorplanning, place & route, DFT insertion, synthesis, static timing closure. 100% sim coverage across 350+ tests. Validated on FPGA at 100 MHz.', 
      tags: ['Verilog', 'VHDL', 'FPGA'] 
    },
    { 
      title: 'AMBA APB Slave Peripheral', 
      desc: 'Address decoding, register mapping, read/write control logic. FSM modeling IDLE/SETUP/ACCESS phases per spec. Full functional coverage closure.', 
      tags: ['SystemVerilog', 'AMBA-APB'] 
    },
    { 
      title: 'UART Controller RTL & Verification', 
      desc: 'Configurable TX/RX, variable baud rates and parity modes. SVA-based protocol timing checks. Robustness validated against noise, baud mismatch, back-to-back frames.', 
      tags: ['Verilog', 'SystemVerilog'] 
    },
    { 
      title: 'Synchronous & Asynchronous FIFO Design', 
      desc: 'Parameterizable sync/async FIFOs with full/empty flag logic. Gray-code pointer synchronization for safe CDC. Self-checking testbenches for boundary conditions.', 
      tags: ['Verilog', 'SystemVerilog', 'CDC'] 
    },
    { 
      title: 'Memory Controller with Formal Property Verification', 
      desc: 'Single-port read/write memory controller, address range checking. SVA for address decoding, reset behavior. Properties formally proven in JasperGold.', 
      tags: ['SystemVerilog', 'SVA', 'JasperGold'] 
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      const ghData = await fetchGithubRepos();
      setRepos(ghData);
      
      try {
        const dbData = await fetchProjectsFromDb();
        if (dbData && dbData.length > 0) {
          setDbProjects(dbData);
        } else {
          setDbProjects(seedProjects);
        }
      } catch (err) {
        setDbProjects(seedProjects);
      }
      
      setLoading(false);
    };
    loadData();
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
              {dbProjects.map((study, idx) => (
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
