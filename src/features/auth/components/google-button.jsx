import { GoogleIcon } from "@/components/icons/google-icon"
import { Button } from "@/components/ui/button"

export function GoogleButton({ onClick, loading }) {
    return (
        <Button
            variant="secondary"
            onClick={onClick}
            loading={loading}
            className="w-full py-6"
        >
            <GoogleIcon className="w-5 h-5 mr-2" />
            Continue with Google
        </Button>
    )
}