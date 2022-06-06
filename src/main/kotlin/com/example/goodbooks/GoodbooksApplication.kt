package com.example.goodbooks

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GoodbooksApplication

fun main(args: Array<String>) {
	runApplication<GoodbooksApplication>(*args)
}
