"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PasswordInput(props) {
    const [show, setShow] = useState(false)

    return (
        <Input
            {...props}
            type={show ? "text" : "password"}
            rightIcon={
                <button type="button" onClick={() => setShow(!show)}>
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            }
        />
    )
}