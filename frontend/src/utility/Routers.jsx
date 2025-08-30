import { Route,Routes } from "react-router";
// import { Routes } from 
import UploadCSV from "../components/UploadCSV";
import ShowAllRecords from "../components/ShowAllRecords";

export default function Routers(){
    return(<>
    {/* <Routes>
      <Route path='*' element={<Home/>} /> */}
    <Routes>
        <Route path="/uploadCSV" element={<UploadCSV/>}/>
        <Route path="/showAllRecorda" element={<ShowAllRecords/>} />
    </Routes>
    </>)
}