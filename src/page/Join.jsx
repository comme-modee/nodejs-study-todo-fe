import React, { useEffect, useState } from 'react'
import '../css/Common.css'
import '../css/Form.css'
import "../css/Error.css";
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import useErrorAni from '../hooks/useErrorAni';

const Join = () => {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const [ passwordConfirmErrorMessage, setPasswordConfirmErrorMessage ] = useState('');
    const [ nameErrorMessage, setNameErrorMessage ] = useState('');
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const { errorAni, handleErrorAni } = useErrorAni();

    const navigate = useNavigate();

    const validateEmail = (email) => {
        // @ 뒤에 .을 필수로 포함하고 . 뒤에 두 글자 또는 세 글자가 오도록 하는 정규 표현식
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return pattern.test(email);
    };

    useEffect(()=>{
        if (email !== '' && !validateEmail(email)) {
            setEmailErrorMessage('올바른 이메일 형식을 입력해주세요. ex) test@domain.com');
        } else {
            setEmailErrorMessage('')
        }
    },[email])

    const joinUser = async (e) => {
        e.preventDefault();
        handleErrorAni()
        try {
            if(name === '') {
                setNameErrorMessage('아이디를 입력해주세요.');
            } else {
                setNameErrorMessage('');
            }
            
            if(password === '') {
                setPasswordErrorMessage('비밀번호를 입력해주세요.');
            } else {
                setPasswordErrorMessage('');
            }

            if(confirmPassword === '') {
                setPasswordConfirmErrorMessage('비밀번호를 다시 한번 입력해주세요.')
            } else {
                if(password !== confirmPassword) {
                    setPasswordConfirmErrorMessage('비밀번호가 일치하지 않습니다.');
                    setConfirmPassword('');
                    throw new Error('비밀번호를 확인해주세요.');
                } else {
                    setPasswordConfirmErrorMessage('')
                }
            } 
            

            if(email === '') {
                setEmailErrorMessage('이메일을 입력해주세요.');
            } else if (email !== '' && !validateEmail(email)) {
                setEmailErrorMessage('올바른 이메일 형식을 입력해주세요. ex) test@domain.com');
            } else {
                setEmailErrorMessage('')
            }

            if(name !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword && email !== '') {
                const res = await api.post('/user', {
                    name,
                    password,
                    email
                })
                if(res.status === 200) {
                    navigate('/join/pass')
                } 
            }
        } catch (error) {
            console.log(error.error)
            setErrorMessage(error.error)
        }
    }

    return (
        <>
            <div className='error-message'>{errorMessage}</div>
            <form className='form' onSubmit={joinUser}>
                <div className='title'>회원가입</div>
                <div>
                    <div>이름</div>
                    <input id='name' type="text" className={name === '' ? errorAni : ''} value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name'/>
                    <span className={nameErrorMessage ? 'input-error-message' : ''}>{name === '' ? nameErrorMessage : ''}</span>
                </div>
                <div>
                    <div>비밀번호</div>
                    <input id='password' type="password" className={password === '' ? errorAni : ''} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
                    <span className={passwordErrorMessage ? 'input-error-message' : ''}>{password === '' ? passwordErrorMessage : ''}</span>
                </div>
                <div>
                    <div>비밀번호 확인</div>
                    <input id='confirm-password' type="password" className={confirmPassword === '' ? errorAni : ''} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Password Confirm'/>
                    <span className={passwordConfirmErrorMessage ? 'input-error-message' : ''}>{confirmPassword === '' ? passwordConfirmErrorMessage : ''}</span>
                </div>
                <div>
                    <div>이메일</div>
                    <input id='email' type="email" className={email === '' ? errorAni : ''} placeholder="example@domain.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <span className={emailErrorMessage ? 'input-error-message' : ''}>{emailErrorMessage}</span>
                </div>
                <button type='submit'>회원가입</button>
            </form>
            <div className='join'>이미 계정이 있으신가요? <Link to='/login' className='join-btn'>로그인하기</Link></div>
        </>
    )
}

export default Join