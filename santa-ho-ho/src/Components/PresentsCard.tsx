import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {Present, SantaBaseContext, santaContext} from "./SantaContext";
import {useNavigate} from "react-router";
import {useContext} from "react";


export default function PresentsCard({present, childId}:{present: Present, childId?: string}) {
    const navigate = useNavigate();
    const context = useContext<SantaBaseContext>(santaContext);

    const handleDetailsClick = () => {
        navigate("/presents/" + present.id);
    }

    const handelEditClick = () => {
        navigate("/presents/edit/" + present.id);
    }

    const handleAssignClick = () => {
        if (!childId) {
            return;
        }

        present.forChildId = childId;
        context.savePresent(present);
    }

    const handelUnassignClick = () => {
        if (!childId) {
            return;
        }

        present.forChildId = undefined;
        context.savePresent(present);
    }

    return (
        <Card sx={{width: "320px", height: "400px", background: present.forChildId?"#a8a8a8":""}}>
            <CardContent>
                <CardMedia
                    component="img"
                    height={200}
                    image={present.imageLink}
                    alt={present.name}
                />
                <Typography variant="h5">{present.name}</Typography>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Typography variant="body1" >{present.maxStarsDiff??0}x</Typography>
                    <StarBorderIcon />
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Typography variant="body1" >{present.minAge??0}-{present.maxAge??0}</Typography>
                    <PersonIcon />
                </Box>
            </CardContent>
            <CardActions sx={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start", rowGap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <Button size="small" variant="contained" onClick={handleDetailsClick}>Podrobnosti</Button>
                    <Button size="small" variant="contained" onClick={handelEditClick}>Uredi</Button>
                    {childId&&present.forChildId===undefined?<Button size="small" variant="contained" onClick={handleAssignClick}>Dodeli</Button>:null}
                    {present.forChildId&&childId?<Button size="small" variant="contained" sx={{background: "red", '&:hover': {backgroundColor: "red"}}} onClick={handelUnassignClick}>Odstrani</Button>:null}
                </Box>
            </CardActions>
        </Card>
    )
}