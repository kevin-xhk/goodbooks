package com.example.goodbooks.repos

import com.example.goodbooks.models.UserBook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserBookRepository : JpaRepository<UserBook, String>{

    fun findByUserEmail(userEmail: String): List<UserBook>
    fun findByUserEmailAndWorkId(userEmail: String, workId: String): UserBook
}