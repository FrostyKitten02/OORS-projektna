import {Child, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {useContext, useState} from "react";
import { Box, Button } from "@mui/material";
import ChildCard from "../Components/ChildCard";
import {v4 as uuid} from 'uuid';
import SearchBar from "../Components/SearchBar";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router";

export default function ChildrenPage() {
    const context = useContext<SantaBaseContext>(santaContext);
    const navigate = useNavigate();
    const [children, setChildren] = useState<Child[] | undefined>(undefined);

    if (!children) {
        setChildren(context.searchChildren());
    }

    const handleSearch = (searchBy: string) => {
        setChildren(context.searchChildren(searchBy));
    }

    const handleAddClicked = () =>{
        navigate("/children/add");
    }

    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "600px", paddingBottom: "30px"}}>
                    <SearchBar onSearch={handleSearch}/>
                    <Button variant="contained" sx={{maxHeight: "30px", maxWidth: "30px"}} onClick={handleAddClicked}>
                        <AddIcon />
                    </Button>
                </Box>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "20px", width: "1600px"}}>
                    {children?.map((child) => {return <ChildCard key={uuid()} child={child} />})}
                </Box>
            </Box>
        </Box>
    )
}