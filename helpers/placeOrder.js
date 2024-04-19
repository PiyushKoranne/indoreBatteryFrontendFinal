import axios from "axios";
import logo from "../src/assets/react.svg"

export async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("https://batterybackend.react.stagingwebsite.co.in/payment/orders");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_UUXJSpcm3eem9n", 
        amount: amount.toString(),
        currency: currency,
        name: "Indore Battery",
        description: "Test Transaction",
        image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("https://batterybackend.react.stagingwebsite.co.in/payment/orders/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Hrashikesh Pandey",
            email: "hrashikeshapandey@gmail.com",
            contact: "9617308534",
        },
        notes: {
            address: "Office No. 217-218, 3rd Floor, Onam Plaza Beside Industry House, Infront of Ibus Stop, New Palasia, Indore 452001 ",
        },
        theme: {
            color: "#FF7637",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  export function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}