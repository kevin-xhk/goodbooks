package com.example.goodbooks.web.dto

data class UserRegistrationDto (
    var firstname: String,
    var lastname: String,
    var email: String,
    var password: String,
) {
    constructor() : this("", "", "", "")
}