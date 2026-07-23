const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'ionrise_db',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
});

const generateDesignFlow = () => {
  return [
    { stage_order: 1, stage_name: 'Architecture & Spec', duration_estimate: '2-4 Weeks', milestones: [
      { id: 't1', text: 'Define microarchitecture and pipeline depth.' },
      { id: 't2', text: 'Document target protocols and register maps.' },
      { id: 't3', text: 'Establish power, performance, and area (PPA) targets.' }
    ]},
    { stage_order: 2, stage_name: 'RTL Design', duration_estimate: '4-8 Weeks', milestones: [
      { id: 't4', text: 'Implement core datapaths and FSMs in SystemVerilog.' },
      { id: 't5', text: 'Integrate standard protocol interfaces.' },
      { id: 't6', text: 'Run initial Lint and CDC (Clock Domain Crossing) checks.' }
    ]},
    { stage_order: 3, stage_name: 'Verification (DV)', duration_estimate: '6-12 Weeks', milestones: [
      { id: 't7', text: 'Develop UVM testbench architecture.' },
      { id: 't8', text: 'Implement constrained-random sequences.' },
      { id: 't9', text: 'Achieve 100% Functional and Code Coverage.' }
    ]},
    { stage_order: 4, stage_name: 'Synthesis & Timing', duration_estimate: '3-5 Weeks', milestones: [
      { id: 't10', text: 'Synthesize RTL to gate-level netlist.' },
      { id: 't11', text: 'Resolve setup and hold timing violations.' },
      { id: 't12', text: 'Perform Formal Equivalence Checking (Logic Equivalency).' }
    ]},
    { stage_order: 5, stage_name: 'Physical Design (P&R)', duration_estimate: '4-8 Weeks', milestones: [
      { id: 't13', text: 'Floorplanning and power grid design.' },
      { id: 't14', text: 'Clock Tree Synthesis (CTS) and routing.' },
      { id: 't15', text: 'Physical verification (DRC & LVS signoff).' }
    ]},
    { stage_order: 6, stage_name: 'Tape-out', duration_estimate: '1 Week', milestones: [
      { id: 't16', text: 'Final GDSII generation.' },
      { id: 't17', text: 'Transfer database to foundry.' }
    ]}
  ];
};

async function seed() {
  try {
    await pool.query('DELETE FROM design_flow_templates'); 
    const flow = generateDesignFlow();
    
    for (const stage of flow) {
      await pool.query(
        'INSERT INTO design_flow_templates (stage_name, stage_order, duration_estimate, milestones_json) VALUES ($1, $2, $3, $4)',
        [stage.stage_name, stage.stage_order, stage.duration_estimate, JSON.stringify(stage.milestones)]
      );
    }
    console.log('Seeded design_flow_templates successfully.');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    pool.end();
  }
}

seed();
