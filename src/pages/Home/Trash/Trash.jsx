import { useContext, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import TodayContext from "../../../context/TodayContext";
import "./Trash.scss"
import TodoSideModal from "../../../components/TodoSideModal/TodoSideModal";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import WeekContext from "../../../context/WeekContext";
import { Accordion } from "react-bootstrap";


const Trash = () => {
  // get today data form contact
  const {trashData} = useContext(TodayContext);
  const {weekTrashData, weekChildDataGet, setWeeChildkDataGet} = useContext(WeekContext);

  // show side modal 
  const [todoSideModal, setTodoSideModal] = useState(false);

  // get single view
  const [todySingleView, setTodaySingleView] = useState([])
  const handleTodaySingleView = (id) => {
    setTodaySingleView(trashData.find((data) => data.id === id));
    setTodoSideModal(true);
  }

  // week modal show
  const [todoWeekSideModal, setTodoWeekSideModal] = useState(false);

  // get single view
  const [weekSingleView, setWeekSingleView] = useState([])
  const handleWeekSingleView = (id) => {
    setWeekSingleView(weekTrashData.find((data) => data.id === id));
    setTodoWeekSideModal(true);
    const data = (weekTrashData.find((data) => data.id === id))
    setWeeChildkDataGet(data.taskDetels)
  }


  return (

    <>
      <SectionHeader title="Today Data" />
      {
        todoSideModal &&
        <TodoSideModal title="Today Deleted single view" hide={setTodoSideModal} taskName={todySingleView.title} taskDesc ={todySingleView.description} starTime={todySingleView.startTime} endTime={todySingleView.endTime} argency={todySingleView.argency} deleted={todySingleView.id} typeChange={todySingleView.id} today={true} />
      }

          <div className="todo_dashbord_list trash_tasks">
            <h2>Today Task Deleted</h2>
            <div className="todo_list_item">
                <ul>
                  {/* map through the array and create list */}
                  {trashData.length === 0 ?  <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>No Trash Data Found</h1> :
                    trashData.map((data, index) => (
                      <li onClick={() => handleTodaySingleView(data.id)} key={index}>
                        <div className="todos_future">
                            <p>{data.title}</p>
                            <div className="todos_future_list pt-1">
                                <p><b>Start:</b> {data.startTime}</p>
                                <p><b>End:</b>  {data.endTime}</p>
                                <p>{data.argency}</p>
                            </div>
                        </div>
                        <span><MdKeyboardArrowRight /></span>
                      </li>
                    ))
                  }
                </ul>
            </div>
          </div>


          

        {
            todoWeekSideModal &&
            <TodoSideModal hide={setTodoWeekSideModal} title="Your weekly plan" deleted={weekSingleView.id} childrenWeek={true}>
            <div className="sidebar_wraper">
              <div className="main_content">
                <h4>{weekSingleView?.title}</h4>
                <p>{weekSingleView?.description}</p>
                <span><b>Working Week : </b> {weekSingleView?.startWeek}</span> <span>- {weekSingleView?.endweek}</span>
              </div>
              {/* Show the task list of a specific date */}
              {
                weekChildDataGet.length === 0 ? <h5 className="py-3 text-center">No Data Found</h5> :
                weekChildDataGet.map((item, index) => {
                  return (
                    <div className="week_child_item pt-2" key={index}>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                          {item.description}
                          <div className="d-flex justify-content-between align-items-center pt-4">
                            <span><b>Date: </b>{item.day}</span>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  )
                })
              }
            </div>
          </TodoSideModal> 
        }

        <div className="todo_dashbord_list trash_tasks mt-5">
          <h2>Weekly Task Deleted</h2>
          <div className="todo_list_item">
              <ul>
                {/* map through the array and create list */}
                {weekTrashData.length === 0 ?  <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>No Trash Data Found</h1> :
                  weekTrashData.map((data, index) => (
                    <li onClick={() => handleWeekSingleView(data.id)} key={index}>
                      <div className="todos_future">
                          <p>{data.title}</p>
                          <div className="todos_future_list pt-1">
                              <p><b>Start:</b> {data.startWeek}</p>
                              <p>{data.argency}</p>
                          </div>
                      </div>
                      <span><MdKeyboardArrowRight /></span>
                    </li>
                  ))
                }
              </ul>
          </div>
      </div>
    </>


  )
}

export default Trash