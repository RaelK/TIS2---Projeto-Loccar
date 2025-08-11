package com.loccar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.loccar")
public class LoccarApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoccarApplication.class, args);
    }
}
