'use client';

import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

export default function RedirectToast() {
  useEffect(() => {
    const status = Cookies.get('redirectStatus');
    if (status === 'needLogin') {
      toast.error('로그인이 필요합니다!');
    }
    if (status === 'invalidNotice') {
      toast.error('존재하지 않는 공고입니다');
    }
    if (status === 'alreadyLogin') {
      toast.error('이미 로그인 상태입니다.');
      Cookies.remove('redirectStatus');
    }
    if (status === 'invalidAuthority') {
      toast.error('접근 권한이 없습니다.');
    }
    if (status === 'closedNotice') {
      toast.error('이미 닫힌 공고입니다.');
    }
    Cookies.remove('redirectStatus');
  }, []);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      limit={1}
    />
  );
}
