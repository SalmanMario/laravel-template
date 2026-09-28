import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: RootLayout,
    notFoundComponent: () => <p className="p-8 text-center text-muted-foreground">Page not found.</p>,
});

function RootLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <nav className="flex justify-center gap-4 border-b p-4 text-sm">
                <Link to="/" className="text-muted-foreground [&.active]:font-medium [&.active]:text-foreground">
                    Home
                </Link>
                <Link to="/user" className="text-muted-foreground [&.active]:font-medium [&.active]:text-foreground">
                    User
                </Link>
            </nav>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </div>
    );
}
