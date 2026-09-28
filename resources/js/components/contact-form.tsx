import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ContactValues = {
    name: string;
    email: string;
};

export function ContactForm() {
    const [submitted, setSubmitted] = useState<ContactValues | null>(null);

    const form = useForm({
        defaultValues: { name: '', email: '' } as ContactValues,
        onSubmit: async ({ value, formApi }) => {
            setSubmitted(value);
            formApi.reset();
        },
    });

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field
                name="name"
                validators={{
                    onChange: ({ value }) => (value.trim().length < 2 ? 'Name must be at least 2 characters.' : undefined),
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Name</Label>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
                        )}
                    </div>
                )}
            </form.Field>

            <form.Field
                name="email"
                validators={{
                    onChange: ({ value }) => (/^\S+@\S+\.\S+$/.test(value) ? undefined : 'Enter a valid email address.'),
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                            id={field.name}
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
                        )}
                    </div>
                )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
                {([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                )}
            </form.Subscribe>

            {submitted && (
                <p className="text-sm text-muted-foreground">
                    Sent: {submitted.name} ({submitted.email})
                </p>
            )}
        </form>
    );
}
