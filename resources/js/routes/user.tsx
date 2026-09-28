import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api, ApiError } from '@/lib/api';

type User = {
    id: number;
    name: string;
    email: string;
};

export const Route = createFileRoute('/user')({
    component: UserPage,
});

function UserPage() {
    const user = useQuery({
        queryKey: ['user'],
        queryFn: () => api<User>('/api/user'),
        retry: false,
    });

    return (
        <main className="flex items-center justify-center p-4 pt-16">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Current user</CardTitle>
                    <CardDescription>
                        <code>GET /api/user</code>, protected by Sanctum
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                    {user.isPending && <p className="text-muted-foreground">Loading...</p>}
                    {user.error instanceof ApiError && user.error.status === 401 && (
                        <p className="text-muted-foreground">Not logged in.</p>
                    )}
                    {user.data && (
                        <p>
                            {user.data.name} ({user.data.email})
                        </p>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
