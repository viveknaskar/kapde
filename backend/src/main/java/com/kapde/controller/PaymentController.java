package com.kapde.controller;

import com.kapde.model.OrderRequest;
import com.kapde.model.OrderResponse;
import com.kapde.model.PaymentVerificationRequest;
import com.kapde.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            OrderResponse response = paymentService.createOrder(request);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to create order: " + e.getMessage()));
        }
    }

    @PostMapping("/payments/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        boolean isValid = paymentService.verifyPayment(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        if (isValid) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Payment verified successfully"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Payment verification failed"));
        }
    }
}
