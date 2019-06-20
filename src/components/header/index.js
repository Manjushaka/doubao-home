import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const router = [
    {
        url: "/",
        name: "首页",
    },
    {
        url: "/puppy",
        name: "豆包",
    },
    {
        url: "/dad",
        name: "包子爸",
    },
    {
        url: "/mum",
        name: "包子妈",
    }
];

function Header() {
    console.log("header");
    return (
        <header className="header">
          <div className="header-container">
          <nav className="header-nav">
                <ul>
                    {router.map(r => (
                        <li key={r.name}>
                            <Link to={r.url}>{r.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
          </div>
        </header>
    );
}

export default Header;
