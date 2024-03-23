import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({allowedRoles}) {

const {isLoggedIn,role}=useSelector((state)=>state.auth); // useSelecotr select from redux we habe name==auth and have some state 
console.log(isLoggedIn);
console.log(role);
return isLoggedIn && allowedRoles.find((myrole)=>myrole===role)?(
    <Outlet/>
): isLoggedIn ?(<Navigate to='denied'/>):(<Navigate to='login'/>)
}

export default RequireAuth