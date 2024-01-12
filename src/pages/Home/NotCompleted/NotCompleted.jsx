import { useContext, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import TodayContext from "../../../context/TodayContext";
import "./NotCompleted.scss"
import TodoSideModal from "../../../components/TodoSideModal/TodoSideModal";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import WeekContext from "../../../context/WeekContext";
import { Accordion } from "react-bootstrap";


const NotCompleted = () => {
  // get today data form contact
  const {notComplitedData} = useContext(TodayContext);

  // get week
  const {weekNotComplitedData, weekChildDataGet, setWeeChildkDataGet} = useContext(WeekContext);

  // show side modal 
  const [todoSideModal, setTodoSideModal] = useState(false);

  //shw week side modal
  const [weekSideModal, setWeekSideModal] = useState(false);

  // get single view
  const [todySingleView, setTodaySingleView] = useState([])
  const handleTodaySingleView = (id) => {
    setTodaySingleView(notComplitedData.find((data) => data.id === id));
    setTodoSideModal(true);
  }


  // get week single view
  const [weekSingleView, setweekSingleView] = useState([])
  const handleWeekSingleView = (id) => {
    setweekSingleView(weekNotComplitedData.find((data) => data.id === id));
    setWeekSideModal(true);
    const data = (weekNotComplitedData.find((data) => data.id === id))
    setWeeChildkDataGet(data.taskDetels)
  }


  return (

    <>
      <SectionHeader title="Not Completed" />
      {
        // today data
        todoSideModal &&
        <TodoSideModal title="Today Not Complited single view" hide={setTodoSideModal} taskName={todySingleView.title} taskDesc ={todySingleView.description} starTime={todySingleView.startTime} endTime={todySingleView.endTime} argency={todySingleView.argency} id={todySingleView.id} typeChange={todySingleView.id} today={true}  />
      }



        {
            weekSideModal &&
            <TodoSideModal hide={setWeekSideModal} title="Your weekly plan" id={weekSingleView.id} typeChange={weekSingleView.id} childrenWeek={true}>
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


      <div className="todo_dashbord_list not_complited_tasks">
        <h2>Today Task Not Completed</h2>
        <div className="todo_list_item">
            <ul>
              {/* map through the array and create list */}
              {notComplitedData.length === 0 ?  <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>Data Not Found</h1> :
                notComplitedData.map((data, index) => (
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


      <div className="todo_dashbord_list not_complited_tasks mt-4">
        <h2>Weeks Task Not Completed</h2>
        <div className="todo_list_item">
            <ul>
              {/* map through the array and create list */}
              {weekNotComplitedData.length === 0 ?  <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>Data Not Found</h1> :
                weekNotComplitedData.map((data, index) => (
                  <li onClick={() => handleWeekSingleView(data.id)} key={index}>
                    <div className="todos_future">
                        <p>{data.title}</p>
                        <div className="todos_future_list pt-1">
                            <p><b>Start:</b> {data.startTime}</p>
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

export default NotCompleted