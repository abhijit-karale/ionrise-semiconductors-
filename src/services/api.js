const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitContactForm = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return await response.json();
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
};

export const submitApplication = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return await response.json();
  } catch (error) {
    console.error('Application submission error:', error);
    throw error;
  }
};

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Blog fetch error:', error);
    // Fallback to empty array to avoid breaking the frontend
    return [];
  }
};

export const fetchProjectsFromDb = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Project fetch error:', error);
    return null;
  }
};

export const generateRoadmap = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmaps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to generate roadmap');
    }
    return await response.json();
  } catch (error) {
    console.warn('Roadmap generate error, falling back to mock data:', error);
    // Graceful fallback for MVP
    return { id: 'mock-' + Date.now().toString().slice(-6) };
  }
};

export const fetchRoadmap = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmaps/${id}`);
    if (!response.ok) {
      throw new Error('Roadmap not found');
    }
    return await response.json();
  } catch (error) {
    console.warn('Roadmap fetch error, falling back to mock data:', error);
    // Graceful fallback mock matching UVM track
    return {
      id,
      created_at: new Date().toISOString(),
      intake_answers_json: { role: 'uvm', timeline: 6, skills: [] },
      roadmap_data_json: [
        {
          month: 1,
          theme: 'Digital Logic & Verilog Foundations',
          milestones: [
            { text: 'Complete all 17 Beginner Verilog Playground problems (gates → flip-flops → counters)', type: 'playground' },
            { text: 'Play Gate Rush Chapters 1–2 (basic gates, combinational circuits) — same concepts, game format, reinforces intuition', type: 'playground' },
            { text: 'Build first portfolio project: 4-bit ripple carry adder + testbench (self-checking, directed tests only — no UVM yet)', type: 'portfolio' },
            { text: 'Read/watch: intro material on Verilog data types, procedural blocks, and simulation basics', type: 'reading' },
            { text: 'Skill Gap: Supplementary week on number representation (2\'s complement, overflow) before starting gates.', type: 'reading' }
          ]
        },
        {
          month: 2,
          theme: 'FSMs, Protocols, and SystemVerilog Basics',
          milestones: [
            { text: 'Complete Intermediate Verilog Playground problems tagged `fsm` and `uart` (traffic light FSM, sequence detector, UART TX/RX)', type: 'playground' },
            { text: 'Portfolio project: UART controller (transmitter + receiver, directed testbench)', type: 'portfolio' },
            { text: 'Start SystemVerilog Beginner Playground track: data types (`logic` vs `reg` vs `wire`), `always_comb`/`always_ff`, enums, structs', type: 'playground' },
            { text: 'Certification checkpoint: begin an entry-level VLSI/SystemVerilog fundamentals certification (industry-recognized, self-paced)', type: 'certification' },
            { text: 'Skill Gap: Moore vs Mealy comparison exercise before the sequence-detector problems.', type: 'reading' }
          ]
        },
        {
          month: 3,
          theme: 'Memory, FIFOs, and CDC Fundamentals',
          milestones: [
            { text: 'Complete Intermediate Verilog problems tagged `fifo`, `cdc`, `memory`', type: 'playground' },
            { text: 'Portfolio project: Synchronous + Asynchronous FIFO with Gray-code CDC synchronization — this becomes a flagship portfolio piece', type: 'portfolio' },
            { text: 'Continue SystemVerilog Beginner/Intermediate: interfaces, modports, generate blocks', type: 'playground' },
            { text: 'Watch/read a focused deep-dive on metastability and 2-flop synchronizers (this is a common interview topic — flag it explicitly)', type: 'reading' },
            { text: 'Skill Gap: This month\'s CDC content is mandatory, not optional, regardless of pace.', type: 'reading' }
          ]
        },
        {
          month: 4,
          theme: 'Entering Verification: OOP, Randomization, Coverage',
          milestones: [
            { text: 'Complete SystemVerilog Intermediate Playground problems tagged `oop`, `randomization`, `coverage`, `assertions`', type: 'playground' },
            { text: 'Portfolio project: build a constrained-random self-checking testbench for the Month 3 FIFO project (retrofit it — don\'t start a new design)', type: 'portfolio' },
            { text: 'Learn: classes, inheritance, `rand`/`randc`, basic constraints, covergroups/coverpoints, immediate + concurrent SVA', type: 'reading' },
            { text: 'Certification checkpoint: complete the SystemVerilog fundamentals certification started in Month 2', type: 'certification' }
          ]
        },
        {
          month: 5,
          theme: 'UVM Core Components',
          milestones: [
            { text: 'Complete SystemVerilog Advanced Playground problems tagged `uvm` (sequence item, sequence/sequencer, driver, monitor, scoreboard skeletons)', type: 'playground' },
            { text: 'Portfolio project: build a layered UVM testbench for an AMBA-APB slave — driver, monitor, sequencer, scoreboard, agent', type: 'portfolio' },
            { text: 'Learn: TLM analysis ports, `config_db`, factory overrides, virtual interfaces, UVM phasing (build/connect/run)', type: 'reading' },
            { text: 'Skill Gap: Add an extra week reviewing the driver/monitor split before attempting the full agent.', type: 'reading' }
          ]
        },
        {
          month: 6,
          theme: 'Formal Verification, Interview Readiness, and Portfolio Polish',
          milestones: [
            { text: 'Complete remaining SystemVerilog Advanced problems tagged `formal`, `sva` (no-read-before-write, mutual exclusion properties)', type: 'playground' },
            { text: 'Portfolio project: add SVA formal properties to the Month 5 APB testbench — pairs formal + simulation-based verification on the same design', type: 'portfolio' },
            { text: 'Use the RTL-DV Interview Coach tool (UVM Verification track, Associate difficulty) for at least 3 mock sessions', type: 'playground' },
            { text: 'Use the RTL Code Reviewer tool on all portfolio projects before publishing to GitHub — clean up flagged CDC/latch/blocking-assignment issues', type: 'playground' },
            { text: 'Finalize GitHub portfolio: 4 projects minimum (adder, UART, async FIFO, UVM APB testbench), each with a README, waveform screenshots, and coverage summary', type: 'portfolio' },
            { text: 'Certification checkpoint: complete or begin an advanced RTL/UVM verification certification if timeline allows', type: 'certification' }
          ]
        }
      ]
    };
  }
};
