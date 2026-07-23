import React from 'react';

const SpecTable = ({ specs }) => {
  return (
    <table className="spec-table">
      <tbody>
        {specs.map((spec, index) => (
          <tr key={index}>
            <td>{spec.label}</td>
            <td>
              {spec.status ? (
                <span className={`status-pill ${spec.status.toLowerCase().replace(' ', '-')}`}>
                  {spec.status}
                </span>
              ) : (
                spec.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecTable;
