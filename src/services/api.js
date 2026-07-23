const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitContactForm = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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

export const generateDesignFlow = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/design-flow/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to generate flow');
    }
    return await response.json();
  } catch (error) {
    console.warn('Flow generate error, falling back to mock data:', error);
    return { id: 'mock-' + Date.now().toString().slice(-6) };
  }
};

export const getDesignFlow = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/design-flow/${id}`);
    if (!response.ok) throw new Error('Flow not found');
    return await response.json();
  } catch (error) {
    console.warn('Flow fetch error, falling back to mock data:', error);
    return {
      stages: [
        {
          id: 's1',
          name: 'Architecture & Spec',
          duration: '2-4 Weeks',
          tasks: [
            { id: 't1', text: 'Define microarchitecture and pipeline depth.' },
            { id: 't2', text: 'Document target protocols and register maps.' },
            { id: 't3', text: 'Establish power, performance, and area (PPA) targets.' }
          ]
        },
        {
          id: 's2',
          name: 'RTL Design',
          duration: '4-8 Weeks',
          riskFlag: 'CDC complexity requires structural checking before simulation.',
          tasks: [
            { id: 't4', text: 'Implement core datapaths and FSMs in SystemVerilog.' },
            { id: 't5', text: 'Integrate standard protocol interfaces.' },
            { id: 't6', text: 'Run initial Lint and CDC (Clock Domain Crossing) checks.' }
          ]
        },
        {
          id: 's3',
          name: 'Verification (DV)',
          duration: '6-12 Weeks',
          tasks: [
            { id: 't7', text: 'Develop UVM testbench architecture.' },
            { id: 't8', text: 'Implement constrained-random sequences.' },
            { id: 't9', text: 'Achieve 100% Functional and Code Coverage.' }
          ]
        },
        {
          id: 's4',
          name: 'Synthesis & Timing',
          duration: '3-5 Weeks',
          riskFlag: 'Timing closure risk high due to target frequency.',
          tasks: [
            { id: 't10', text: 'Synthesize RTL to gate-level netlist.' },
            { id: 't11', text: 'Resolve setup and hold timing violations.' },
            { id: 't12', text: 'Perform Formal Equivalence Checking (Logic Equivalency).' }
          ]
        },
        {
          id: 's5',
          name: 'Physical Design (P&R)',
          duration: '4-8 Weeks',
          tasks: [
            { id: 't13', text: 'Floorplanning and power grid design.' },
            { id: 't14', text: 'Clock Tree Synthesis (CTS) and routing.' },
            { id: 't15', text: 'Physical verification (DRC & LVS signoff).' }
          ]
        },
        {
          id: 's6',
          name: 'Tape-out',
          duration: '1 Week',
          tasks: [
            { id: 't16', text: 'Final GDSII generation.' },
            { id: 't17', text: 'Transfer database to foundry.' }
          ]
        }
      ]
    };
  }
};
