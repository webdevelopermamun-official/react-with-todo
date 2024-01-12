
import "./TodoList.scss"

const TodoList = ({children}) => {
  return (
    <>
        <div className="todo_list">
            <ul>
                {children}
            </ul>
        </div>
    </>
  )
}

export default TodoList