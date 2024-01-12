import { useEffect, useState } from "react"
import axios from "axios";
import WeekContext from "../context/WeekContext";


const WeekProvider = ({children}) => {

  const [weekChildDataGet, setWeeChildkDataGet] = useState([]);

  // get week task data
  const [weekDataGet, setWeekDataGet] = useState([]);

  // get dashboard task data
  const [weekDashbordData, setWeekDashbordData] = useState([]);

  // get complited data
  const [weekComplitedData, setWeekComplitedData] = useState([]);

  // get not complited data
  const [weekNotComplitedData, setWeekNotComplitedData] = useState([]);

  // get trash data
  const [weekTrashData, setWeekTrashData] = useState([]);

  // get data form local api
  const getWeekTaskData = async ()=> {
    const response = await axios.get("http://localhost:7500/week?type=null&_sort=id&_order=desc");
    setWeekDataGet(response.data)
  };



  // get data form local api ser dashboard
  const getWeekTaskDashbordData = async ()=> {
    const response = await axios.get("http://localhost:7500/week?type=null&_sort=id&_order=desc&_page=1&_limit=5");
    setWeekDashbordData(response.data)
  };


  // get complited data
  const getWeekComplitedData = async ()=> {
    const response = await axios.get("http://localhost:7500/week?type=completed&_sort=id&_order=desc");
    setWeekComplitedData(response.data)
  };

  // get complited data
  const getWeekNotComplitedData = async ()=> {
    const response = await axios.get("http://localhost:7500/week?type=not completed&_sort=id&_order=desc");
    setWeekNotComplitedData(response.data)
  };

  // get deleted data
  const getWeekTrashData = async ()=> {
    const response = await axios.get("http://localhost:7500/week?type=Trash&_sort=id&_order=desc");
    setWeekTrashData(response.data)
  };


  useEffect(() => {
    getWeekTaskData();
    getWeekComplitedData();
    getWeekTrashData();
    getWeekNotComplitedData();
    getWeekTaskDashbordData();
  }, []);




  return <WeekContext.Provider value={{weekDataGet, setWeekDataGet, getWeekTaskData, weekComplitedData, setWeekComplitedData, getWeekComplitedData, weekTrashData, setWeekTrashData, getWeekTrashData, weekNotComplitedData, setWeekNotComplitedData, getWeekNotComplitedData, weekDashbordData, setWeekDashbordData, getWeekTaskDashbordData, weekChildDataGet, setWeeChildkDataGet}}>
    {children}
  </WeekContext.Provider>
}

export default WeekProvider