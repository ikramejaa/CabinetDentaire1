package com.example.cabinetdentaire.controllers;

import com.example.cabinetdentaire.entities.Patient;
import com.example.cabinetdentaire.entities.Traitement;
import com.example.cabinetdentaire.exceptions.TraitementNotFoundException;
import com.example.cabinetdentaire.reposityries.PatientRepo;
import com.example.cabinetdentaire.reposityries.TraitementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.cabinetdentaire.exceptions.PatientNotFoundException;


import java.util.List;

@RestController
@RequestMapping("/traitements")
@CrossOrigin("http://localhost:3000")
public class TraitementController {

    @Autowired
    private TraitementRepo traitementrepository;
    @Autowired
    private PatientRepo patientRepository;

    @GetMapping
    public List<Traitement> getAlltraitements(){
        return traitementrepository.findAll();
    }

    @PostMapping("/patient/{patientId}")
    public Traitement createTraitement(
            @PathVariable Long patientId,
            @RequestBody Traitement traitement
    ) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException(patientId));

        traitement.setPatient(patient);

        return traitementrepository.save(traitement);
    }

    @GetMapping("/{id}")
    Traitement getTraitementById(@PathVariable Long id){
        return traitementrepository.findById(id)
                .orElseThrow(()->new TraitementNotFoundException(id));
    }

    @PutMapping("/{id}")
    Traitement updateTraitement(@RequestBody Traitement newTraitement,@PathVariable Long id){
        return traitementrepository.findById(id)
                .map(traitement->{
                    traitement.setNom_traitement(newTraitement.getNom_traitement());
                    traitement.setTotal_paye(newTraitement.getTotal_paye());
                    traitement.setPayment_recu(newTraitement.getPayment_recu());
                    traitement.setReste(newTraitement.getReste());
                    return traitementrepository.save(traitement);
                }).orElseThrow(()->new TraitementNotFoundException(id));
    }

    // Endpoint to delete a patient
    @DeleteMapping("/{id}")
    String deleteTraitement(@PathVariable Long id){
        if(!traitementrepository.existsById(id)){
            throw new TraitementNotFoundException(id);
        }
        traitementrepository.deleteById(id);
        return "traitement with id "+id+" has been deleted successfully";
    }


    @GetMapping("/patient/{patientId}")
    public List<Traitement> getTraitementByPatientId(@PathVariable Long patientId) {
        return traitementrepository.findByPatientId(patientId);
    }




}
