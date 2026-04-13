package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

// Configuration class to enable CORS (Cross-Origin Resource Sharing)
@Configuration
public class CorsConfig {

    // Bean to customize web MVC configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            // Configure CORS mappings for backend APIs
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**") // Allow all API endpoints
                        .allowedOrigins("http://localhost:5173") // Allow requests from frontend (React app)
                        .allowedMethods("*") // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                        .allowedHeaders("*"); // Allow all headers
            }
        };
    }
}