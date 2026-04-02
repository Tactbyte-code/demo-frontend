// features/auth/components/login-form.jsx

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Divider } from "@/components/ui/divider"
import { ErrorBanner } from "@/components/ui/error-banner"
import { PasswordInput } from "./password-input"
import { GoogleButton } from "./google-button"

export function LoginForm({
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
    onGoogle,
    loading,
    error
}) {
    return (
        <div className="space-y-6">
            <ErrorBanner message={error} />

            <GoogleButton onClick={onGoogle} loading={loading} />

            <Divider label="Or login with email" />

            <form onSubmit={onSubmit} className="space-y-5">
                <FormField label="Work Email">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                    />
                </FormField>

                <FormField label="Password">
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormField>

                <Button type="submit" className="w-full" loading={loading}>
                    Sign In
                </Button>
            </form>
        </div>
    )
}