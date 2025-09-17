import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface Device {
  id: number
  name: string
  type: string
  status: 'online' | 'offline'
  lastReading: string
}

const RemoteMonitoring: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Heart Rate Monitor', type: 'Wearable', status: 'online', lastReading: '72 bpm' },
    { id: 2, name: 'Glucose Sensor', type: 'IoT', status: 'offline', lastReading: 'N/A' },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Remote Patient Monitoring</h1>
        <p className="text-gray-600 mb-6">
          Monitor patient vitals and IoT devices in real-time. Connect new devices, check status, and analyze patient data securely.
        </p>

        {/* Device Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Device</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last Reading</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.type}</td>
                  <td>
                    <span className={`badge ${d.status === 'online' ? 'badge-success' : 'badge-error'}`}>{d.status}</span>
                  </td>
                  <td>{d.lastReading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-primary" onClick={() => alert('Device onboarding coming soon!')}>
            ➕ Add Device
          </button>

          <Link to="/" className="btn btn-outline">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RemoteMonitoring
