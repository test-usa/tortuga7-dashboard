// utils/checkTokenExpiration.ts
export function isTokenExpired(token: string): boolean {
    if (!token) return true;
  
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
  
      const expiry = payload.exp;
      if (!expiry) return true;
  
      const now = Math.floor(Date.now() / 1000);
      return expiry < now;
    } catch (err) {
      console.error('Invalid token format:', err);
      return true; // treat as expired if any error
    }
  }
  