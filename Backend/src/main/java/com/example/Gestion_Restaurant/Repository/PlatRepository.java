package com.example.Gestion_Restaurant.Repository;

import com.example.Gestion_Restaurant.Models.Plat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatRepository extends MongoRepository<Plat, String> {
    void deleteById(String id);
    boolean existsById(String id);
    Plat findPlatById(String id);
}
