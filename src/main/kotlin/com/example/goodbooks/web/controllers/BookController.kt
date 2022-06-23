package com.example.goodbooks.web.controllers

import com.example.goodbooks.models.UserBook
import com.example.goodbooks.services.UserBookService
import com.example.goodbooks.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/books")
class BookController (
    private val service: UserBookService,
    private val userService: UserService,
){

    @PostMapping
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    fun addUserBook(@RequestParam workId: String, @RequestParam userEmail: String): String {
         service.addUserBook(
            UserBook(
                userEmail = userEmail,
                workId = workId,
                review = 0,
                status = "",
            )
        )

        return "redirect:/books/$userEmail"
    }

    @GetMapping("/{userEmail}")
    @CrossOrigin
    fun returnUserBooks(@PathVariable userEmail: String): Collection<UserBook>
        = service.getUserBooks(userEmail)


}