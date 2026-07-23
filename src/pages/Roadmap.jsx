import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import RoadmapIntake from './RoadmapIntake';
import RoadmapView from './RoadmapView';
import { fetchRoadmap } from '../services/api';

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadRoadmap = async () => {
        setLoading(true);
        try {
          const data = await fetchRoadmap(id);
          setRoadmap(data);
        } catch (error) {
          console.error("Failed to load roadmap", error);
        }
        setLoading(false);
      };
      loadRoadmap();
    }
  }, [id]);

  const handleGenerate = (newId) => {
    navigate(`/roadmap/r/${newId}`);
  };

  return (
    <div className="roadmap-page">
      <PageHeader 
        title={id ? "Your Career Roadmap" : "Career Roadmap Generator"} 
        subtitle={id ? "Your personalized path to silicon mastery." : "Tell us where you are, and we'll map out how to get to your dream role."} 
      />
      
      <section className="section">
        <div className="container">
          {id ? (
            loading ? (
              <div className="loading-state tech-text">LOADING_ROADMAP_DATA...</div>
            ) : (
              <RoadmapView roadmap={roadmap} />
            )
          ) : (
            <RoadmapIntake onGenerate={handleGenerate} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Roadmap;
