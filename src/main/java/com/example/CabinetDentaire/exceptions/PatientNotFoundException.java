package com.example.CabinetDentaire.exceptions;

public class PatientNotFoundException extends RuntimeException{
    public PatientNotFoundException(Long id){
        super("could not find the patient with id "+ id);
    }
}
