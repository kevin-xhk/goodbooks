package com.example.goodbooks.services

import com.example.goodbooks.models.UserBook
import com.example.goodbooks.repos.UserBookRepository
import org.springframework.stereotype.Service

@Service
class UserBookService (private val ubRepo: UserBookRepository){

    fun getUserBook(userEmail: String, workId: String): UserBook?
        = ubRepo.findByUserEmailAndWorkId(userEmail, workId)

    fun getUserBooks(userEmail: String): List<UserBook>
        = ubRepo.findByUserEmail(userEmail)

    fun addUserBook(userbook: UserBook): UserBook? {
        if(getUserBook(userEmail = userbook.userEmail, workId = userbook.workId) == null){
            return ubRepo.save(userbook)
        }
        return null
    }

    fun updateUserBook(userbook: UserBook) {
        var ub: UserBook = ubRepo.findByUserEmailAndWorkId(userbook.userEmail, userbook.workId)

        ub.review = userbook.review
        ub.status = userbook.status

        ubRepo.save(ub)
    }

    fun deleteUserBook(userbook: UserBook)
        = ubRepo.delete(userbook)
}