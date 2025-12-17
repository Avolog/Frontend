// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../services/authService';

// export const useLoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError(null);
//   };

//   const handleSignIn = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       await authService.login(formData.email, formData.password);
//       navigate('/main');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = () => {
//     navigate('/signup');
//   };

//   return {
//     formData,
//     isLoading,
//     error,
//     handleChange,
//     handleSignIn,
//     handleSignUp,
//   };
// };

// src/hooks/useLoginForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.login(formData.email, formData.password);
      navigate('/main');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Google OAuth URL로 리다이렉트
    const googleLoginUrl = authService.getGoogleLoginUrl();
    window.location.href = googleLoginUrl;
  };

  const handleSignUp = () => {
    // Sign Up 버튼도 Google 로그인으로 연결
    const googleLoginUrl = authService.getGoogleLoginUrl();
    window.location.href = googleLoginUrl;
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSignIn,
    handleGoogleSignIn,
    handleSignUp,
  };
};