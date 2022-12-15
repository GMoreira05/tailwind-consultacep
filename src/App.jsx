import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import Tabela from './components/Tabela'

function App() {
  const [dados, setDados] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleButton = () => {
    let cep = document.getElementById('input-cep').value

    fetch(`https://viacep.com.br/ws/${cep.replace('-', '').replace('.', '')}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          setDados(null)
          setShowModal(true)
        } else {
          setDados(data)
        }
      })

  }

  return (
    <div className="App">
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
      <div className="container mx-auto">
        <input type="text" id="input-cep" autoComplete='false' className='focus:border-sky-500 focus:outline-none text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 mr-5' />
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={e => handleButton()}>
          Buscar CEP
        </button>
        <div className='overflow-x-auto relative'>
          <Tabela dados={dados} />
        </div>
      </div>
    </div>
  )
}

export default App
