package com.example.cabinetdentaire.exceptions;

public class SeanceNotFoundException extends RuntimeException{
    public SeanceNotFoundException(Long id){
        super("Could not found seance with id "+id);
    }
}
