package com.campusgpt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.service.EmailService;

@RestController
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/test/email")
    public String sendTestMail() {

        emailService.sendEmail(

                "dhinakaransivam2004@gmail.com",

                "CampusGPT Email Test",

                "Congratulations! Your email configuration is working successfully."

        );

        return "Email Sent Successfully";

    }

}