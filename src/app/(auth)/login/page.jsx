'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter for redirection

export default function Login () {
  // const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  // const handleMouseMove = e => {
  //   const x = (e.clientX / window.innerWidth) * 100
  //   const y = (e.clientY / window.innerHeight) * 100
  //   setMousePos({ x, y })
  //}
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter() // Router for navigation

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await response.json()
    setLoading(false)

    if (response.ok) {
      localStorage.setItem('token', 'yourAuthToken') // Store token in localStorage
      router.push('chat') // Redirect to chat page after login
    } else {
      setError(data.message || 'Login failed.')
    }
  }

  return (
    <>
      {/* <div className="flex justify-center items-center bg-black min-h-screen"> */}
      <div className="flex justify-center items-center bg-[url('/bg.jpg')] bg-repeat min-h-screen login-container">

        <div className='bg-white shadow-md p-6 rounded-lg w-full max-w-md'>
          <h2 className='mb-4 font-semibold text-blue-500 text-2xl text-center'>
            Login
          </h2>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <form onSubmit={handleSubmit} className='space-y-4 text-black'>
            <input
              type='text'
              placeholder='Username'
              className='p-2 border rounded-lg focus:ring focus:ring-blue-300 w-full'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              className='p-2 border rounded-lg focus:ring focus:ring-blue-300 w-full'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 p-2 rounded-lg w-full text-white'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
