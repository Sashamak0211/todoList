import './App.css'
import { useTodos } from './hooks/useTodo'

function App() {
    const { todos, addTodo } = useTodos()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const input = e.target.elements.todoInput
        const text = input.value.trim()
        // addTodo(text)
        // input.value = ''

        if(!text) return;

        addTodo(text)

        try {
            await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ text })
            })
        } catch (error) {
            console.error('Ошибка добавления:', error);
            
        }
        input.value = ''
    }

    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="todoInput"
                    type="text"
                    placeholder="Задачи на сегодня"
                />
                <button 
            
                type="submit">Записать</button>
            </form>
            <div className="todo-box">
                {todos.map(({ id, text }) => {
                    ;<div key={id}> {text} </div>
                })}
            </div>
        </>
    )
}

export default App
