import { useState, useEffect } from 'react'

export function useTodos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3005/todos')
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                setTodos(loadedTodos)
            })
    }, []) // Получение задачи

    const addTodo = async (text) => {
        const textTrim = text.trim()
        if (!textTrim) return

        // const newTodo = {
        //     id: Date.now(),
        //     text: textTrim,
        // }

        // отправка на сервер
        try {
            const response = await fetch('http://localhost:3005/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ textTrim }),
            })

            // ответ от сервера

            if (!response.ok) {
                throw new Error('Ошибка при добавлении задачи')
            }

            const data = await response.json()

            console.log(' Добавлена задача ', data)

            setTodos((todoList) => [...todoList, data])
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }
    return {
        todos,
        addTodo,
    }
}
