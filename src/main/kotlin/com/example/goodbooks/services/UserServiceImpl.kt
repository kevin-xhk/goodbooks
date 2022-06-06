package com.example.goodbooks.services

import com.example.goodbooks.models.Role
import com.example.goodbooks.models.User
import com.example.goodbooks.repos.UserRepository
import com.example.goodbooks.web.dto.UserRegistrationDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class UserServiceImpl (
    private val userRepo: UserRepository,
//    private val pwdEncoder: BCryptPasswordEncoder,
): UserService {

    override fun save(urDto: UserRegistrationDto): User {
        var user = User(
            firstname = urDto.firstname,
            lastname  = urDto.lastname,
            email     = urDto.email,
            password  = BCryptPasswordEncoder().encode(urDto.password),
            roles     = listOf(Role(name ="ROLE_USER")),
        )

        return userRepo.save(user)
    }



    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userRepo.findByEmail(username)
            ?: throw UsernameNotFoundException("Invalid username or password.")

        return org.springframework.security.core.userdetails.User(
            user.email,                         // username
            user.password,                      // password
            mapRolesToAuthorities(user.roles))  // roles
    }
//    override fun loadUserByUsername(username: String): UserDetails {
////        val user: User = (userRepo.findByEmail(username)
////            ?: throw UsernameNotFoundException("Invalid username or password.")) as User
//
//        return org.springframework.security.core.userdetails.User(
//            user.email,                         // username
//            user.password,                      // password
//            mapRolesToAuthorities(user.roles))  // roles
//    }

    private fun mapRolesToAuthorities(roles: Collection<Role>): Collection<GrantedAuthority?> {
        return roles.stream()
            .map{ SimpleGrantedAuthority(it.name) }
            .collect(Collectors.toList())

    }

}