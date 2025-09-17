import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface ResponseUnit {
  id: number
  type: 'Ambulance' | 'Drone' | 'Helicopter' | 'Jet'
  status: 'available' | 'deployed' | 'maintenance'
  location: string
}

const EmergencyResponse: React.FC = () => {
  const [units, setUnits] = useState<ResponseUnit[]>([
    { id: 1, type: 'Ambulance', status: 'available', location: 'Lagos' },
    { id: 2, type: 'Drone', status: 'deployed', location: 'Abuja' },
    { id: 3, type: 'Helicopter', status: 'maintenance', location: 'Port Harcourt' },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Emergency Response</h1>
        <p className="text-gray-600 mb-6">
          Coordinate life-saving response units — ambulances, drones, helicopters, and private jets — all on a blockchain-backed dispatch
          system.
        </p>

        {/* Units Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Unit Type</th>
                <th>Status</th>
                <th>Current Location</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.id}</td>
                  <td>{unit.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        unit.status === 'available' ? 'badge-success' : unit.status === 'deployed' ? 'badge-warning' : 'badge-error'
                      }`}
                    >
                      {unit.status}
                    </span>
                  </td>
                  <td>{unit.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-primary" onClick={() => alert('Dispatch workflow coming soon!')}>
            🚑 Dispatch Unit
          </button>

          <Link to="/" className="btn btn-outline">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmergencyResponse
