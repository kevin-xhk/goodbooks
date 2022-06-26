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
){

    // "/books" mappings
    @PostMapping("/books")
    @ResponseStatus(HttpStatus.CREATED)
    fun addUserBook(@RequestParam("workId") workId: String, @RequestParam("userEmail") userEmail: String): UserBook? {
        return service.addUserBook(
            UserBook(
                userEmail = userEmail   ,
                workId = workId,
                review = 0,
                status = "",
            )
        )
    }

    @GetMapping("/books/{userEmail}")
    fun returnUserBooks(@PathVariable userEmail: String): Collection<UserBook>
        = service.getUserBooks(userEmail)

    @GetMapping("/books/{userEmail}/works/{workId}")
//    fun getUserBook(@RequestParam workId: String, @RequestParam userEmail: String): UserBook?
    fun getUserBook(@PathVariable userEmail: String, @PathVariable workId: String): UserBook?
        = service.getUserBook(userEmail, "/works/$workId")


    // "/updatebook" mappings
    @PatchMapping("/updatebook")
    fun updateBook(@RequestBody userBook: UserBook): UserBook
        = service.updateUserBook(userBook)

    @DeleteMapping("/updatebook")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteBank(@RequestBody userBook: UserBook): Unit
        = service.deleteUserBook(userBook)
}