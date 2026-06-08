//package com.example.villageTransport.controller;
//
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.razorpay.Order;
//import com.razorpay.RazorpayClient;
//
//@RestController
//
//@RequestMapping("/api/payment")
//
//@CrossOrigin("*")
//
//public class PaymentController {
//
//@Autowired
//
//private RazorpayClient razorpayClient;
//
//@PostMapping("/create-order")
//
//public String createOrder(
//
//@RequestParam int amount
//
//) throws Exception {
//
//JSONObject orderReq =
//new JSONObject();
//
//orderReq.put(
//"amount",
//amount * 100
//);
//
//orderReq.put(
//"currency",
//"INR"
//);
//
//orderReq.put(
//"receipt",
//"ride_receipt"
//);
//
//Order order =
//
//razorpayClient.orders.create(
//orderReq
//);
//
//return order.toString();
//
//}
//
//}
package com.example.villageTransport.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins="http://localhost:3000")

public class PaymentController {

@PostMapping("/create-order/{amount}")

public Map<String,Object> createOrder(

@PathVariable Double amount

)throws Exception{

RazorpayClient client =

new RazorpayClient(

"YOUR_KEY_ID",

"YOUR_SECRET"

);

JSONObject options =
new JSONObject();

options.put(
"amount",
amount * 100
);

options.put(
"currency",
"INR"
);

options.put(
"receipt",
"ride_"+System.currentTimeMillis()
);

Order order =
client.orders.create(options);

Map<String,Object> data =
new HashMap<>();

data.put(
"id",
order.get("id")
);

data.put(
"amount",
order.get("amount")
);

data.put(
"currency",
order.get("currency")
);

return data;

}

}