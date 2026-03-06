import React from 'react'

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 w-64 hover:shadow-lg transition">
      <div className="text-blue-600 text-3xl">{icon}</div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{text}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
