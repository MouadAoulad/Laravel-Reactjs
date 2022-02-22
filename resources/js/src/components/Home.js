import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const fetchPosts = () => {
        api.getAllPosts().then(res => {
            console.log(res.data.data);
            setPosts(res.data.data);
        });
    }

    useEffect(() => {
        fetchPosts();
        /*
        api.getAllPosts().then(res => {
            //console.log(res.data.data);
            setPosts(res.data.data);
        });
        */
    }, [])

    const renderPosts = () => {
        if(posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">There is no post yet, Add one!</td>
                </tr>
            )
        }
        return posts.map((post) => (
            <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <button type="button" onClick={() => {
                        api.deletePost(post.id).then(() => {
                            fetchPosts();
                        }).catch(err => {
                            alert("Error!");
                        });
                    }} className="btn btn-danger">Delete</button>
                    <Link to={`/p/edit/${post.id}`} className="btn btn-warning">Edit</Link>
                </td>
            </tr>
        ))
    }

    return (

        <div className="container">

            <AppContainer title="Laravel ReactJS - CRUD">
                <Link to="/p/add" className="btn btn-primary">ADD POST</Link>
                <hr/>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderPosts()}
                        </tbody>
                    </table>
                </div>
            </AppContainer>
        </div>
    );
}

export default Home;
