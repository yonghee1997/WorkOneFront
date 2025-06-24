import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/axios';

export default function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/check')
      .then(() => setChecking(false))
      .catch(() => navigate('/login'));
  }, []);

  if (checking) return null;
  return children;
}