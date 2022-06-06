package com.example.goodbooks.web.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {

    @GetMapping("/login")
    fun login(): String = "login"

    @GetMapping("/")
    fun home(): String = "index"
}