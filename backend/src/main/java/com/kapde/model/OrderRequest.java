package com.kapde.model;

import lombok.Data;

@Data
public class OrderRequest {
    private long amount;      // in paise (e.g. ₹499.00 = 49900)
    private String currency;  // "INR"
    private String receipt;   // unique receipt id
}
