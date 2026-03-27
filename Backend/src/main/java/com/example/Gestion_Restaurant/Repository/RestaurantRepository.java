package com.example.Gestion_Restaurant.Repository;

import com.example.Gestion_Restaurant.Models.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    List<Restaurant> findByDeletedFalse();
    boolean existsByNomAndDeletedFalse(String nom);

    List<Restaurant> findByDeletedTrue();

}
