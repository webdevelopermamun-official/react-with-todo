import { Col, Row } from "react-bootstrap"
import DashBordList from "../../../components/DashBordList/DashBordList"
import SectionHeader from "../../../components/SectionHeader/SectionHeader"
import { useContext, useState } from "react"
import TodoSideModal from "../../../components/TodoSideModal/TodoSideModal"
import TodayContext from "../../../context/TodayContext"
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom"
import WeekContext from "../../../context/WeekContext"

const DashBoard = () => {
  // dashboard modal show 
  const [todoSideModal, setTodoSideModal] = useState(false);
  const [weekSideModal, setWeekSideModal] = useState(false);
  const [trashSideModal, setTrashSideModal] = useState(false);
  // show todays 5 task
  const {todayDashbordData, getTodayTaskDashbordData, todayDashbordDataTrash} = useContext(TodayContext);
  const {weekDashbordData} = useContext(WeekContext);

  // get single data for today trash data
  const [singleTrashVew, setSingleTrashVew] = useState([]);

  const handleTodaySingleTrashView = (id) => {
    setSingleTrashVew(todayDashbordDataTrash.find((data) => data.id === id));
    setTrashSideModal(true);

  }  
  // get single data for today database
  const [singleVew, setSingleVew] = useState([]);

  const handleTodaySingleView = (id) => {
    setSingleVew(todayDashbordData.find((data) => data.id === id));
    setTodoSideModal(true);

  }  
  
  // get single data for weekley database
  const [weekSingleVew, setWeekSingleVew] = useState([]);

  const handleWeekSingleView = (id) => {
    setWeekSingleVew(weekDashbordData.find((data) => data.id === id));
    setWeekSideModal(true);
  }


  return (
    <>  
      <SectionHeader title="Dashboard" />
      {
        // today data show in modal
        todoSideModal &&
        <TodoSideModal title="Task single view" hide={setTodoSideModal} taskName={singleVew.title} taskDesc ={singleVew.description} starTime={singleVew.startTime} endTime={singleVew.endTime} argency={singleVew.argency} />
      }
      {
        // week data show in modal
        weekSideModal &&
        <TodoSideModal title="Weekly Task single view" hide={setWeekSideModal} taskName={weekSingleVew.title} taskDesc ={weekSingleVew.description} starTime={weekSingleVew.startWeek} argency={singleVew.argency} />
      }
      {
        // today trash file data show in modal
        trashSideModal &&
        <TodoSideModal title="Trash view" hide={setTrashSideModal} taskName={singleTrashVew.title} taskDesc ={singleTrashVew.description} starTime={singleTrashVew.startTime} endTime={singleVew.endTime} argency={singleTrashVew.argency} deleted={singleTrashVew.id} today={true} />
      }

      <DashBordList show={setTodoSideModal} title="Today">
        {
          todayDashbordData.length === 0 ? "" :
          todayDashbordData.map((item, index) => (
            <li key={index} onClick={() => handleTodaySingleView(item.id)}>
              <div className="todos_future">
                  <p>{item.title}</p>
                  <div className="todos_future_list pt-1">
                      <p><b>Start:</b> {item.startTime}</p>
                      <p><b>End:</b>  {item.endTime}</p>
                      <p> {item.argency}</p>
                  </div>
              </div>
              <span><MdKeyboardArrowRight /></span>
            </li>
          ))
        }
        {
          todayDashbordData.length >= 5 ?
          <NavLink className="btn btn-sm btn-info mt-4" to="today">See More</NavLink> :""
        }

      </DashBordList>

      <Row className="pt-4">
        <Col md={6}>
          <DashBordList show={setWeekSideModal} title="This Week">
            {
              weekDashbordData.length === 0 ? "" :
              weekDashbordData.map((item, index) => (
                <li key={index} onClick={() => handleWeekSingleView(item.id)}>
                  <div className="todos_future">
                      <p>{item.title}</p>
                      <div className="todos_future_list pt-1">
                          <p><b>Start:</b> {item.startWeek}</p>
                          <p> {item.argency}</p>
                      </div>
                  </div>
                  <span><MdKeyboardArrowRight /></span>
                </li>
              ))
            }
            {
              weekDashbordData.length >= 5 ?
              <NavLink className="btn btn-sm btn-info mt-4" to="this-weeek">See More</NavLink> :""
            }
          </DashBordList>
        </Col>
        <Col md={6}>
          <DashBordList show={setTrashSideModal} title="Resent Trash">
            {
              todayDashbordDataTrash.length === 0 ? "" :
              todayDashbordDataTrash.map((item, index) => (
                <li key={index} onClick={() => handleTodaySingleTrashView(item.id)}>
                  <div className="todos_future">
                      <p>{item.title}</p>
                      <div className="todos_future_list pt-1">
                          <p><b>Start:</b> {item.startWeek}</p>
                          <p> {item.argency}</p>
                      </div>
                  </div>
                  <span><MdKeyboardArrowRight /></span>
                </li>
              ))
            }
            {
              todayDashbordDataTrash.length >= 5 ?
              <NavLink className="btn btn-sm btn-danger mt-4" to="this-trash">See More</NavLink> :""
            }
          </DashBordList>
        </Col>
      </Row>


    </>
  )
}

export default DashBoard