package com.example.goodbooks.repos

import com.example.goodbooks.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User

//    @Query(value = "SELECT * FROM users_books WHERE user_id = ?1", nativeQuery = true)
//    fun getBooks(userId: String): List<String>;
}