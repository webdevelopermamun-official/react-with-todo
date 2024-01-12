
import "./DashBordList.scss"


const DashBordList = ({title, children}) => {
  return (
    <div className="todo_dashbord_list">
        <h2>{title}</h2>
        <div className="todo_list_item">
            <ul>
                {children}
            </ul>
        </div>
    </div>
  )
}

export default DashBordList