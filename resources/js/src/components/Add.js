import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Add = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddPost = async () => {
        setLoading(true);
        try {
            await api.addPost({
                title, description
            })
            navigate('/');
        } catch (err) {
            //alert('Error!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer title="ADD POST">

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
                <button onClick={onAddPost} disabled={loading} type="submit" className="btn btn-primary"> {loading ? 'Loading...' : 'ADD'} </button>
            </form>

        </AppContainer>
    );
}

export default Add;