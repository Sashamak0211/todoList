import { useState } from 'react'
import './App.css'
import { useTodos } from './hooks/useTodo'

function App() {
    const { todos, addTodo } = useTodos()
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const text = inputValue.trim()
        // addTodo(text)
        // input.value = ''

        if (!text) return
        try {
            await addTodo(text)
            setInputValue('')
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error)
        }
    }

    const normalizedTodos = todos.map((todo) => ({
        id: todo.id,
        text: todo.text || todo.newTodo?.text || todo.textTrim || 'Без текста',
    }))

    return (
        <div className="app-container">
            <h1>Список задач</h1>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    value={inputValue}
                    className="todo-input"
                    name="todoInput"
                    type="text"
                    placeholder="Задачи на сегодня"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="todo-submit-button" type="submit">
                    Записать
                </button>
            </form>
            <div className="todo-list">
                {normalizedTodos.map(({ id, text }) => (
                    <div key={id}>{text}</div>
                ))}
            </div>
        </div>
    )
}

export default App
