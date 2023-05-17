package com.example.cabinetdentaire.exception;

public class SeanceNotFoundException extends RuntimeException{
    public SeanceNotFoundException(Long id){
        super("Could not found seance with id "+id);
    }
}
