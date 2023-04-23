import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {v4 as uuid} from 'uuid';
import {useNavigate} from "react-router";

function NavButton({navigateTo, icon}:{navigateTo:string, icon:JSX.Element}) {
    const navigate = useNavigate();

    return (
        <ListItem sx={{width: 80}} key={uuid()}>
            <ListItemButton onClick={()=>{navigate(navigateTo)}}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}


export default function MenuBar() {
    return (
        <List sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
            <NavButton navigateTo={"/"} icon={<HomeIcon />} />
            <NavButton navigateTo={"/children"} icon={<PersonIcon />} />
        </List>
    )
}