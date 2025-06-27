import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/axios';

export default function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true);     // 세션 확인 중 여부
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/check')
      .then(() => {
        setChecking(false); // 세션 확인 성공
      })
      .catch(() => {
        navigate('/login'); // 세션 없음 → 로그인 페이지 이동
      });
  }, [navigate]);

  // ✅ 세션 체크 중에는 아무것도 렌더링하지 않음 (깜빡임 방지)
  if (checking) return null;

  return children;
}