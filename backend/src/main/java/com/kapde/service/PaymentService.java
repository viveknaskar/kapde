package com.kapde.service;

import com.kapde.model.OrderRequest;
import com.kapde.model.OrderResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public OrderResponse createOrder(OrderRequest request) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount());
        options.put("currency", request.getCurrency());
        options.put("receipt", request.getReceipt());

        Order order = client.orders.create(options);

        return new OrderResponse(
                order.get("id"),
                order.get("amount"),
                order.get("currency"),
                keyId
        );
    }

    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);
            Utils.verifyPaymentSignature(options, keySecret);
            return true;
        } catch (RazorpayException e) {
            return false;
        }
    }
}
