package com.example.Gestion_Restaurant.Controller;

import com.example.Gestion_Restaurant.Models.Restaurant;
import com.example.Gestion_Restaurant.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:4200")
public class RestaurantController {

    @Autowired
    private RestaurantService service;

    @GetMapping
    public List<Restaurant> getAll() {
        return service.getAll();
    }

    // ✅ CRUD CLASSIQUE (sans image)
    //@PostMapping
    //public String create(@RequestBody Restaurant restaurant) {
      //  return service.addRestaurant(restaurant);
    //}

    // ✅ AJOUT AVEC IMAGE
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Restaurant createWithImage(
            @RequestParam("nom") String nom,
            @RequestParam("adresse") String adresse,
            @RequestParam("telephone") String telephone,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        String uploadDir = "upload";
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException(e);
        } 

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, image.getBytes());

        Restaurant restaurant = new Restaurant();
        restaurant.setNom(nom);
        restaurant.setAdresse(adresse);
        restaurant.setTelephone(telephone);
        restaurant.setImage("upload/" + fileName);
        restaurant.setDeleted(false);

        service.addRestaurant(restaurant);

        return restaurant;
    }

    @PutMapping("/{id}")
    public String Modifier(@PathVariable String id, @RequestBody Restaurant restaurant) {
        return service.EditRestaurant(id, restaurant);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        return service.DeleteRestaurant(id);
    }

    @PutMapping("/soft/{id}")
    public String Softdelete(@PathVariable String id) {
        return service.SoftDeleteRestaurant(id);
    }

    @GetMapping("/soft")
    public List<Restaurant> getSoftDeleted() {
        return service.getSoftDeleted();
    }

    @GetMapping("/{id}")
    public Optional<Restaurant> getById(@PathVariable String id) {
        return service.getRstaurantById(id);
    }

    @PutMapping("/restore/{id}")
    public void restore(@PathVariable String id) {
        service.restore(id);
    }
}
