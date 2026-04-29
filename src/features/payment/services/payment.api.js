export const handleCreateOrder = async (amount) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });

    const response = await res.json();
    console.log('create order response: ', response);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to create order");
    }

    return await res.json();
};

export const handleVerifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
    });

    const response = await res.json();
    console.log('verify payment response: ', response);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Payment verification failed");
    }

    return await res.json(); // { status: "verified" }
};