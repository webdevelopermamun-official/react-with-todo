import AnyQuery from "../pages/Home/AnyQuery/AnyQuery";
import Completed from "../pages/Home/Completed/Completed";
import DashBoard from "../pages/Home/DashBoard/DashBoard";
import Home from "../pages/Home/Home";
import NotCompleted from "../pages/Home/NotCompleted/NotCompleted";
import NotFound from "../pages/Home/NotFound/NotFound";
import Notes from "../pages/Home/Notes/Notes";
import ThisMonth from "../pages/Home/ThisMonth/ThisMonth";
import ThisWeek from "../pages/Home/ThisWeek/ThisWeek";
import ThisYear from "../pages/Home/ThisYear/ThisYear";
import ToDay from "../pages/Home/ToDay/ToDay";
import Trash from "../pages/Home/Trash/Trash";


const PublicRout = ([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <DashBoard />
            },
            {
                path: "dashboard",
                element: <DashBoard />
            },
            {
                path: "today",
                element: <ToDay />
            },
            {
                path: "this-weeek",
                element: <ThisWeek />
            },
            {
                path: "this-month",
                element: <ThisMonth />
            },
            {
                path: "this-year",
                element: <ThisYear />
            },
            {
                path: "completed",
                element: <Completed />
            },
            {
                path: "not-completed",
                element: <NotCompleted />
            },
            {
                path: "trash",
                element: <Trash />
            },
            {
                path: "notes",
                element: <Notes />
            },
            {
                path: "any-query",
                element: <AnyQuery />
            },
            {
                path: "*",
                element: <NotFound />
            }

        ]
    }
]);

//export pages router
export default PublicRout;