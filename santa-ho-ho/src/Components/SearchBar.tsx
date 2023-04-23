import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, useEffect, useState} from "react";

export default function SearchBar({onSearch}:{onSearch?: (search:string) => void}) {
    const [search, setSearch] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setSearch(event.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout((searchString) => {
            onSearch?.(searchString);
        }, 500, search);

        return () => {
            clearTimeout(timeout);
        }
    }, [search]);

    return (
        <TextField
            fullWidth
            onChange={handleChange}
            value={search}
            InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                sx: {borderRadius: "25px"}
            }}
        />
    )
}