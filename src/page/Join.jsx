import React, { useState } from 'react'
import '../css/Form.css'
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const navigate = useNavigate();

    const joinUser = async () => {
        try {
            const res = await api.post('/user', {
                name,
                password,
                email
            })
            if(res.status === 200) {
                navigate('/login')
            } else {
                throw new Error ('회원가입에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='form'>
                <div className='title'>회원가입</div>
                <div><div>name</div> <input id='name' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div><div>password</div> <input id='password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div><div>email</div> <input id='email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></div>
                <div className='submit' onClick={() => joinUser()}>회원가입</div>
            </div>
            <div className='join'>이미 계정이 있으신가요? <Link to='/login' className='join-btn'>로그인하기</Link></div>
        </>
    )
}

export default Join