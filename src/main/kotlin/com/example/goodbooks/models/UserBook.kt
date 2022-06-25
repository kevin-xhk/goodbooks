package com.example.goodbooks.models

import javax.persistence.*

@Entity
@Table(name = "userbook")
class UserBook (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

//    @Column(name = "user_email")
    var userEmail: String,

    var workId: String,

    var review: Int,    //from 1 to 10?

    var status: String,
)

