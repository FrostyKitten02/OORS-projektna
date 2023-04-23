import {Child, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {useContext, useState} from "react";
import { Box } from "@mui/material";
import ChildCard from "../Components/ChildCard";
import {v4 as uuid} from 'uuid';
import SearchBar from "../Components/SearchBar";

export default function ChildrenPage() {
    const context = useContext<SantaBaseContext>(santaContext);
    const [children, setChildren] = useState<Child[] | undefined>(undefined);

    if (!children) {
        setChildren(context.searchChildren());
    }

    const handleSearch = (searchBy: string) => {
        setChildren(context.searchChildren(searchBy));
    }

    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Box sx={{width: "600px", paddingBottom: "30px"}}>
                    <SearchBar onSearch={handleSearch}/>
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