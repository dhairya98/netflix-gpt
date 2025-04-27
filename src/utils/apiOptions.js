const token = import.meta.env.VITE_API_TOKEN;

export const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  };