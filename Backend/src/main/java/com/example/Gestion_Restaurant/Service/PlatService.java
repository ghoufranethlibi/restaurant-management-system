package com.example.Gestion_Restaurant.Service;

import com.example.Gestion_Restaurant.Models.Plat;
import com.example.Gestion_Restaurant.Models.Restaurant;
import com.example.Gestion_Restaurant.Repository.PlatRepository;
import com.example.Gestion_Restaurant.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PlatService {
    @Autowired

    private RestaurantRepository restaurantRepository;
    private final PlatRepository platRepository;
    public PlatService(RestaurantRepository restaurantRepository,
                       PlatRepository platRepository) {
        this.restaurantRepository = restaurantRepository;
        this.platRepository = platRepository;
    }
    public Plat addPlat(Plat plat) {
        Restaurant r = restaurantRepository
                .findById(plat.getRestaurantId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Restaurant n'existe pas 😥"
                        )
                );
        Plat savedPlat = platRepository.save(plat);
        r.getMenu().add(savedPlat);
        restaurantRepository.save(r);
        return savedPlat;
    }
    public void deletePlat(String platId) {

        Plat plat = platRepository.findById(platId)
                .orElseThrow(() -> new RuntimeException("Plat introuvable"));

        Restaurant r = restaurantRepository.findById(plat.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant introuvable"));

        r.getMenu().removeIf(p -> platId.equals(p.getId()));

        restaurantRepository.save(r);

        platRepository.deleteById(platId);
    }


    public String modifierPlat(String restaurantId,String idPlat ,Plat plat) {
        Restaurant r = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant introuvable"));

        Plat p = r.getMenu().stream()
                .filter(l -> l.getId().equals(idPlat))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Plat introuvable !!!!"));
        p.setNom(plat.getNom());
        p.setDescription(plat.getDescription());
        p.setPrix(plat.getPrix());
        p.setRestaurantId(plat.getRestaurantId());
        p.setId(plat.getId());
        restaurantRepository.save(r);
        return "la modification est effectue avec succes !!";
    }

    public List<Plat> findMenu(String id) {
        Restaurant r = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant introuvable"));
        return r.getMenu();
    }

    public Plat getPlatById(String id) {
        return platRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plat introuvable"));
    }




}
