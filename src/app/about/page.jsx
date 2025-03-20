'use client'
import { useRouter } from 'next/navigation'

export default function About () {
  const router = useRouter()

  

  return (
    <div>
      <div className='mx-auto mt-4 p-4 navBar'>
        <button
          onClick={() => router.push('/chat')}
          className='bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white'
        >
          Chat
        </button>
      </div>
      <div className='mx-auto p-4 md:w-1/2 text-white mainBody'>
        <h1 className='font-bold text-4xl text-center'>About</h1>
        <p className='mt-4 text-lg'>
          This is a simple chat application built to identify a list of foods
          from given list:
        </p>

        <ol className='justify-around md:p-4 py-4 md:pl-8 list-decimal list-inside'>
          <li>Jalebi</li>
          <li>Kofta</li>
          <li>Naan</li>
          <li>Paneer-Tikka</li>
          <li>Pav-Bhaji</li>
          <li>Vadapav</li>
          <li>Biriyani</li>
          <li>Chole-Bhature</li>
          <li>Dal</li>
          <li>Dhokla</li>
          <li>Dosa</li>
          <li>Kathi</li>
          <li>Paani-Puri</li>
          <li>Pakora</li>
        </ol>

        <p> Made by - Aryan Srivastava | Keshav Raj | Suhail | Ankit Kumar | Jatin </p>

        
      </div>
    </div>
  )
}
