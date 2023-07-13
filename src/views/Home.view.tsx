import React from "react";
import './Home.view.css';
import '../components/Tabela.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabela from "../components/Tabela";

function HomeView(){
    return <div>
        <Header />
        <div>
            <Tabela />
        </div>
        <Footer />
    </div>
}

export default HomeView;