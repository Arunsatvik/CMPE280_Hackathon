import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'fontsource-roboto'
import './Main.css'
import Header from './Header'
import Content from './Content'
import Sidebar from './Sidebar'

const Main = () => {
    const [selectedCountry, setSelectedCountry] = useState('USA')

    const handleCountryChange = (newCountry) => {
        setSelectedCountry(newCountry)
    }

    const [selectedGraphs, setSelectedGraphs] = useState([])
    const handleGraphSelectionChange = (graphs) => {
        setSelectedGraphs(graphs)
    }

    return (
        <Router>
            <div className="main-grid">
                <input type="checkbox" id="check" />
                <Header onCountryChange={handleCountryChange} />
                <Sidebar onGraphSelectionChange={handleGraphSelectionChange} />
                <Content
                    selectedCountry={selectedCountry}
                    selectedGraphs={selectedGraphs}
                />
            </div>
        </Router>
    )
}

export default Main
