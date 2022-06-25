package com.example.goodbooks.web.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class MainController {

    @GetMapping("/login")
    fun login(): String = "login"

    @GetMapping("/")
    fun home(): String = "index"

    @GetMapping("/collection")
    fun collection(): String = "collection"

    @GetMapping("/updatebook")
    fun updatebook(): String = "updatebook"
}