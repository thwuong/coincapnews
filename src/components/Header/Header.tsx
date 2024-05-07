import React from "react";
import Topbar from "../Topbar/Topbar";
import Container from "../Container/Container";

function Header() {
    return (
        <header>
            <Container className="px-12">
                <Topbar />
            </Container>
        </header>
    );
}

export default Header;
