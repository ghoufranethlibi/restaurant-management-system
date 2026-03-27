package com.example.Gestion_Restaurant.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "restaurants")
public class Restaurant {

    public boolean isDeleted() {
        return deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Id
    private String id;
    private String image;

    public void setImage(String image) {
        this.image = image;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String nom;
    private String description;

    public String getTelephone() {
        return telephone;
    }

    public String getImage() {
        return image;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    private String adresse;

    public String getTypeCuisine() {
        return typeCuisine;
    }

    public void setTypeCuisine(String typeCuisine) {
        this.typeCuisine = typeCuisine;
    }

    private String typeCuisine;

    private boolean deleted = false;

    private List<Plat> menu = new ArrayList<>();;

    public void setDeleted(boolean b) {
        deleted=b;
    }

    public List<Plat> getMenu() {
        return (List<Plat>) menu;
    }

    public void setMenu(List<Plat> menu) {
        this.menu = menu;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    private String telephone;

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}

