package com.example.goodbooks.services

import com.example.goodbooks.models.User
import com.example.goodbooks.web.dto.UserRegistrationDto
import org.springframework.security.core.userdetails.UserDetailsService

interface UserService: UserDetailsService {
    fun save(urDto: UserRegistrationDto): User
}