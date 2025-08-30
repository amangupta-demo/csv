import { Link } from "react-router-dom"
export default function NavBar (){
return (<>
<div className="w-full py-2 px-5 bg-blue-100 ">
<Link to='/uploadCSV'  className="bg-purple-500 text-white  rounded p-1 mx-5">Upload CSV </Link>
<Link to='/showAllRecorda' className="bg-yellow-600 text-white rounded p-1 mx-5 " >Show Record </Link>

</div>
</>)
}

