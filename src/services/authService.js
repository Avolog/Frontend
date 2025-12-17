// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// export const authService = {
//   async login(email, password) {
//     // TODO: 실제 API 연동 시 주석 해제
//     // const response = await fetch(`${API_BASE_URL}/auth/login`, {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({ email, password }),
//     // });
//     //
//     // if (!response.ok) {
//     //   const error = await response.json();
//     //   throw new Error(error.message || '로그인에 실패했습니다.');
//     // }
//     //
//     // const data = await response.json();
//     // localStorage.setItem('accessToken', data.accessToken);
//     // return data;

//     // 임시 로그인 로직 (개발용)
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ success: true });
//       }, 500);
//     });
//   },

//   async logout() {
//     localStorage.removeItem('accessToken');
//   },

//   async signup(email, password, name) {
//     // TODO: 실제 API 연동 시 구현
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ success: true });
//       }, 500);
//     });
//   },

//   getAccessToken() {
//     return localStorage.getItem('accessToken');
//   },

//   isAuthenticated() {
//     return !!this.getAccessToken();
//   },
// };

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
  // 이메일 로그인
  login: async (email, password) => {
    // 개발 중에는 임시 로그인 처리
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToken = 'mock-token-' + Date.now();
        const mockUser = { email, name: 'Test User' };
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve({ token: mockToken, user: mockUser });
      }, 500);
    });

    // TODO: 실제 API 연동 시 아래 코드 사용
    // try {
    //   const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || '로그인에 실패했습니다.');
    //   }

    //   // 토큰 저장
    //   if (data.token) {
    //     localStorage.setItem('accessToken', data.token);
    //     localStorage.setItem('user', JSON.stringify(data.user));
    //   }

    //   return data;
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  },

  // 이메일 회원가입
  signup: async (email, password, name) => {
    // 개발 중에는 임시 회원가입 처리
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: '회원가입이 완료되었습니다.' });
      }, 500);
    });

    // TODO: 실제 API 연동 시 아래 코드 사용
    // try {
    //   const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password, name }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || '회원가입에 실패했습니다.');
    //   }

    //   return data;
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  },

  // Google OAuth 로그인 URL 가져오기
  getGoogleLoginUrl: () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = 'email profile openid';
    const responseType = 'code';
    const accessType = 'offline';
    const prompt = 'consent';

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: responseType,
      access_type: accessType,
      prompt: prompt,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },

  // Google OAuth 콜백 처리
  handleGoogleCallback: async (code) => {
    // 개발 중에는 임시 처리
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToken = 'google-mock-token-' + Date.now();
        const mockUser = { email: 'google@example.com', name: 'Google User' };
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve({ token: mockToken, user: mockUser });
      }, 500);
    });

    // TODO: 실제 API 연동 시 아래 코드 사용
    // try {
    //   const response = await fetch(`${API_BASE_URL}/auth/google/callback`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ code }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || 'Google 로그인에 실패했습니다.');
    //   }

    //   // 토큰 저장
    //   if (data.token) {
    //     localStorage.setItem('accessToken', data.token);
    //     localStorage.setItem('user', JSON.stringify(data.user));
    //   }

    //   return data;
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 토큰 가져오기
  getToken: () => {
    return localStorage.getItem('accessToken');
  },
};