export class ApiError extends Error {
    constructor(
        public status: number,
        public data: unknown,
    ) {
        super(`Request failed with status ${status}`);
    }
}

function xsrfToken(): string | undefined {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);

    return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Fetch wrapper for the Laravel API: sends the session cookie and the XSRF token
 * so Sanctum authenticates requests coming from this SPA.
 */
export async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Accept', 'application/json');
    headers.set('X-Requested-With', 'XMLHttpRequest');

    if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const token = xsrfToken();

    if (token) {
        headers.set('X-XSRF-TOKEN', token);
    }

    const response = await fetch(url, { ...options, headers, credentials: 'same-origin' });
    const data = response.status === 204 ? null : await response.json().catch(() => null);

    if (!response.ok) {
        throw new ApiError(response.status, data);
    }

    return data as T;
}
