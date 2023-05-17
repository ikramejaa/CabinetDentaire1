package com.example.CabinetDentaire.controller;

import com.example.CabinetDentaire.exceptions.PatientNotFoundException;
import com.example.CabinetDentaire.model.Patient;
import com.example.CabinetDentaire.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.repository.util.ReactiveWrapperConverters.map;

@CrossOrigin("http://localhost:3001")
@RestController

public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/add")
    public Patient add(@RequestBody Patient patient){
        return patientRepository.save(patient);

    }
    @GetMapping("/getAll")
    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }

    @GetMapping("/patient/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .orElseThrow(()->new PatientNotFoundException(id));
    }

    @PutMapping("/patient/{id}")
    public Patient editPatient(@RequestBody Patient newPatient, @PathVariable Long id)throws PatientNotFoundException {
        return patientRepository.findById(id)
        .map(patient ->{patient.setNom(newPatient.getNom());
                    patient.setPrenom(newPatient.getPrenom());
                    patient.setEmail(newPatient.getEmail());
                    patient.setMobile(newPatient.getMobile());
                    patient.setCne(newPatient.getCne());
                    patient.setSexe(newPatient.getSexe());
                    patient.setAssurance(newPatient.getAssurance());
                    patient.setMaladies(newPatient.getMaladies());
                    return patientRepository.save(patient);
        }).orElseThrow(()->new PatientNotFoundException(id));

    }

    @DeleteMapping("/patient/{id}")
    public String deletePatient(@PathVariable Long id) {
        if(!patientRepository.existsById(id)){
                    throw new PatientNotFoundException(id);
                }
        patientRepository.deleteById(id);
        return "Patient has been deleted";
    }






}





