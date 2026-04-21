type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BASE_URL = 'https://mate.academy/students-api';

function request<TResponse, TData = unknown>(
  url: string,
  method: RequestMethod = 'GET',
  data?: TData,
): Promise<TResponse> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${url}`, options).then(async response => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return response.json() as Promise<TResponse>;
  });
}

export const client = {
  get: <TResponse>(url: string) => request<TResponse>(url),
  post: <TResponse, TData = unknown>(url: string, data: TData) =>
    request<TResponse, TData>(url, 'POST', data),
  put: <TResponse, TData = unknown>(url: string, data: TData) =>
    request<TResponse, TData>(url, 'PUT', data),
  patch: <TResponse, TData = unknown>(url: string, data: TData) =>
    request<TResponse, TData>(url, 'PATCH', data),
  delete: <TResponse = void>(url: string) => request<TResponse>(url, 'DELETE'),
};
