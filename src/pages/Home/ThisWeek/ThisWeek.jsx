import { FaPlus, FaTimes } from "react-icons/fa"
import SectionHeader from "../../../components/SectionHeader/SectionHeader"
import TodoList from "../../../components/TodoList/TodoList"
import {FaTrashAlt, FaUserTimes, FaEye, FaRegEdit } from "react-icons/fa";
import { useContext, useReducer, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { Accordion, Col, Row } from "react-bootstrap";

import "./ThisWeek.scss"
import TodoSideModal from "../../../components/TodoSideModal/TodoSideModal";
import WeekContext from "../../../context/WeekContext";
import ReactDatePicker from "react-datepicker";
import { addDays, format, subDays } from "date-fns";
import { v4 } from "uuid";


const todayFormReducer = (state, {type, payload}) => {
  switch (type) {
    case "NEW_TODAY_LIST_CREATE":
      return  [...state, payload];
    
    case "NEW_WEEK_CHILD_LIST_CREATE":
      return  [...state, payload];
    
    case "GET_TODAY_DATA":
      return payload;
    
    case "TODAY_DATA_TYPE_DATA_UPDATE":
      return [...state, payload];

    default:
      return state;
  }

}


const ThisWeek = () => {

  // form controll using useReducer
  const [todayFormData, dispatch] = useReducer(todayFormReducer, []);

  // get today data form contact
  const {weekDataGet, getWeekTaskData, getWeekComplitedData, getWeekNotComplitedData, getWeekTaskDashbordData, getWeekTrashData, weekChildDataGet, setWeeChildkDataGet} = useContext(WeekContext)

  // show today task form to post data
  const [showTodayForm, setShowTodayForm] = useState(false);


  // show single edit sidebar
  const [showSingleEditSidebar, setShowSingleEditSidebar] = useState(false);


  // single view data
  const [showSingleViewSidebar, setShowSingleViewSidebar] = useState(false)
  const [singleView, setSingleVew] = useState([]);


  // show add new child weekley task form
  const [childFotmShow, setChildFormShow] = useState(false);
  const [startSingleDate, setStartSingleDate] = useState(null);
  const [childInputs, setChildInputs] = useState({
    title: "",
    description: "",
    day: "",
  });

  // onchange child task handler
  const handleChildTaskChange = (e) => {
    const { name, value } = e.target;

    setChildInputs((prevInputForm) => ({
      ...prevInputForm,
      [name]: value,
    }));
  };

  const handleChildDateChange = (date) => {
    setStartSingleDate(date);
    // Format the date as needed, e.g., to 'yyyy-MM-dd'
    const formattedDate = date.toISOString().split('T')[0];

    setChildInputs((prevInputForm) => ({
      ...prevInputForm,
      day: formattedDate,
    }));
  };

  // submit child input form data
  const addChildTaskToDay = async (e) => {
    e.preventDefault();



    try {
      const taskId = v4(); // Generate a unique ID for the new task
    // Make a PATCH request to get the existing data
    const response = await axios.get(`http://localhost:7500/week/${singleView.id}`);

      // Get the existing taskDetails array
      const existingTaskDetails = response.data.taskDetels;
  
      // Create a new task object
      const newTask = {
        ...childInputs,
        id: taskId,
      };
  
      // Add the new task to the existing array
      const updatedTaskDetails = [...existingTaskDetails, newTask];
  
      // Make another PATCH request to update the taskDetails array
      await axios.patch(`http://localhost:7500/week/${singleView.id}`, {
        taskDetels: updatedTaskDetails,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Today List Added",
        showConfirmButton: false,
        timer: 1500
      });
      setChildFormShow(false);
      getWeekTaskDashbordData();
      getWeekTaskData();

      // Reset the form
      setChildInputs({
        title: '',
        description: '',
        day: '',
        
      });

    } catch (error) {
      console.error('Error adding task:', error);
    }
    const response = await axios.get(`http://localhost:7500/week/${singleView.id}`);
    setWeeChildkDataGet(response.data.taskDetels);

  };



 
  // input new list to server

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);


  const [inputForm, setInputForm] = useState({
    title: "",
    startWeek: "",
    endweek: "",
    argency: "",
    type: "null",
    description: "",
    taskDetels: []
  });

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      setStartDate(date);
      setEndDate(date);

      const dateRange = {
        startDate: format(addDays(date, -7), 'yyyy-MM-dd'),
        endDate: format(date, 'yyyy-MM-dd'),
      };

      setInputForm((prevInputForm) => ({
        ...prevInputForm,
        startWeek: dateRange.startDate,
        endweek: dateRange.endDate,
      }));
    }
  };

  const handleInputChange = (e) => {
    setInputForm((prevInputForm) => ({
      ...prevInputForm,
      [e.target.name]: e.target.value,
    }));
  };


  // send today data form json server
  const handleTodayTaskFormSubmit = (e) => {
    e.preventDefault();
    if(!inputForm.title || !inputForm.startWeek || !inputForm.description || !inputForm.argency){
      Swal.fire({
        title: "The Internet?",
        text: "All Fields Are Required",
        icon: "error"
      });
    }else{
      const response = axios.post("http://localhost:7500/week", inputForm).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Today List Added",
          showConfirmButton: false,
          timer: 1500
        });
        setShowTodayForm(false);
        getWeekTaskDashbordData();
        getWeekTaskData();
        setInputForm({ title: "", startWeek: "", argency: "", type: "null", description: "", taskDetels: []})
      })
      dispatch({type: "NEW_TODAY_LIST_CREATE", payload: response.data});
    }
  }

  // sidebar hide data clear 
  const handleSidebarHide = () => {
    setShowSingleEditSidebar(false);
    setInputForm({ title: "", startWeek: "", argency: "", type: "null", description: "", taskDetels: []})
  }
  // edit  task data
  const handleSingleEdit = (id) => {
    setShowSingleEditSidebar(true);
    setInputForm(weekDataGet.find((data) => data.id === id));
  }

  // edit form data update
  const handleTodayTaskFormSubmitEdit = async(e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:7500/week/${inputForm.id}`, inputForm);
    getWeekTaskData();
    getWeekTaskDashbordData()
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
        axios.patch(`http://localhost:7500/week/${id}`, { type: "Trash" }).then(() => {
          getWeekTaskData();
          getWeekTrashData();
          getWeekTaskDashbordData()
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
      axios.patch(`http://localhost:7500/week/${id}`, { type: "not completed" }).then(() => {
      getWeekTaskData();
      getWeekNotComplitedData()
      getWeekTaskDashbordData()
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
      axios.patch(`http://localhost:7500/week/${id}`, { type: "completed" }).then(() => {
      getWeekTaskData();
      getWeekComplitedData();
      getWeekTaskDashbordData();
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
  setShowSingleViewSidebar(true)
  setSingleVew(weekDataGet.find((data) => data.id === id));
  const data = (weekDataGet.find((data) => data.id === id))
  setWeeChildkDataGet(data.taskDetels)


}


  return (
    <>
      <SectionHeader title="Weekly Plans" />
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
                <div className="task_time w-100">
                  <label htmlFor="startWeek">State Week</label>
                  <input name="startWeek" value={inputForm.startWeek} onChange={handleInputChange} id="startWeek" type="week" />
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
      {
        showSingleViewSidebar &&
        <TodoSideModal hide={setShowSingleViewSidebar} title="Your weekly plan">
          <div className="sidebar_wraper">
            <div className="main_content">
              <h4>{singleView?.title}</h4>
              <p>{singleView?.description}</p>
              <span><b>Working Week : </b> {singleView?.startWeek}</span> <span>- {singleView?.endweek}</span>
            </div>
            {
              !childFotmShow &&
              <div className="add_new_task" onClick={() => setChildFormShow(true)}>
                <FaPlus />
                <p>Add New This Week Task</p>
            </div>
            }
            {
              childFotmShow &&
              <div className="upload_new_task">
                <form onSubmit={addChildTaskToDay}>
                  <div className="my-3">
                    <input name="title" onChange={handleChildTaskChange} value={childInputs.title} type="text" placeholder="Title" />
                  </div>
                  <div className="my-3">
                    <ReactDatePicker
                      selected={startSingleDate}
                      onChange={handleChildDateChange}
                      includeDateIntervals={[
                        { start: subDays(new Date(), 1), end: addDays(new Date(), 7) },
                      ]}
                      placeholderText="Select your preferred day"
                    />
                  </div>
                  <div className="my-3">
                    <textarea name="description" onChange={handleChildTaskChange} value={childInputs.description} placeholder="Task Description"></textarea>
                  </div>
                  <div className="my-3 text-center">
                    <button onClick={() => setChildFormShow(false)} className="me-3 cancel_button">Cancel</button>
                    <button className="form_submited" type="submit">Add new Task</button>
                  </div>
                </form>
              </div>
            }
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



      <section className="todays_task">
              {/* Show sidebar for view data */}
        <Row>
          <Col>
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
                  <div className="task_time w-100">
                    <label htmlFor="startWeek">State Week</label>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 7)}
                    />
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
              weekDataGet.length > 0 ?
              weekDataGet?.map((item, index) => {
                return (
                  <TodoList key={index}>
                    <li className="todos_list">
                      <div className="todo_list_wraper">
                          <div className="todo_titles">
                              <input onChange={(e) => handleChecItemAndUpdateToComplited(item.id, e)}   id={`todo_checkbox${index}`} type="checkbox" />
                              <label htmlFor={`todo_checkbox${index}`}>{item.title}</label>
                          </div>
                          <div className="other_todos_future">
                              <p><b>Start Week:</b> {item.startWeek}</p> - 
                              <p><b>End Week:</b> {item.endweek}</p>
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
              : <h1 style={{color: "red", textAlign: "center", padding: "30px 0"}}>No Weeklay Data Found</h1>
            }
        </Col>
      </Row>
      </section>

    </>
  )
}

export default ThisWeek