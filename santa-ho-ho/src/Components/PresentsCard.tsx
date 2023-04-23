import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {Present} from "./SantaContext";
import {useNavigate} from "react-router";


export default function PresentsCard({present}:{present: Present}) {
    const navigate = useNavigate();


    const handleDetailsClick = () => {
        navigate("/presents/" + present.id);
    }

    const handelEditClick = () => {
        navigate("/presents/edit/" + present.id);
    }

    return (
        <Card sx={{width: "320px", height: "400px"}}>
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
                </Box>
            </CardActions>
        </Card>
    )
}