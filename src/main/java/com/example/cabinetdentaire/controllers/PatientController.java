package com.example.cabinetdentaire.controllers;

import com.example.cabinetdentaire.entities.Patient;
import com.example.cabinetdentaire.exceptions.PatientNotFoundException;
import com.example.cabinetdentaire.reposityries.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin("http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientRepo patientRepo;

    @GetMapping()
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @PostMapping()
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepo.save(patient);
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepo.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@RequestBody Patient newPatient, @PathVariable Long id) {
        return patientRepo.findById(id)
                .map(patient ->{patient.setNom(newPatient.getNom());
                    patient.setPrenom(newPatient.getPrenom());
                    patient.setEmail(newPatient.getEmail());
                    patient.setMobile(newPatient.getMobile());
                    patient.setCne(newPatient.getCne());
                    patient.setSexe(newPatient.getSexe());
                    patient.setAssurance(newPatient.getAssurance());
                    patient.setMaladies(newPatient.getMaladies());
                    return patientRepo.save(patient);
                })
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {
        if (!patientRepo.existsById(id)) {
            throw new PatientNotFoundException(id);
        }
        patientRepo.deleteById(id);
        return "Patient with ID " + id + " has been deleted successfully.";
    }
}
