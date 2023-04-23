import {Box, Button} from "@mui/material";
import SearchBar from "../Components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import {v4 as uuid} from "uuid";
import {Present, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {useContext, useState} from "react";
import PresentsCard from "../Components/PresentsCard";
import {useNavigate} from "react-router";





export default function PresentsPage() {
    const navigate = useNavigate();
    const context = useContext<SantaBaseContext>(santaContext);
    const [presents, setPresents] = useState<Present[] | undefined>(undefined);


    if (presents === undefined) {
        setPresents(context.searchPresents());
    }
    const handleSearch = (searchBy: string) => {
        setPresents(context.searchPresents(searchBy));
    }

    const handleAddClicked = () => {
        navigate("/presents/add");
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
                    {presents?.map((present) => {return <PresentsCard key={uuid()} present={present} />})}
                </Box>
            </Box>
        </Box>
    )
}