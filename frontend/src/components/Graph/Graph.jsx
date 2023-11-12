import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutline'

const Graph = ({ selectedCountry, selectedGraphs }) => {
    const [data, setData] = useState([])
    const filepaths = {
        GDP: '/csv/GDP-USD.csv',
        'FDI-Inflows': '/csv/FDI-Inflow.csv',
        'FDI-Outflows': '/csv/FDI-Outflow.csv',
        'Agri-GDP': '/csv/Agri-gdp.csv',
        'Agri-Manu': '/csv/Agri-manu.csv',
        'Ferti-con': '/csv/Ferti-kg.csv',
        'Ferti-prod': '/csv/Ferti-produ.csv',
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const selectedFiles = selectedGraphs.map(
                    (graph) => filepaths[graph]
                )

                const promises = selectedFiles.map(async (filepath) => {
                    const response = await fetch(filepath)
                    const csvData = await response.text()

                    return new Promise((resolve) => {
                        Papa.parse(csvData, {
                            header: true,
                            dynamicTyping: true,
                            complete: (result) => {
                                resolve(result.data)
                            },
                        })
                    })
                })

                const parsedDataArray = await Promise.all(promises)
                setData(parsedDataArray)
            } catch (error) {
                console.error('Error fetching CSV data:', error)
            }
        }

        fetchData()
    }, [selectedCountry, selectedGraphs])

    const charts = selectedGraphs.map((graph, index) => {
        const columnName =
            data[index] && data[index].length > 0
                ? Object.keys(data[index][0]).find((key) => {
                      const includesCountry = key.includes(selectedCountry)
                      if (includesCountry) {
                          //   console.log('Found column name:', key)
                      }
                      return includesCountry
                  })
                : null
        const chartData = {
            labels:
                data.length > 0 && data[index]
                    ? data[index].map((entry) => entry.Year)
                    : [],
            datasets: [
                {
                    label: `${selectedCountry} ${graph} (current US$)`,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:
                        data.length > 0 && data[index]
                            ? data[index].map((entry) => entry[columnName])
                            : [],
                },
            ],
        }

        const chartOptions = {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Year',
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: `${selectedCountry} ${graph} (current US$)`,
                    },
                },
            },
        }

        return (
            <div key={index}>
                {data.length > 0 && data[index] ? (
                    <Line data={chartData} options={chartOptions} height={75} />
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        )
    })

    return (
        <div style={{ paddingBottom: '100px' }}>
            {charts}
            <Link to="/chat" className="chat-icon-link">
                <div className="chat-icon-with-text">
                    <ChatBubbleIcon style={{ fontSize: 40 }} />
                    <span className="chat-text">Chat with Budget LLM</span>
                </div>
            </Link>
        </div>
    )
}

export default Graph
