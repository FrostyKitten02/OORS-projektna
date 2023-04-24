import {Box, Button, FormControlLabel, Switch} from "@mui/material";
import SearchBar from "../Components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import {v4 as uuid} from "uuid";
import {Present, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {useContext, useEffect, useState} from "react";
import PresentsCard from "../Components/PresentsCard";
import {useNavigate} from "react-router";
import PresentsUtil from "../Utils/PresentsUtil";




export default function PresentsPage() {
    const navigate = useNavigate();
    const context = useContext<SantaBaseContext>(santaContext);

    const [storage, setStrage] = useState<boolean>(true);
    const [delivery, setDelivery] = useState<boolean>(true);
    const [searchBy, setSerchBy] = useState<string  | undefined>(undefined);
    const [presents, setPresents] = useState<Present[] | undefined>(undefined);

    useEffect(()=>{
        if (!storage && !delivery) {
            setPresents([]);
            return;
        }
        setPresents(context.searchPresents(searchBy, PresentsUtil.getShowOnlyAvaliable(storage, delivery)))
    },[context, storage, delivery, searchBy])

    const handleSearch = (searchBy: string) => {
        setSerchBy(searchBy)
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
                    <Box>
                        <FormControlLabel control={<Switch value={delivery} defaultChecked onChange={(event, checked)=>setDelivery(checked)} />} label="Delivery" />
                        <FormControlLabel control={<Switch value={storage} defaultChecked onChange={(event, checked)=>setStrage(checked)} />} label="Storage" />
                    </Box>
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