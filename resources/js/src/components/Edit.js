import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Edit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.getOnePost(id).then(res => {
            //console.log(res.data.data);
            const post = res.data.data;
            setTitle(post.title);
            setDescription(post.description);
        });
    }, []);

    const onUpdatePost = async () => {
        setLoading(true);
        try {
            await api.updatePost({
                title, description
            }, id);
            navigate('/');
        } catch (err) {
            //alert('Error!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer title="EDIT POST">

            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-control">
                        
                    </textarea>
                </div>
                <br />
                <button onClick={onUpdatePost} disabled={loading} type="submit" className="btn btn-primary"> {loading ? 'Loading...' : 'UPDATE'} </button>
            </form>

        </AppContainer>
    );
}

export default Edit;