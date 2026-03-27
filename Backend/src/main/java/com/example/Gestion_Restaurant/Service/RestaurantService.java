package com.example.Gestion_Restaurant.Service;

import com.example.Gestion_Restaurant.Models.Restaurant;
import com.example.Gestion_Restaurant.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository repository;

    public String addRestaurant(Restaurant r) {
        if(repository.existsByNomAndDeletedFalse(r.getNom())==false){
            repository.save(r);
            return "restaurant "+r.getNom()+" est bien ajouté";
        }
        else{
                return "Restaurant existe déjà !!!!!";
        }

    }

    public List<Restaurant> getAll() {
        return repository.findByDeletedFalse();
    }


    public String EditRestaurant(String id, Restaurant newData) {

        Restaurant existing = repository
                .findById(id)
                .filter(r -> !r.isDeleted())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Restaurant n'existe pas 😥"
                        )
                );
        existing.setNom(newData.getNom());
        existing.setDescription(newData.getDescription());
        existing.setAdresse(newData.getAdresse());
        existing.setTypeCuisine(newData.getTypeCuisine());

        repository.save(existing);

        return "Restaurant " + existing.getNom() + " est bien modifié 😃";
    }

    public String DeleteRestaurant(String id) {
        Restaurant r = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Restaurant n'existe pas 😥"
                        )
                );
        repository.delete(r);
        return r.getNom() +" est supprimé";
    }

    public String SoftDeleteRestaurant(String id) {
        Restaurant r = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Restaurant n'existe pas 😥"
                        )
                );
        if(r.isDeleted()){
            return r.getNom()+" est deja Soft deleted 😌";
        }
        r.setDeleted(true);
        repository.save(r);
        return r.getNom()+" est Soft deleted avec succes";
    }

    public List<Restaurant> getSoftDeleted() {
        return repository.findByDeletedTrue();
    }

    public Optional<Restaurant> getRstaurantById(String id) {
        Optional<Restaurant> r = Optional.ofNullable(repository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Restaurant n'existe pas 😥"
                        )
                ));
        return r;
    }
    public void restore(String id) {
        Restaurant r = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant introuvable"));

        r.setDeleted(false);
        repository.save(r);
    }

}

