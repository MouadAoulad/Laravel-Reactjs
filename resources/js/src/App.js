import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Login from './components/Login';
import Signup from './components/Signup';
import Post from './components/Post';

const App = () => {
    return (
        <Router className="App__container">
            <Routes>
                <Route exact path="/p/" element={<Home/>} />
                <Route path="/p/add" element={<Add/>} />
                <Route path="/p/edit/:id" element={<Edit/>} />

                <Route path="/p/post/:id" element={<Post/>} />

                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
            </Routes>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));