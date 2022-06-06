package com.example.goodbooks.web.controllers

import com.example.goodbooks.services.UserService
import com.example.goodbooks.web.dto.UserRegistrationDto
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/registration")
class UserRegistrationController (private val userService: UserService){

    @GetMapping
    fun showRegistrationForm(): String = "registration"

    @PostMapping
    fun registerUserAccount(@ModelAttribute("user") urDto: UserRegistrationDto): String {
        userService.save(urDto)
        return "redirect:/registration?success"
    }

    @ModelAttribute("user")
    fun userRegistrationDto(): UserRegistrationDto = UserRegistrationDto()
}