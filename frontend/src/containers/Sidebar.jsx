import React, { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ onGraphSelectionChange }) => {
    const [macroDropdownOpen, setMacroDropdownOpen] = useState(false)
    const [selectedGraphs, setSelectedGraphs] = useState([])

    const toggleMacroDropdown = () => {
        setMacroDropdownOpen(!macroDropdownOpen)
    }

    const handleGraphSelectionChange = (graph) => {
        const updatedGraphs = selectedGraphs.includes(graph)
            ? selectedGraphs.filter((selected) => selected !== graph)
            : [...selectedGraphs, graph]

        setSelectedGraphs(updatedGraphs)
        onGraphSelectionChange(updatedGraphs)
    }

    return (
        <div className="sidebar">
            <div className="macro-dropdown">
                <div
                    className={`macro-header ${
                        macroDropdownOpen ? 'open' : ''
                    }`}
                    onClick={toggleMacroDropdown}
                >
                    <i className="fas fa-arrow-down"></i>
                    <span>Macroeconomic (USD)</span>
                </div>
                {macroDropdownOpen && (
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('GDP')}
                                onChange={() =>
                                    handleGraphSelectionChange('GDP')
                                }
                            />
                            GDP (USD)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('FDI-Inflows')}
                                onChange={() =>
                                    handleGraphSelectionChange('FDI-Inflows')
                                }
                            />
                            FDI Inflows (USD)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes(
                                    'FDI-Outflows'
                                )}
                                onChange={() =>
                                    handleGraphSelectionChange('FDI-Outflows')
                                }
                            />
                            FDI Outflows (USD)
                        </label>
                    </div>
                )}
            </div>
            <div className="macro-dropdown">
                <div
                    className={`macro-header ${
                        macroDropdownOpen ? 'open' : ''
                    }`}
                    onClick={toggleMacroDropdown}
                >
                    <i className="fas fa-arrow-down"></i>
                    <span>Agricultural</span>
                </div>
                {macroDropdownOpen && (
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('Agri-GDP')}
                                onChange={() =>
                                    handleGraphSelectionChange('Agri-GDP')
                                }
                            />
                            Agricultural-GDP
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('Agri-Manu')}
                                onChange={() =>
                                    handleGraphSelectionChange('Agri-Manu')
                                }
                            />
                            Agricultural-Manufacturing
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('Ferti-con')}
                                onChange={() =>
                                    handleGraphSelectionChange('Ferti-con')
                                }
                            />
                            Fertilizer-Consumption
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedGraphs.includes('Ferti-prod')}
                                onChange={() =>
                                    handleGraphSelectionChange('Ferti-prod')
                                }
                            />
                            Fertilizer-Production
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
