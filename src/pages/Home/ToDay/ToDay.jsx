import { FaPlus, FaTimes } from "react-icons/fa"
import SectionHeader from "../../../components/SectionHeader/SectionHeader"
import TodoList from "../../../components/TodoList/TodoList"
import {FaTrashAlt, FaUserTimes, FaEye, FaRegEdit } from "react-icons/fa";
import { useContext, useReducer, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import TodayContext from "../../../context/TodayContext";
import { Col, Row } from "react-bootstrap";

import "./ToDay.scss"
import TodoSideModal from "../../../components/TodoSideModal/TodoSideModal";

const todayFormReducer = (state, {type, payload}) => {
  switch (type) {
    case "NEW_TODAY_LIST_CREATE":
      return  [...state, payload];
    
    case "GET_TODAY_DATA":
      return payload;
    
    case "TODAY_DATA_TYPE_DATA_UPDATE":
      return [...state, payload];

    default:
      return state;
  }

}


const ToDay = () => {

  // form controll using useReducer
  const [todayFormData, dispatch] = useReducer(todayFormReducer, []);
  
 

  // get today data form contact
  const {todayDataGet, getTodayTaskData, getTodayComplitedData, getTodayNotComplitedData, getTodayTaskDashbordData, getTodayTrashData, getTodayTaskDashbordTrashData} = useContext(TodayContext)

  // show today task form to post data
  const [showTodayForm, setShowTodayForm] = useState(false);

  // show single view sidebar
  const [showSingleViewSidebar, setShowSingleViewSidebar] = useState(true);

  // show single edit sidebar
  const [showSingleEditSidebar, setShowSingleEditSidebar] = useState(false);



  // single view data
  const [singleView, setSingleVew] = useState([])
 
  // manage input fields
  const [inputForm, setInputForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    argency: "",
    type: "null",
    description: "",
  });

  // set input value change
  const handleInputChange = (e) => {
    setInputForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  // send today data form json server
  const handleTodayTaskFormSubmit = (e) => {
    e.preventDefault();
    if(!inputForm.title){
      Swal.fire({
        title: "The Internet?",
        text: "All Fields Are Required",
        icon: "error"
      });
    }else{
      const response = axios.post("http://localhost:7500/today", inputForm).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Today List Added",
          showConfirmButton: false,
          timer: 1500
        });
        setShowTodayForm(false);
        getTodayTaskData();
        getTodayTaskDashbordData()
        setInputForm({
        title: "",
        startTime: "",
        endTime: "",
        argency: "",
        type: "null",
        description: "",})
      })
      dispatch({type: "NEW_TODAY_LIST_CREATE", payload: response.data});
    }
  }

  // sidebar hide data clear 
  const handleSidebarHide = () => {
    setShowSingleEditSidebar(false);
    setInputForm({
      title: "",
      startTime: "",
      endTime: "",
      argency: "",
      type: "null",
      description: "",
    })

  }
  // edit  task data
  const handleSingleEdit = (id) => {
    setShowSingleEditSidebar(true);
    setInputForm(todayDataGet.find((data) => data.id === id));
  }

  // edit form data update
  const handleTodayTaskFormSubmitEdit = async(e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:7500/today/${inputForm.id}`, inputForm);
    getTodayTaskData();
    setShowSingleEditSidebar(false)
  }
  // today data deleted
  const handleTodayDataDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:7500/today/${id}`, { type: "Trash" }).then(() => {
          getTodayTaskData();
          getTodayTrashData();
          getTodayTaskDashbordData()
          getTodayTaskDashbordTrashData()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
      }
    });
  }


// not completed data update
const handleTodayTypeChange = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This task is not yet complete. Do you want to save it?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.patch(`http://localhost:7500/today/${id}`, { type: "not completed" }).then(() => {
      getTodayTaskData();
      getTodayNotComplitedData()
      getTodayTaskDashbordData()
    })
      Swal.fire({
        title: "Save!",
        text: "This task has been saved in the not completed list",
        icon: "success"
      });
    }
  });
};



// completed data update
const handleChecItemAndUpdateToComplited = async (id, e) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You have completed this task",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Completed it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.patch(`http://localhost:7500/today/${id}`, { type: "completed" }).then(() => {
      getTodayTaskData();
      getTodayComplitedData();
      getTodayTaskDashbordData();
      e.target.checked=false;
    })
      Swal.fire({
        title: "Completed!",
        text: "You task is completed",
        icon: "success"
      });
    }else{
      e.target.checked=false;
    }
  });
};

// single view
const handleSingleViewShow = (id) => {
  setSingleVew(todayDataGet.find((data) => data.id === id));
  setShowSingleViewSidebar(false)
}


  return (
    <>
      <SectionHeader title="Todays Plans" />
      {/* edit data */}
      {
        showSingleEditSidebar &&
        <TodoSideModal hide={handleSidebarHide} title="Update Task data">
          <div className="form_data">
            <form onSubmit={handleTodayTaskFormSubmitEdit}>
              <div className="my-3">
                <label htmlFor="taskName">Task Name</label>
                <input name="title" value={inputForm.title} onChange={handleInputChange} id="taskName" type="text" />
              </div>
              <div className="my-3 task_start_end">
                <div className="task_time">
                  <label htmlFor="starTime">State Time</label>
                  <input name="startTime" value={inputForm.startTime} onChange={handleInputChange} id="starTime" type="time" />
                </div>
                <div className="task_time">
                  <label htmlFor="starTime">End Time</label>
                  <input  name="endTime" value={inputForm.endTime} onChange={handleInputChange} id="starTime" type="time" />
                </div>
              </div>
              <div className="my-3">
                <label htmlFor="type">Selec Urgency</label>
                <select  name="argency" value={inputForm.argency} onChange={handleInputChange} id="type">
                  <option value="" disabled selected>--Select--</option>
                  <option value="Genaral">Genaral</option>
                  <option value="Important">Important</option>
                </select>
              </div>
              <div className="my-3">
                <label htmlFor="taskDescription">Describe the task</label>
                <textarea  name="description" value={inputForm.description} onChange={handleInputChange} id="taskDescription"></textarea>
              </div>
              <div className="my-3 text-center">
                <button type="submit">Submit</button>

              </div>
            </form>
          </div>
        </TodoSideModal> 
      }

      <section className="todays_task">
        <Row>
          <Col md={showSingleViewSidebar ? 12 : 9}>
            {
              !showTodayForm &&
              <div onClick={() => setShowTodayForm(true)} className="add_new_task">
                <FaPlus />
                <p>Add New Task</p>
              </div>
            }

            {
              showTodayForm &&
              <form onSubmit={handleTodayTaskFormSubmit}>
                <span onClick={() => setShowTodayForm(false)} className="close_icon"><FaTimes /></span>
                <div className="my-3">
                  <label htmlFor="taskName">Task Name</label>
                  <input name="title" value={inputForm.title} onChange={handleInputChange} id="taskName" type="text" />
                </div>
                <div className="my-3 task_start_end">
                  <div className="task_time">
                    <label htmlFor="starTime">State Time</label>
                    <input name="startTime" value={inputForm.startTime} onChange={handleInputChange} id="starTime" type="time" />
                  </div>
                  <div className="task_time">
                    <label htmlFor="starTime">End Time</label>
                    <input  name="endTime" value={inputForm.endTime} onChange={handleInputChange} id="starTime" type="time" />
                  </div>
                </div>
                <div className="my-3">
                  <label htmlFor="type">Selec Urgency</label>
                  <select  name="argency" value={inputForm.argency} onChange={handleInputChange} id="type">
                    <option value="" disabled selected>--Select--</option>
                    <option value="Genaral">Genaral</option>
                    <option value="Important">Important</option>
                  </select>
                </div>
                <div className="my-3">
                  <label htmlFor="taskDescription">Describe the task</label>
                  <textarea  name="description" value={inputForm.description} onChange={handleInputChange} id="taskDescription"></textarea>
                </div>
                <div className="my-3 text-center">
                  <button type="submit">Submit</button>

                </div>
              </form>
            }
            {
              todayDataGet.length > 0 ?
              todayDataGet?.map((item, index) => {
                return (
                  <TodoList key={index}>
                    <li className="todos_list">
                      <div className="todo_list_wraper">
                          <div className="todo_titles">
                              <input onChange={(e) => handleChecItemAndUpdateToComplited(item.id, e)}   id={`todo_checkbox${index}`} type="checkbox" />
                              <label htmlFor={`todo_checkbox${index}`}>{item.title}</label>
                          </div>
                          <div className="other_todos_future">
                              <p><b>Start:</b> {item.startTime}</p>
                              <p><b>End:</b> {item.endTime}</p>
                              <p>{item.argency}</p>
                          </div>                        
                      </div>
                      <div className="todo_list_action">
                          <button title="View More" onClick={() => handleSingleViewShow(item.id)}><FaEye /></button>
                          <button title="View More" onClick={() => handleSingleEdit(item.id)}><FaRegEdit /></button>
                          <button title="Not Complited" onClick={() => handleTodayTypeChange(item.id)}><FaUserTimes /></button>
                          <button title="Trash" onClick={() => handleTodayDataDelete(item.id)}><FaTrashAlt /></button>
                      </div>
                    </li>
                  </TodoList>

                )
              })
              : <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>No Today Data Found</h1>
            }
        </Col>
        {
          !showSingleViewSidebar &&
          <Col md={3}>
            <aside>
              <div className="side_header">
                <button onClick={() => setShowSingleViewSidebar(true)} className="btn-close"></button>
              </div>
              <div className="sidebar_content">
                <h2>Task Name</h2>
                <h3>{singleView.title}</h3>

                <h2 className="pt-4">Task Description</h2>
                <p>{singleView.description}</p>

                <h2  className="pt-4">Date & Time Details</h2>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{singleView.startTime}</td>
                      <td>{singleView.endTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </aside>
          </Col>
        }

      </Row>

        


        
      </section>

    </>
  )
}

export default ToDay