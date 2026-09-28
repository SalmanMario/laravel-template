import { useState } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <h1 className="text-3xl font-bold">Laravel Template</h1>
            <button
                type="button"
                onClick={() => setCount((value) => value + 1)}
                className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
                Clicks: {count}
            </button>
        </main>
    );
}
