// lib/razorpay.js

import { getToken } from "@/utils/getToken";

let scriptPromise = null;

const loadRazorpayScript = () => {
    if (typeof window !== "undefined" && window.Razorpay) {
        return Promise.resolve(true);
    }
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => {
            scriptPromise = null; // allow retry
            resolve(false);
        };
        document.body.appendChild(script);
    });
    return scriptPromise;
};

// Call on page mount so the SDK is ready before the user clicks
export const preloadRazorpay = () => {
    if (typeof window !== "undefined") loadRazorpayScript();
};

export const initiatePayment = async ({
    amount,
    userEmail,
    userName,
    onProcessing, // called the moment checkout closes after a successful payment
    onSuccess,
    onFailure,
}) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        onFailure?.();
        return;
    }

    try {
        // Fetch the token in parallel with order creation, so it is
        // already available when verification starts
        const tokenPromise = getToken().catch(() => null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}` // Uncomment if create-order is protected too
            },
            body: JSON.stringify({
                amount,
                currency: "USD",
            }),
        });

        const order = await res.json();

        if (!res.ok) {
            throw new Error(order.detail || "Failed to create order");
        };

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            order_id: order.order_id,
            name: "Problem Pulse",
            description: "Credit Purchase for analysis",
            prefill: { email: userEmail, name: userName },
            theme: { color: "#1560A0" },
            handler: async (response) => {
                // Checkout has closed: show the spinner immediately
                onProcessing?.();

                try {
                    const token = await tokenPromise;

                    const verify = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(response),
                    });

                    const result = await verify.json();

                    if (verify.ok && (result.status === "verified" || result.status === "done")) {
                        onSuccess?.(result);
                    } else {
                        console.error("Verification failed on backend:", result);
                        onFailure?.();
                    }
                } catch (err) {
                    console.error("Network or server error during verification:", err);
                    onFailure?.();
                }
            },
            modal: {
                ondismiss: () => onFailure?.(),
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment initiation error:", error);
        onFailure?.();
    }
};