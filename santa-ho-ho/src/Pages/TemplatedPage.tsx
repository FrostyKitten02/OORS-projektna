import { Outlet } from "react-router-dom";
import MenuBar from "../Components/MenuBar";






export default function TemplatedPage() {


    return(
        <>
            <MenuBar />
            <Outlet />
        </>
    )
}