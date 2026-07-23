const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API: Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Get all blog posts
app.get('/api/blogs', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blog_posts ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Submit contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO contacts (name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, company, message]
    );
    res.status(201).json({ success: true, contact: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// API: Submit careers application
app.post('/api/careers', async (req, res) => {
  const { name, email, linkedin_url, portfolio_url, cover_letter, role } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO applications (name, email, linkedin_url, portfolio_url, cover_letter, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, linkedin_url, portfolio_url, cover_letter, role]
    );
    res.status(201).json({ success: true, application: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// API: Generate Roadmap
app.post('/api/roadmaps/generate', async (req, res) => {
  const { role, timeline, intakeAnswers } = req.body;
  try {
    const { rows } = await db.query(
      'SELECT * FROM roadmap_templates WHERE role = $1 AND timeline = $2 ORDER BY month_number ASC',
      [role, timeline]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No templates found for this track.' });
    }

    const roadmapId = require('crypto').randomUUID().split('-')[0]; // Short ID
    
    // Convert rows into a clean JSON array
    const roadmapData = rows.map(r => ({
      month: r.month_number,
      theme: r.theme,
      milestones: r.milestones_json
    }));

    // Inject skill-gap callouts
    const skills = intakeAnswers.skills || [];
    roadmapData.forEach(m => {
      // Create a shallow copy of milestones
      let newMilestones = [...m.milestones];
      
      if (m.month === 1 && skills.includes('None Yet')) {
        newMilestones.push({ text: 'Skill Gap: Supplementary week on number representation (2\'s complement, overflow) before starting gates.', type: 'reading' });
      }
      if (m.month === 2 && !skills.includes('FSM Design')) {
        newMilestones.push({ text: 'Skill Gap: Moore vs Mealy comparison exercise before the sequence-detector problems.', type: 'reading' });
      }
      if (m.month === 3 && !skills.includes('CDC')) {
        newMilestones.push({ text: 'Skill Gap: This month\'s CDC content is mandatory, not optional, regardless of pace.', type: 'reading' });
      }
      if (m.month === 5 && !skills.includes('UVM')) {
        newMilestones.push({ text: 'Skill Gap: Add an extra week reviewing the driver/monitor split before attempting the full agent.', type: 'reading' });
      }
      
      m.milestones = newMilestones;
    });

    await db.query(
      'INSERT INTO user_roadmaps (id, intake_answers_json, roadmap_data_json) VALUES ($1, $2, $3)',
      [roadmapId, JSON.stringify(intakeAnswers), JSON.stringify(roadmapData)]
    );

    res.status(201).json({ id: roadmapId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

// API: Get Roadmap by ID
app.get('/api/roadmaps/:id', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM user_roadmaps WHERE id = $1',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve roadmap' });
  }
});

// API: Generate Design Flow
app.post('/api/design-flow/generate', async (req, res) => {
  const { projectType, protocol, features, timing, verification } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM design_flow_templates ORDER BY stage_order ASC');
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No templates found.' });
    }

    const flowId = require('crypto').randomUUID().split('-')[0];
    
    const flowData = { stages: [] };
    
    rows.forEach(r => {
      const stage = {
        id: `s${r.stage_order}`,
        name: r.stage_name,
        duration: r.duration_estimate,
        tasks: r.milestones_json,
        riskFlag: null
      };

      // Risk auto-injection based on features
      if (r.stage_order === 2 && features.includes('Clock Domain Crossing (CDC)')) {
        stage.riskFlag = 'CDC complexity requires structural checking before simulation.';
      }
      if (r.stage_order === 3 && features.includes('Low-power mode')) {
        stage.riskFlag = 'Power-domain verification (UPF) is critical. Auto-adding milestone.';
        stage.tasks.push({ id: `t_risk_${r.stage_order}`, text: 'Verify UPF power intent.' });
      }
      if (r.stage_order === 4 && timing === 'High Performance (> 500MHz)') {
        stage.riskFlag = 'Timing closure risk high due to target frequency.';
      }

      flowData.stages.push(stage);
    });

    await db.query(
      'INSERT INTO user_design_flows (id, intake_answers_json, flow_data_json) VALUES ($1, $2, $3)',
      [flowId, JSON.stringify(req.body), JSON.stringify(flowData)]
    );

    res.status(201).json({ id: flowId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate design flow' });
  }
});

// API: Get Design Flow by ID
app.get('/api/design-flow/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM user_design_flows WHERE id = $1', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Flow not found' });
    }
    res.json(rows[0].flow_data_json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve flow' });
  }
});

app.listen(port, () => {
  console.log(`Ionrise backend running on port ${port}`);
});
