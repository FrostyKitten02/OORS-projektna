import { Outlet } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import {Box} from "@mui/material";






export default function TemplatedPage() {


    return(
        <>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <MenuBar />
            </Box>
            <Box sx={{paddingTop: "30px"}}>
                <Outlet />
            </Box>
        </>
    )
}