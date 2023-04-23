import {useNavigate, useParams} from "react-router";
import {Box, Button, TextField} from "@mui/material";
import {Child, SantaBaseContext, santaContext} from "../Components/SantaContext";
import {ChangeEvent, useContext, useState} from "react";

export default function ChildPage({overview}:{overview?: boolean}) {
    const {id} = useParams<"id">();
    const context = useContext<SantaBaseContext>(santaContext);
    const navigate = useNavigate();
    const [child, setChild] = useState<Child>({});

    if (id != undefined && child.id == undefined) {
        const childFromId: Child | undefined = context.getChildById(id);
        if (childFromId !== undefined) {
            setChild(childFromId);
        } else {
            context.clearAlerts();
            navigate("/");
            context.showErrorMessage("Otrok z id-jem ni najden!");
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (overview) {
            return;
        }
        setChild(prevState => ({...prevState, [event.target.name]: event.target.value}));
    };

    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        if (!overview) {
            return;
        }
        setChild(prevState => {
            if (prevState.address === undefined) {
                prevState.address = {};
            }
            return {...prevState, address: {...prevState.address, [event.target.name]: event.target.value}};
        });
    };

    const handleSubmit = () => {
        if (overview) {
            return;
        }
        context.saveChild(child);
        navigate("/children/" + child.id);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px", maxWidth: 600}}>
            {/*Basic info*/}
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="firstname" label="Ime" variant="filled" onChange={handleChange} value={child.firstname??""} disabled={overview} />
                    <TextField fullWidth name="lastname" label="Priimek" variant="filled" onChange={handleChange} value={child.lastname??""} disabled={overview} />
                </Box>
                <TextField name="age" label="Starost" variant="filled" type="number" onChange={handleChange} value={child.age??0} disabled={overview} />
            </Box>
            {/*Address*/}
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="city" label="Mesto" variant="filled" onChange={handleChangeAddress} value={child.address?.city??""} disabled={overview} />
                    <TextField fullWidth name="zip" label="Poštna številka" variant="filled" type="number" onChange={handleChangeAddress} value={child.address?.zip??0} disabled={overview} />
                </Box>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                    <TextField fullWidth name="street" label="Ulica" variant="filled" onChange={handleChangeAddress} value={child.address?.street??""} disabled={overview} />
                    <TextField fullWidth name="number" label="Številka ulice" variant="filled" type="number" onChange={handleChangeAddress} value={child.address?.number??0} disabled={overview} />
                </Box>
            </Box>
            {/*Stars*/}
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>
                <TextField fullWidth name="stars" label="Zvezdice" variant="filled" type="number" onChange={handleChange} value={child.stars??0} disabled={overview} />
                <TextField fullWidth name="blackStars" label="Črne pike" variant="filled" type="number" onChange={handleChange} value={child.blackStars??0} disabled={overview} />
            </Box>

            <Box>
                {!overview?<Button variant="contained" onClick={handleSubmit}>Shrani</Button>:null}
            </Box>
        </Box>
    )
}