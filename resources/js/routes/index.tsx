import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useSelector } from '@tanstack/react-store';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { counterStore } from '@/stores/counter';

export const Route = createFileRoute('/')({
    component: Home,
});

function Home() {
    const count = useSelector(counterStore, (state) => state.count);
    const health = useQuery({
        queryKey: ['health'],
        queryFn: async (): Promise<boolean> => (await fetch('/up')).ok,
    });

    return (
        <main className="flex flex-col items-center gap-6 p-4 pt-16">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Laravel React Template</CardTitle>
                    <CardDescription>
                        Laravel 13, React 19, shadcn/ui, TanStack Query, Router, Store & Form, Tailwind 4
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Server: {health.isPending ? 'checking...' : health.data ? 'online' : 'offline'}
                    </p>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button className="flex-1" onClick={counterStore.actions.increment}>
                        Clicks: {count}
                    </Button>
                    <Button variant="outline" onClick={counterStore.actions.reset}>
                        Reset
                    </Button>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>TanStack Form</CardTitle>
                    <CardDescription>Validation on change, submit disabled until the form is valid</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </main>
    );
}
