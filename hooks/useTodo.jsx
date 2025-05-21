import { useState, useEffect } from 'react'

export function useTodos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3005/todos')
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                setTodos(loadedTodos)
            })
    }, [])  // Получение задачи

    
    const addTodo = (text) => {
        if (!text.trim() === '') return

        const newTodo = {
            id: Date.now(),
            text,
        }
        setTodos((todoList) => [...todoList, newTodo])
    }
    return {
        todos,
        addTodo,
    }
}
