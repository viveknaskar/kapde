package com.kapde.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponse {
    private String orderId;
    private long amount;
    private String currency;
    private String keyId;
}
