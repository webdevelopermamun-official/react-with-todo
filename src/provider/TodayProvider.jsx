import { useEffect, useState } from "react"
import TodayContext from "../context/TodayContext"
import axios from "axios";


const TodayProvider = ({children}) => {

  // get today task data
  const [todayDataGet, setTodayDataGet] = useState([]);

  // get dashboard task data
  const [todayDashbordData, setTodayDashbordData] = useState([]);

  // get dashboard task data for trash file
  const [todayDashbordDataTrash, setTodayDashbordDataTrash] = useState([]);

  // get complited data
  const [complitedData, setComplitedData] = useState([]);

  // get not complited data
  const [notComplitedData, setNotComplitedData] = useState([]);

  // get trash data
  const [trashData, setTrashData] = useState([]);

  // get data form local api
  const getTodayTaskData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=null&_sort=id&_order=desc");
    setTodayDataGet(response.data)
  };

  // get data form local api ser dashboard
  const getTodayTaskDashbordData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=null&_sort=id&_order=desc&_page=1&_limit=5");
    setTodayDashbordData(response.data)
  };

  // get trash data form local api ser dashboard
  const getTodayTaskDashbordTrashData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=Trash&_sort=id&_order=desc&_page=1&_limit=5");
    setTodayDashbordDataTrash(response.data)
  };


  // get complited data
  const getTodayComplitedData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=completed&_sort=id&_order=desc");
    setComplitedData(response.data)
  };

  // get complited data
  const getTodayNotComplitedData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=not completed&_sort=id&_order=desc");
    setNotComplitedData(response.data)
  };

  // get deleted data
  const getTodayTrashData = async ()=> {
    const response = await axios.get("http://localhost:7500/today?type=Trash&_sort=id&_order=desc");
    setTrashData(response.data)
  };


  useEffect(() => {
    getTodayTaskData();
    getTodayComplitedData();
    getTodayTrashData();
    getTodayNotComplitedData();
    getTodayTaskDashbordData();
    getTodayTaskDashbordTrashData();
  }, []);




  return <TodayContext.Provider value={{todayDataGet, setTodayDataGet, getTodayTaskData, complitedData, setComplitedData, getTodayComplitedData, trashData, setTrashData, getTodayTrashData, notComplitedData, setNotComplitedData, getTodayNotComplitedData, todayDashbordData, setTodayDashbordData, getTodayTaskDashbordData, todayDashbordDataTrash, setTodayDashbordDataTrash, getTodayTaskDashbordTrashData}}>
    {children}
  </TodayContext.Provider>
}

export default TodayProvider