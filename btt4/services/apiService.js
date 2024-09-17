import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.101:8080/v1';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Thêm dòng này để gửi cookie với mỗi yêu cầu
});

// Thêm interceptor để thêm JWT vào header của mỗi yêu cầu
apiService.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('AUTH-TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config); // Log thông tin request
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    console.log('Login data:', { email, password }); // Log thông tin login
    const response = await apiService.post('/login', { email, password });
    console.log('Login response:', response.data); // Log thông tin response

    // Lưu thông tin người dùng và token vào AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    await AsyncStorage.setItem('AUTH-TOKEN', response.data.token);

    return response.data.user; // Trả về thông tin user
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log('Register data:', userData); // Log thông tin register
    const response = await apiService.post('/register', userData);
    console.log('Register response:', response.data); // Log thông tin response

    // Lưu thông tin người dùng và token vào AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    await AsyncStorage.setItem('AUTH-TOKEN', response.data.token);

    return response.data.user; // Trả về thông tin user
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await apiService.post('/otp/send', null, { params: { email } });
    return response.data;
  } catch (error) {
    console.error('Send OTP error:', error);
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await apiService.post('/otp/verify', null, { params: { email, otp } });
    return response.data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
};

export const changePassword = async (email, newPassword) => {
  try {
    const response = await apiService.post('/changePassword', { email, newPassword });
    return response.data;
  } catch (error) {
    console.error('Change Password error:', error);
    throw error;
  }
};

// Thêm các hàm khác để gọi API tại đây
