// lib/razorpay.js
export const initiatePayment = async ({
    amount,
    userEmail,
    userName,
    onSuccess,
    onFailure,
}) => {
    // 1. Create order on backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });
    const order = await res.json();
    console.log('order data: ', order);

    // 2. Open Razorpay checkout
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Problem Pulse",
        description: "Plan Purchase",
        prefill: { email: userEmail, name: userName },
        theme: { color: "#1560A0" },
        handler: async (response) => {
            // 3. Verify on backend
            const verify = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
            });
            const result = await verify.json();
            console.log('verify result: ', result);

            if (result.status === "verified") {
                onSuccess(result);
            } else {
                onFailure?.();
            }
        },
        modal: {
            ondismiss: () => onFailure?.(),
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};