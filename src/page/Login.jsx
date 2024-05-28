import React, { useEffect, useState } from 'react'
import '../css/Common.css'
import '../css/Form.css'
import "../css/Error.css";
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import useErrorAni from '../hooks/useErrorAni';

const Login = ({user, setUser}) => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ nameErrorMessage, setNameErrorMessage ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const navigate = useNavigate();
    const { errorAni, handleErrorAni } = useErrorAni();


    useEffect(()=>{
        if(user) {
            navigate('/')
        }
    },[user, navigate])

    const login = async (e) => {
        e.preventDefault();
        handleErrorAni()
        if(name === '') {
            setNameErrorMessage('아이디를 입력해주세요.')
        } else {
            setNameErrorMessage('')
        }
        if(password === '') {
            setPasswordErrorMessage('비밀번호를 입력해주세요.')
        } else {
            setPasswordErrorMessage('')
        }
        try {
            const res = await api.post('/user/login', {
                name,
                password
            })
            if (res.status === 200) {
                // const userName = res.data.user.name;
                const token = res.data.token;
                sessionStorage.setItem('token', token)
                // sessionStorage.setItem('userName', userName)
                api.defaults.headers['authorization'] = "Bearer " + token;
                setUser(res.data.user)
                navigate('/')
            } 
        } catch (error) {
            setError(error.error)
        }
    }

    return (
        <>
            <div className='error-message'>{error}</div>
            <form className='form' onSubmit={login}>
                <div className='title'>로그인</div>
                <div>
                    <div>이름</div>
                    <input id='name' placeholder='[테스터 정보] name: 홍길동 / pw: 1234' type="text" className={name === '' ? errorAni : ''} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <span className='input-error-message'>{name === '' ? nameErrorMessage : ''}</span>
                </div>
                <div>
                    <div>비밀번호</div>
                    <input id='password' type="password" className={password === '' ? errorAni : ''} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
                    <span className='input-error-message'>{password === '' ? passwordErrorMessage : ''}</span>
                </div>
                <button type='submit'>로그인</button>
            </form>
            <div className='join'>계정이 없으신가요? <Link to='/join' className='join-btn'>회원가입하기</Link></div>
        </>
    )
}

export default Login