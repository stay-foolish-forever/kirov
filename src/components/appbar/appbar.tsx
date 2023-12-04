"use client";
import AppBar from "@mui/material/AppBar" ;
import Box from "@mui/material/Box" ;
import IconButton from "@mui/material/IconButton" ;
import Typography from "@mui/material/Typography" ;
import Toolbar from "@mui/material/Toolbar" ;
import InputBase from "@mui/material/InputBase" ;
import {styled} from "@mui/material/styles" ;

import MenuIcon from "@mui/icons-material/Menu" ;
import SearchIcon from "@mui/icons-material/Search" ;

import {JSX} from "react" ;
import {Search, SearchIconWrapper} from "@/components/search/search" ;
import {useRouter} from "next/navigation";

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function Appbar(): JSX.Element {
    const router = useRouter()
    const handleClick = () => {
        router.push('/dashboard')
    }
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            // console.log(event.target.value)
            const url = '/package/' + event.target.value
            router.push(url)
        }
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={handleClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
                    >
                        KIROV
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{"aria-label": "search"}}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
