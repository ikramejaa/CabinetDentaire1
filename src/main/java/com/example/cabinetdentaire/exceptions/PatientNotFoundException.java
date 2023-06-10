package com.example.cabinetdentaire.exceptions;

public class PatientNotFoundException extends RuntimeException{
    public PatientNotFoundException(Long id){
        super("Could not found patient with id "+id);
    }
}
