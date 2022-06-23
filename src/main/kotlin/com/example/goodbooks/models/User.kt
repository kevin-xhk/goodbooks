package com.example.goodbooks.models

import javax.persistence.*

@Entity
@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["email"])])
class User (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var firstname: String,

    var lastname: String,

    var email: String,

    var password:String,

    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinTable(
        name = "users_roles",
        joinColumns = [JoinColumn( name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    var roles:Collection<Role>,

//    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
//    @JoinTable(
//        name = "users_books",
//        joinColumns = [JoinColumn( name = "user_id", referencedColumnName = "id")],
//        inverseJoinColumns = [JoinColumn(name = "book_id", referencedColumnName = "workId")]
//    )
    @OneToMany(
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
    )
    var books:Collection<UserBook>,

//    @OneToMany(mappedBy = "user")
//    var bookEntries: List<BookEntry>
)