package com.CD.CABINET_DENTAIRE2.exception;

import com.CD.CABINET_DENTAIRE2.model.traitement;

public class traitementNotFoundException extends RuntimeException {

        public traitementNotFoundException(Long id){
            super("Could not found the traitement with id "+ id);
        }

}

