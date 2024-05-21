import React from 'react'

export default function NameModal() {
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Your Name</h2>
            <form>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}
