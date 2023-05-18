package com.CD.CABINET_DENTAIRE2.controller;
import com.CD.CABINET_DENTAIRE2.exception.traitementNotFoundException;
import com.CD.CABINET_DENTAIRE2.model.traitement;
import com.CD.CABINET_DENTAIRE2.repository.traitementrepository;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class traitementcontroller {

@Autowired
    private traitementrepository traitementrepository;

@PostMapping("/traitement")
traitement newtraitement(@RequestBody traitement newtraitement){
    return traitementrepository.save(newtraitement);
}


@GetMapping("/traitements")
    List<traitement> getAlltraitements(){
    return traitementrepository.findAll();

}


    @GetMapping("/traitement/{id}")
    traitement gettraitementserById(@PathVariable Long id) {
        return traitementrepository.findById(id)
                .orElseThrow(() -> new traitementNotFoundException(id));
    }

    @PutMapping("/traitement/{id}")
    traitement  updatetraitement(@RequestBody traitement newtraitement, @PathVariable Long id) {
        return traitementrepository.findById(id)
                .map(traitement -> {
                    traitement.setTraitement(newtraitement.getTraitement());
                    traitement.setTotal_paye(newtraitement.getTotal_paye());
                    traitement.setPayment_recu(newtraitement.getPayment_recu());
                    traitement.setReste(newtraitement.getReste());

                    return traitementrepository.save(traitement);
                }).orElseThrow(() -> new traitementNotFoundException(id));
    }


    @DeleteMapping("/traitement/{id}")
    String deletetraitement(@PathVariable Long id){
        if(!traitementrepository.existsById(id)){
            throw new traitementNotFoundException(id);
        }
        traitementrepository.deleteById(id);
        return  "traitement with id "+id+" has been deleted success.";
    }


}
