package com.example.cabinetdentaire.exceptions;

public class TraitementNotFoundException extends RuntimeException {

        public TraitementNotFoundException(Long id){
            super("Could not found the traitement with id "+ id);
        }

}

