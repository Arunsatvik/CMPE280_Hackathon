// Header.jsx
import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({ onCountryChange }) => {
    const [selectedCountry, setSelectedCountry] = useState('USA')

    const handleCountryChange = (e) => {
        const newCountry = e.target.value
        setSelectedCountry(newCountry)
        onCountryChange(newCountry)
    }

    return (
        <header>
            <div className="left_area">
                <Link to="/graph" className="logo_home">
                    <h3>Hackathon</h3>
                </Link>
                <label htmlFor="check">
                    <i className="fas fa-bars" id="checked_sidebar"></i>
                </label>
            </div>
            <div className="heading">
                <h3>
                    Macroeconomic Researcher Food Security Time Series and Large
                    Language Chat GPT Dashboard
                </h3>
            </div>
            <div className="right_area">
                <div className="country-dropdown">
                    <label htmlFor="country">Country:</label>
                    <select
                        id="country"
                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="USA">USA</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                    </select>
                </div>
            </div>
        </header>
    )
}

export default Header
