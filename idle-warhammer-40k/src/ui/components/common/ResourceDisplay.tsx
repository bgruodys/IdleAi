import React from 'react';

interface Resources {
  requisition: number;
  power: number;
  population: number;
}

interface ResourceDisplayProps {
  resources: Resources;
}

/**
 * @fileoverview Resource display component for showing game resources
 * @author AI Assistant
 * @version 1.0.0
 */

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
      <h2 className="text-lg font-bold text-gray-200 mb-3">Resources</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Requisition */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {resources.requisition.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Requisition</div>
        </div>
        
        {/* Power */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {resources.power.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Power</div>
        </div>
        
        {/* Population */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {resources.population.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Population</div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDisplay; 