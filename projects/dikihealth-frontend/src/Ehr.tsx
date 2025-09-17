// src/pages/EHR.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface PatientRecord {
  id: number
  name: string
  age: number
  diagnosis: string
}

const EHR: React.FC = () => {
  const [records, setRecords] = useState<PatientRecord[]>([
    { id: 1, name: 'John Doe', age: 45, diagnosis: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 32, diagnosis: 'Asthma' },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Electronic Health Records</h1>
        <p className="text-gray-600 mb-6">
          Secure, blockchain-backed patient record management. This is where you can store and retrieve patient data with full transparency
          and immutability.
        </p>

        {/* Record List */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.id}</td>
                  <td>{rec.name}</td>
                  <td>{rec.age}</td>
                  <td>{rec.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-primary" onClick={() => alert('Add new patient record feature coming soon!')}>
            ➕ Add Record
          </button>

          <Link to="/" className="btn btn-outline">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EHR
