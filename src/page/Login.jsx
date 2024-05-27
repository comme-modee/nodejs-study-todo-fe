import React, { useEffect, useState } from 'react'
import '../css/Form.css'
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        if(token) {
            navigate('/')
        }
    },[token])

    const login = async () => {
        try {
            const res = await api.post('/user/login', {
                name,
                password
            })
            if (res.status === 200) {
                const userName = res.data.user.name;
                const token = res.data.token;
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('userName', userName)
                api.defaults.headers['authorization'] = "Bearer " + token;

                navigate('/')
            } 
        } catch (error) {
            setError(error.error)
        }
    }

    return (
        <>
            <div className='error'>{error}</div>
            <div className='form'>
                <div className='title'>로그인</div>
                <div><div>name</div> <input id='name' placeholder='[테스터 정보] name: test / pw: test' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div><div>password</div> <input id='password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className='submit' onClick={() => login()}>로그인</div>
            </div>
            <div className='join'>계정이 없으신가요? <Link to='/join' className='join-btn'>회원가입하기</Link></div>
        </>
    )
}

export default Login