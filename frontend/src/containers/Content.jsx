import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Graph from '../components/Graph/Graph'
import './Content.css'
import Chat from '../components/Chat/Chat'
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutline'
const Content = ({ selectedCountry, selectedGraphs }) => {
    return (
        <main className="content">
            <div className="content_container">
                <Switch>
                    <Route path="/graph">
                        <Graph
                            selectedCountry={selectedCountry}
                            selectedGraphs={selectedGraphs}
                        />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                </Switch>
            </div>
        </main>
    )
}

export default Content
