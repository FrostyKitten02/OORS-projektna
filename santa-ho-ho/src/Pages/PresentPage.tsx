import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useContext, useState} from "react";
import {Present, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {useNavigate, useParams} from "react-router";


export default function PresentPage({overview}:{overview?: boolean}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const context = useContext<SantaBaseContext>(santaContext);
    const [present, setPresent] = useState<Present>({});


    if (id != undefined && present.id == undefined) {
        const presentById: Present | undefined = context.getPresentById(id);
        if (presentById !== undefined) {
            setPresent(presentById);
        } else {
            context.clearAlerts();
            navigate("/");
            context.showErrorMessage("Darilo z id-jem ni najdeno!");
        }
    }


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (overview) {
            return;
        }

        setPresent(prevState => {
            if (event.target.type === "number") {
                return {...prevState, [event.target.name]: parseInt(event.target.value)};
            }
            return {...prevState, [event.target.name]: event.target.value}});
    };

    const handleSubmit = () => {
        if (overview) {
            return;
        }
        console.log(present);
        context.savePresent(present);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px", maxWidth: 600}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="minAge" label="Minimalna starost" variant="filled" type="number" onChange={handleChange} value={present?.minAge??0} disabled={overview}/>
                    <TextField fullWidth name="maxAge" label="Maksimalna starost" variant="filled" type="number" onChange={handleChange} value={present?.maxAge??0} disabled={overview} />
                </Box>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="name" label="Naziv" variant="filled" onChange={handleChange} value={present?.name??""} disabled={overview} />
                    <TextField fullWidth name="maxStarsDiff" label="Maksimalna razlika zvezdic" variant="filled" type="number" onChange={handleChange} value={present?.maxStarsDiff??0} disabled={overview} />
                </Box>

                <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}} >
                    <TextField fullWidth name="imageLink" label="Link do slike" variant="filled" onChange={handleChange} value={present?.imageLink??""} disabled={overview} />
                    <TextField fullWidth name="description" label="Opis" variant="filled" onChange={handleChange} value={present?.description??""} disabled={overview} multiline minRows={3} />
                </Box>

                <Box>
                    {!overview?<Button variant="contained" onClick={handleSubmit}>Shrani</Button>:null}
                </Box>
            </Box>
        </Box>
    )
}