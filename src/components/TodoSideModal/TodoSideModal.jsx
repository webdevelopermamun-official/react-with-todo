import "./TodoSideModal.scss"
import { MdEditCalendar } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import TodayContext from "../../context/TodayContext";
import WeekContext from "../../context/WeekContext";



const TodoSideModal = ({title, hide, taskName, taskDesc, starTime, endTime, argency, id, deleted, children, week, today, typeChange, childrenWeek}) => {
    // get today data form contact
    const  {getTodayComplitedData, getTodayTrashData, getTodayNotComplitedData, getTodayTaskDashbordTrashData} = useContext(TodayContext)
    const  {getWeekComplitedData, getWeekTrashData, getWeekNotComplitedData} = useContext(WeekContext)


    // week data deleted
    const handleWeekDataDeleteOrTrash = async (id) => {
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
                if(deleted){
                    axios.delete(`http://localhost:7500/week/${id}`).then(() => {
                        getWeekComplitedData();
                        getWeekTrashData();
                        getWeekNotComplitedData();
                        hide(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

                    console.log(id);
                }else{
                    axios.patch(`http://localhost:7500/week/${id}`, { type: "Trash" }).then(() => {
                        getWeekComplitedData();
                        getWeekTrashData();
                        getWeekNotComplitedData();

                        hide(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                }
            }
        });
    };

    const handleWeekDataChangeComplited  = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Have you completed this task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
            }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:7500/week/${id}`, { type: "completed" }).then(() => {
                    getWeekComplitedData();
                    getWeekTrashData();
                    getWeekNotComplitedData();

                    hide(false)
                    Swal.fire({
                        title: "Completed!",
                        text: "Your file has been Completed Task.",
                        icon: "success"
                    });
                })
            }
        });
    }




    // today data deleted
    const handleTodayDataDeleteOrTrush = async (id) => {
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
                if(deleted){
                    axios.delete(`http://localhost:7500/today/${id}`).then(() => {
                        getTodayComplitedData();
                        getTodayTrashData();
                        getTodayNotComplitedData();
                        getTodayTaskDashbordTrashData()
                        hide(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

                    console.log(id);
                }else{
                    axios.patch(`http://localhost:7500/today/${id}`, { type: "Trash" }).then(() => {
                        getTodayComplitedData();
                        getTodayTrashData();
                        getTodayNotComplitedData();
                        getTodayTaskDashbordTrashData()
                        hide(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                }
            }
        });
    };

    const handleTodayDataChangeComplited  = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Have you completed this task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
            }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:7500/today/${id}`, { type: "completed" }).then(() => {
                    getTodayComplitedData();
                    getTodayTrashData();
                    getTodayNotComplitedData();

                    hide(false)
                    Swal.fire({
                        title: "Completed!",
                        text: "Your file has been Completed Task.",
                        icon: "success"
                    });
                })
            }
        });
    }




  return (
    <>
        <div className="todo_side_modal">
            <div className="todo_side_modal_container">
                <div className="custom_border">
                    <div className="todo_side_modal_header">
                        <button onClick={() => hide(false)} className="btn-close"></button>
                        <h2>{title}</h2>
                    </div>
                    <div className="todo_side_modal_body">
                        {
                            taskName && 
                            <>
                                {
                                    taskName &&
                                    <div className="todo_title">
                                        <h2>Task name</h2>
                                        <h4>{taskName}</h4>
                                    </div>
                                }
                                {
                                    taskDesc && 
                                    <div className="task_content">
                                        <h2>Task Description</h2>
                                        <p>{taskDesc}</p>
                                    </div>
                                }

                                <div className="task_time">
                                    <div className="time">
                                        {
                                            starTime &&
                                            <>
                                                <b>Stated time</b>
                                                <p><span> <MdEditCalendar /> </span>{starTime}</p>
                                            </>
                                        }
                                    </div>
                                    <div className="time">
                                        {
                                            endTime &&
                                            <>
                                                <b>End time</b>
                                                <p><span><FaClockRotateLeft /></span> {endTime}</p>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="task_status">
                                    { argency && <p style={{color: "red"}}>{argency}</p>}

                                    <div className="get_all_deleted_button text-end">
                                        {
                                            week &&
                                            <>
                                                {
                                                    typeChange &&
                                                    <button onClick={() => handleWeekDataChangeComplited(typeChange)} className="btn btn-success me-2">Move to Completed</button>
                                                }
                                                {
                                                    deleted &&
                                                    <button onClick={() => handleWeekDataDeleteOrTrash(deleted)} className="btn btn-danger">Permanent Deleted</button>
                                                }
                                                {
                                                    id &&
                                                    <button onClick={() => handleWeekDataDeleteOrTrash(id)} className="btn btn-danger">Trash</button>
                                                }
                                            </>
                                        }
                                        {
                                            today &&
                                            <>
                                                {
                                                    typeChange &&
                                                    <button onClick={() => handleTodayDataChangeComplited(typeChange)} className="btn btn-success me-2">Move to Completed</button>
                                                }
                                                {
                                                    deleted &&
                                                    <button onClick={() => handleTodayDataDeleteOrTrush(deleted)} className="btn btn-danger">Permanent Deleted</button>
                                                }
                                                {
                                                    id &&
                                                    <button onClick={() => handleTodayDataDeleteOrTrush(id)} className="btn btn-danger">Trash</button>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                        }
                        {children}
                        <div className="task_status">
                            <div className="get_all_deleted_button text-end">
                                {
                                    childrenWeek &&
                                    <>
                                        {
                                            typeChange &&
                                            <button onClick={() => handleWeekDataChangeComplited(typeChange)} className="btn btn-success me-2">Move to Completed</button>
                                        }
                                        {
                                            deleted &&
                                            <button onClick={() => handleWeekDataDeleteOrTrash(deleted)} className="btn btn-danger">Permanent Deleted</button>
                                        }
                                        {
                                            id &&
                                            <button onClick={() => handleWeekDataDeleteOrTrash(id)} className="btn btn-danger">Trash</button>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TodoSideModal