import {Child, SantaBaseContext, santaContext} from "./SantaContext";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircleIcon from '@mui/icons-material/Circle';
import ChildUtil from "../Utils/ChildUtil";
import {useNavigate} from "react-router";
import {useContext} from "react";


export default function ChildCard({child}:{child: Child}) {
    const navigate = useNavigate();
    const context = useContext<SantaBaseContext>(santaContext);


    const childYrs = ChildUtil.getChildYearsWord(child);

    const handelEditClick = () => {
        navigate("/children/edit/"+child.id);
    }

    const handleDetailsClick = () => {
        navigate("/children/"+child.id);
    }

    const addStarsClicked = () => {
        context.saveChild(ChildUtil.addStars(child, 1));
    }

    const addBlackStarsClicked = () => {
        context.saveChild(ChildUtil.addBlackStars(child, 1));
    }

    return (
        <Card sx={{width: "320px", height: "300px"}}>
            <CardContent>
                <Typography variant="h5">{ChildUtil.getChildFullName(child)}</Typography>
                {childYrs? <Typography variant="body1">{childYrs}</Typography> : null}
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Typography variant="body1" >{child.stars??0}x</Typography>
                    <StarBorderIcon />
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Typography variant="body1" >{child.blackStars??0}x</Typography>
                    <CircleIcon />
                </Box>
            </CardContent>
            <CardActions sx={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start", rowGap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <Button size="small" variant="contained" onClick={handleDetailsClick}>Podrobnosti</Button>
                    <Button size="small" variant="contained" onClick={handelEditClick}>Uredi</Button>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <Button size="small" fullWidth variant="contained" onClick={addBlackStarsClicked}>Dodaj črno piko</Button>
                    <Button size="small" fullWidth variant="contained" onClick={addStarsClicked}>Dodaj zvezdico</Button>
                </Box>

            </CardActions>
        </Card>
    )
}