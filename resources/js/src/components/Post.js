import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Post = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({title:'', description:''});
    const [comments, setComments] = useState([]);
    const [content, setcontent] = useState('');
    const fetchPost = () => {
        api.getOnePost(id).then(res => {
            const data = res.data.data;
            console.log(res.data.data);
            setPost({title:data.title, description:data.description});
            setComments(data.comments);
        });
    }

    useEffect(() => {
        fetchPost();
        /*
        api.getOnePost(id).then(res => {
            const data = res.data.data;
            console.log(res.data.data);
            setPost({title:data.title, description:data.description});
            setComments(data.comments);
        });
        */
    }, []);

    const onAddComment = async () => {
        setLoading(true);
        try {
            await api.addComment({
                content:content,
                post_id:id
            });
            fetchPost();
            //navigate('/');
        } catch (err) {
            //alert('Error!');
            console.log(err);
        } finally {
            setLoading(false);
            setcontent('');
        }
    }
    

    return (
        <AppContainer title="ADD COMMENT">

            
                <div className="form-group">

                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                    <hr />

                    <label>Comments</label>

                    <ul className="list-group">
                    {
                    comments.map((com) => (
                        <li className="list-group-item">{com.content} &nbsp; <button className="btn-danger" onClick={() => {
                            api.deleteComment(com.id).then(() => {
                                fetchPost();
                            }).catch(err => {
                                alert("Error!");
                            });
                        }}>X</button></li>
                    ))
                    }
                    </ul>
        
                    <hr />
                    <form>
                        <label>Add Comment</label>
                        <textarea value={content} onChange={e => setcontent(e.target.value)} className="form-control"></textarea>
                        <br />
                        <button onClick={onAddComment} disabled={loading} type="button" className="btn btn-primary"> {loading ? 'Loading...' : 'UPDATE'} </button>
                    </form>
                </div>            

        </AppContainer>
    );
}

export default Post;