import React, { useState, useEffect } from 'react';
import './styles.css'
import { Card } from '../Card'

export function Home() {
  // Definição de states
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})

  // Função para lidar com adição de estudante, 
  // utilizando o nome do estudante armazendo no stado "studentName".
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    // Hook para incluir no array, os estudantes.
    setStudents(prevState => [...prevState, newStudent])
  }

  // Quando passado um array vazio na segunda opção, 
  // é chamado apenas na primeira renderização do componente, 
  // mas caso seja passado um estado na segunda opção, executa o corpo do hook, 
  // em toda atualização do estado passado.
  useEffect(() => {
    // corpo do useEffect
    fetch('https://api.github.com/users/mggcmatheus')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto perfil" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Digite o nome"
        onChange={e => setStudentName(e.target.value)}
      />
      <button 
        type="button"
        onClick={handleAddStudent}
      >Adicionar</button>
      
      {
        // Iterando sobre o array "students" para apresentar o cards adicionados.
        students.map(student => (
          <Card 
            name={student.name} 
            time={student.time}
            key={student.time}
          />
        )
        )
      }

    </div>
  )
}