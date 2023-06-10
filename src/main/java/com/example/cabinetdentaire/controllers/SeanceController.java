package com.example.cabinetdentaire.controllers;

import com.example.cabinetdentaire.entities.Patient;
import com.example.cabinetdentaire.entities.Seance;
import com.example.cabinetdentaire.entities.Traitement;
import com.example.cabinetdentaire.exceptions.PatientNotFoundException;
import com.example.cabinetdentaire.exceptions.SeanceNotFoundException;
import com.example.cabinetdentaire.exceptions.TraitementNotFoundException;
import com.example.cabinetdentaire.reposityries.PatientRepo;
import com.example.cabinetdentaire.reposityries.SeanceRepo;
import com.example.cabinetdentaire.reposityries.TraitementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/seances")
@CrossOrigin("http://localhost:3000")
public class SeanceController {
    @Autowired
    private SeanceRepo seanceRepo;

    @Autowired
    private TraitementRepo traitementRepo;

    @Autowired
    private PatientRepo patientRepo;


    @GetMapping
    public List<Seance> getAllSeances(){
        return seanceRepo.findAll();
    }

    @PostMapping("/traitement/{traitementId}")
    public Seance createSeance(
            @PathVariable Long traitementId,
            @RequestBody Seance seance
    ) {
        Traitement traitement = traitementRepo.findById(traitementId)
                .orElseThrow(() -> new TraitementNotFoundException(traitementId));

        seance.setTraitement(traitement);

        return seanceRepo.save(seance);
    }


    @PostMapping("/patient/{patientId}/traitement/{traitementId}")
    public Seance createSeance(
            @PathVariable Long patientId,
            @PathVariable Long traitementId,
            @RequestBody Seance seance
    ) {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException(patientId));

        Traitement traitement = traitementRepo.findById(traitementId)
                .orElseThrow(() -> new TraitementNotFoundException(traitementId));

        seance.setPatient(patient);
        seance.setTraitement(traitement);

        return seanceRepo.save(seance);
    }


    @GetMapping("/{id}")
    Seance getSeanceById(@PathVariable Long id){
        return seanceRepo.findById(id)
                .orElseThrow(()->new SeanceNotFoundException(id));
    }

    @PutMapping("/{id}")
    Seance updateSeance(@RequestBody Seance newSeance,@PathVariable Long id){
        return seanceRepo.findById(id)
                .map(seance->{
                    seance.setMontantrecu(newSeance.getMontantrecu());
                    seance.setDate(newSeance.getDate());
                    return seanceRepo.save(seance);
                }).orElseThrow(()->new SeanceNotFoundException(id));
    }

    // Endpoint to delete a patient
    @DeleteMapping("/{id}")
    String deleteSeance(@PathVariable Long id){
        if(!seanceRepo.existsById(id)){
            throw new SeanceNotFoundException(id);
        }
        seanceRepo.deleteById(id);
        return "seance with id "+id+" has been deleted successfully";
    }


    @GetMapping("/traitement/{traitementId}")
    public List<Seance> getSeanceByTraitementId(@PathVariable Long traitementId) {
        return seanceRepo.findByTraitementId(traitementId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Seance> getSeanceByPatientId(@PathVariable Long patientId) {
        return seanceRepo.findByPatientId(patientId);
    }

    @GetMapping("/patient/{patientId}/traitement/{traitementId}")
    public List<Seance> getSeancesByTraitementAndPatient(
            @PathVariable Long traitementId,
            @PathVariable Long patientId
    ) {
        return seanceRepo.findByTraitementPatientIdAndTraitementId(patientId, traitementId);
    }

    @GetMapping("/date/{date}")
    public List<Seance> getSeancesByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return seanceRepo.findByDate(date);
    }



}
