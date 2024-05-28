import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Common.css'
import '../css/Form.css'

const JoinSuccess = () => {
  return (
    <>
        <div className='form'>
            <div className='title success'>회원가입에 성공하였습니다.</div>
            <div className='join m-1'><Link to='/login' className='join-btn'>로그인하러 가기</Link></div>
        </div>
    </>
  )
}

export default JoinSuccess