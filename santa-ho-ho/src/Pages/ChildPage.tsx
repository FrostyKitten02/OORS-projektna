import {useParams} from "react-router";
import {Box, Button, TextField} from "@mui/material";
import {Child} from "../Components/SantaContext";
import {ChangeEvent, useState} from "react";

export default function ChildPage({addNew}:{addNew?: boolean}) {
    const id = useParams<"id">();
    const [child, setChild] = useState<Child>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChild(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setChild(prevState => {
            if (prevState.address === undefined) {
                prevState.address = {};
            }
            return {...prevState, address: {...prevState.address, [event.target.name]: event.target.value}};
        });
    };

    const handleSubmit = () => {
        console.log(child);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px", maxWidth: 600}}>
            {/*Basic info*/}
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="firstname" label="Ime" variant="filled" onChange={handleChange} />
                    <TextField fullWidth name="lastname" label="Priimek" variant="filled" onChange={handleChange} />
                </Box>
                <TextField name="age" label="Starost" variant="filled" type="number" onChange={handleChange} />
            </Box>
            {/*Address*/}
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="city" label="Mesto" variant="filled" onChange={handleChangeAddress} />
                    <TextField fullWidth name="zip" label="Poštna številka" variant="filled" type="number" onChange={handleChangeAddress} />
                </Box>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="street" label="Ulica" variant="filled" onChange={handleChangeAddress} />
                    <TextField fullWidth name="number" label="Številka ulice" variant="filled" type="number" onChange={handleChangeAddress} />
                </Box>
            </Box>
            {/*Stars*/}
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                <TextField fullWidth name="stars" label="Zvezdice" variant="filled" type="number" onChange={handleChange} />
                <TextField fullWidth name="blackStars" label="Črne pike" variant="filled" type="number" onChange={handleChange} />
            </Box>

            <Box>
                <Button variant="contained" onClick={handleSubmit}>Shrani</Button>
            </Box>
        </Box>
    )
}