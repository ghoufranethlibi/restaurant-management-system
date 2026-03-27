package com.example.Gestion_Restaurant.Controller;

import com.example.Gestion_Restaurant.Models.Plat;
import com.example.Gestion_Restaurant.Models.Restaurant;
import com.example.Gestion_Restaurant.Service.PlatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/plat")
public class PlatController {
    @Autowired
    private PlatService service;

    @PostMapping
    public Plat AddPlat(@RequestBody Plat plat) {
        return service.addPlat(plat);
    }

    @GetMapping("restaurant/{idRestaurant}")
    public List<Plat> getPlatsRestaurant(@PathVariable String idRestaurant) {
        return service.findMenu(idRestaurant);
    }

    @DeleteMapping("/{platId}")
    public ResponseEntity<?> deletePlat(@PathVariable String platId) {
        try {
            service.deletePlat(platId);
            return ResponseEntity.noContent().build(); // 204 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage()); // 404 au lieu de 500
        }
    }

    @PutMapping("/{restaurantId}/{idPlat}")
    public String modifierPlat(@PathVariable String restaurantId, @PathVariable String idPlat, @RequestBody Plat plat) {
        return service.modifierPlat(restaurantId, idPlat, plat);
    }

    @GetMapping("/{id}")
    public Plat getPlatById(@PathVariable String id) {
        return service.getPlatById(id);
    }

}