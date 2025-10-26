const = BASE_URL = 'http://192.168.2.12:5000';

export const login = async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

export const getProfile = async (token: string) => {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
    })
    return res.json();
};

export const turnOnLED = async (token: string) => {
    const res = await fetch(`${BASE_URL}/led/on`, {
        headers: {'Authorization': `Bearer ${token}`},
    });
    return res.text();
};

export const turnOffLED = async (token: string) => {
  const res = await fetch(`${BASE_URL}/led/off`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.text();
};