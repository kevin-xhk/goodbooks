package com.example.goodbooks.web.controllers

import com.example.goodbooks.models.UserBook
import com.example.goodbooks.services.UserBookService
import com.example.goodbooks.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class BookController (
    private val service: UserBookService,
//    private val userService: UserService,
){

    @PostMapping("/books")
//    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    fun addUserBook(@RequestParam workId: String, @RequestParam userEmail: String): UserBook? {
        return service.addUserBook(
            UserBook(
                userEmail = userEmail,
                workId = workId,
                review = 0,
                status = "",
            )
        )
    }

    @GetMapping("/books/{userEmail}")
    fun returnUserBooks(@PathVariable userEmail: String): Collection<UserBook>
        = service.getUserBooks(userEmail)


    @GetMapping("/book")
    fun getUserBook(@RequestParam workId: String, @RequestParam userEmail: String): UserBook?
        = service.getUserBook(userEmail, workId)
}