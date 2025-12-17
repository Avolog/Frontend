// src/pages/GoogleCallback/GoogleCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import './GoogleCallback.css';

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('Google 로그인이 취소되었습니다.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      if (!code) {
        setError('인증 코드가 없습니다.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        await authService.handleGoogleCallback(code);
        navigate('/main');
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="callback-container">
      <div className="callback-content">
        {error ? (
          <>
            <p className="callback-error">{error}</p>
            <p>로그인 페이지로 돌아갑니다...</p>
          </>
        ) : (
          <>
            <div className="spinner"></div>
            <p>Google 로그인 처리 중...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default GoogleCallback;