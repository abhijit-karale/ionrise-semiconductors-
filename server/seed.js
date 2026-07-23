const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'ionrise_db',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

const generateRTL6Month = () => {
  return [
    { m: 1, theme: 'Combinational & Sequential Logic Foundations', milestones: [
      { text: 'Complete all 17 Beginner Verilog problems in the Ionrise Playground', type: 'playground' },
      { text: 'Review textbook: Digital Design and Computer Architecture (Harris & Harris)', type: 'reading' }
    ]},
    { m: 2, theme: 'FSMs & Basic Datapaths', milestones: [
      { text: 'Build a basic UART TX/RX module in Verilog', type: 'portfolio' },
      { text: 'Complete the FSM design exercises in Playground', type: 'playground' }
    ]},
    { m: 3, theme: 'Advanced RTL & CDC', milestones: [
      { text: 'Build a Parameterizable Synchronous FIFO', type: 'portfolio' },
      { text: 'Study Clock Domain Crossing (CDC) principles and Gray code', type: 'reading' }
    ]},
    { m: 4, theme: 'Protocol Integration', milestones: [
      { text: 'Implement an AMBA APB Slave interface for your UART', type: 'portfolio' },
      { text: 'Pursue an industry certification in RTL Design (e.g., Maven Silicon, Silicon Sandbox)', type: 'certification' }
    ]},
    { m: 5, theme: 'Synthesis & Static Timing', milestones: [
      { text: 'Run your UART through Yosys or Vivado to analyze timing paths', type: 'portfolio' },
      { text: 'Optimize the datapath to hit a target of 100MHz', type: 'portfolio' }
    ]},
    { m: 6, theme: 'Processor Architecture', milestones: [
      { text: 'Design a single-cycle RISC-V core', type: 'portfolio' },
      { text: 'Upload your verified core to GitHub and update your resume', type: 'portfolio' }
    ]}
  ];
};

const generateUVM6Month = () => {
  return [
    { m: 1, theme: 'Digital Logic & Verilog Foundations', milestones: [
      { text: 'Complete all 17 Beginner Verilog Playground problems (gates → flip-flops → counters)', type: 'playground' },
      { text: 'Play Gate Rush Chapters 1–2 (basic gates, combinational circuits) — same concepts, game format, reinforces intuition', type: 'playground' },
      { text: 'Build first portfolio project: 4-bit ripple carry adder + testbench (self-checking, directed tests only — no UVM yet)', type: 'portfolio' },
      { text: 'Read/watch: intro material on Verilog data types, procedural blocks, and simulation basics', type: 'reading' }
    ]},
    { m: 2, theme: 'FSMs, Protocols, and SystemVerilog Basics', milestones: [
      { text: 'Complete Intermediate Verilog Playground problems tagged `fsm` and `uart` (traffic light FSM, sequence detector, UART TX/RX)', type: 'playground' },
      { text: 'Portfolio project: UART controller (transmitter + receiver, directed testbench)', type: 'portfolio' },
      { text: 'Start SystemVerilog Beginner Playground track: data types (`logic` vs `reg` vs `wire`), `always_comb`/`always_ff`, enums, structs', type: 'playground' },
      { text: 'Certification checkpoint: begin an entry-level VLSI/SystemVerilog fundamentals certification (industry-recognized, self-paced)', type: 'certification' }
    ]},
    { m: 3, theme: 'Memory, FIFOs, and CDC Fundamentals', milestones: [
      { text: 'Complete Intermediate Verilog problems tagged `fifo`, `cdc`, `memory`', type: 'playground' },
      { text: 'Portfolio project: Synchronous + Asynchronous FIFO with Gray-code CDC synchronization — this becomes a flagship portfolio piece', type: 'portfolio' },
      { text: 'Continue SystemVerilog Beginner/Intermediate: interfaces, modports, generate blocks', type: 'playground' },
      { text: 'Watch/read a focused deep-dive on metastability and 2-flop synchronizers (this is a common interview topic — flag it explicitly)', type: 'reading' }
    ]},
    { m: 4, theme: 'Entering Verification: OOP, Randomization, Coverage', milestones: [
      { text: 'Complete SystemVerilog Intermediate Playground problems tagged `oop`, `randomization`, `coverage`, `assertions`', type: 'playground' },
      { text: 'Portfolio project: build a constrained-random self-checking testbench for the Month 3 FIFO project (retrofit it — don\'t start a new design)', type: 'portfolio' },
      { text: 'Learn: classes, inheritance, `rand`/`randc`, basic constraints, covergroups/coverpoints, immediate + concurrent SVA', type: 'reading' },
      { text: 'Certification checkpoint: complete the SystemVerilog fundamentals certification started in Month 2', type: 'certification' }
    ]},
    { m: 5, theme: 'UVM Core Components', milestones: [
      { text: 'Complete SystemVerilog Advanced Playground problems tagged `uvm` (sequence item, sequence/sequencer, driver, monitor, scoreboard skeletons)', type: 'playground' },
      { text: 'Portfolio project: build a layered UVM testbench for an AMBA-APB slave — driver, monitor, sequencer, scoreboard, agent', type: 'portfolio' },
      { text: 'Learn: TLM analysis ports, `config_db`, factory overrides, virtual interfaces, UVM phasing (build/connect/run)', type: 'reading' }
    ]},
    { m: 6, theme: 'Formal Verification, Interview Readiness, and Portfolio Polish', milestones: [
      { text: 'Complete remaining SystemVerilog Advanced problems tagged `formal`, `sva` (no-read-before-write, mutual exclusion properties)', type: 'playground' },
      { text: 'Portfolio project: add SVA formal properties to the Month 5 APB testbench — pairs formal + simulation-based verification on the same design', type: 'portfolio' },
      { text: 'Use the RTL-DV Interview Coach tool (UVM Verification track, Associate difficulty) for at least 3 mock sessions', type: 'playground' },
      { text: 'Use the RTL Code Reviewer tool on all portfolio projects before publishing to GitHub — clean up flagged CDC/latch/blocking-assignment issues', type: 'playground' },
      { text: 'Finalize GitHub portfolio: 4 projects minimum (adder, UART, async FIFO, UVM APB testbench), each with a README, waveform screenshots, and coverage summary', type: 'portfolio' },
      { text: 'Certification checkpoint: complete or begin an advanced RTL/UVM verification certification if timeline allows', type: 'certification' }
    ]}
  ];
};

const generateEmbedded6Month = () => {
  return [
    { m: 1, theme: 'C Programming for Hardware', milestones: [
      { text: 'Master pointers, bitwise operations, and memory mapping in C', type: 'reading' },
      { text: 'Blink an LED on a bare-metal STM32 or ARM Cortex-M board', type: 'portfolio' }
    ]},
    { m: 2, theme: 'Interrupts & Peripherals', milestones: [
      { text: 'Write bare-metal drivers for UART and GPIO', type: 'portfolio' },
      { text: 'Set up an Interrupt Service Routine (ISR)', type: 'portfolio' }
    ]},
    { m: 3, theme: 'Sensors & I2C/SPI', milestones: [
      { text: 'Interface with a temperature sensor using I2C', type: 'portfolio' },
      { text: 'Read/Write to an external flash memory using SPI', type: 'portfolio' }
    ]},
    { m: 4, theme: 'RTOS Fundamentals', milestones: [
      { text: 'Port FreeRTOS to your microcontroller', type: 'portfolio' },
      { text: 'Create tasks and use semaphores/mutexes for synchronization', type: 'portfolio' }
    ]},
    { m: 5, theme: 'Advanced RTOS & Debugging', milestones: [
      { text: 'Debug RTOS task starvation using logic analyzers', type: 'portfolio' },
      { text: 'Pursue an industry certification in Embedded Systems', type: 'certification' }
    ]},
    { m: 6, theme: 'Full System Bring-up', milestones: [
      { text: 'Build a complete IoT node (sensor -> RTOS -> UART/WiFi)', type: 'portfolio' },
      { text: 'Publish the project with schematic and code to GitHub', type: 'portfolio' }
    ]}
  ];
};

const templates = [
  { role: 'rtl', timeline: 6, data: generateRTL6Month() },
  { role: 'uvm', timeline: 6, data: generateUVM6Month() },
  { role: 'embedded', timeline: 6, data: generateEmbedded6Month() },
  // Duplicate 6-month logic into 12-month but stretched out (mocking it by just repeating or extending slightly)
  // For V1, we'll just seed 6-month for now, and mirror it as 12-month to satisfy the constraint quickly.
  { role: 'rtl', timeline: 12, data: generateRTL6Month() },
  { role: 'uvm', timeline: 12, data: generateUVM6Month() },
  { role: 'embedded', timeline: 12, data: generateEmbedded6Month() },
];

async function seed() {
  try {
    await pool.query('DELETE FROM roadmap_templates'); // Clear existing
    for (const t of templates) {
      for (const m of t.data) {
        // Simple trick to spread 6 months into 12 months (multiply month number by 2 if timeline is 12)
        const monthNum = t.timeline === 12 ? m.m * 2 - 1 : m.m;
        
        await pool.query(
          'INSERT INTO roadmap_templates (role, timeline, month_number, theme, milestones_json) VALUES ($1, $2, $3, $4, $5)',
          [t.role, t.timeline, monthNum, m.theme, JSON.stringify(m.milestones)]
        );
        
        if (t.timeline === 12) {
          // Fill the gap month with a review/practice month
          await pool.query(
            'INSERT INTO roadmap_templates (role, timeline, month_number, theme, milestones_json) VALUES ($1, $2, $3, $4, $5)',
            [t.role, t.timeline, monthNum + 1, `${m.theme} - Deep Dive & Review`, JSON.stringify([
              { text: 'Review concepts from the previous month and debug remaining issues.', type: 'reading' },
              { text: 'Complete additional Playground exercises related to this topic.', type: 'playground' }
            ])]
          );
        }
      }
    }
    console.log('Seeded roadmap_templates successfully.');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    pool.end();
  }
}

seed();
