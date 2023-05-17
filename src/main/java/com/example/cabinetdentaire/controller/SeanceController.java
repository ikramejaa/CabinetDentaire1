package com.example.cabinetdentaire.controller;

import com.example.cabinetdentaire.exception.SeanceNotFoundException;
import com.example.cabinetdentaire.entities.Seance;
import com.example.cabinetdentaire.repository.SeanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SeanceController {

    @Autowired
    private SeanceRepository seanceRepository;

    @PostMapping("/add")
    Seance newSeance(@RequestBody Seance newSeance){
        return seanceRepository.save(newSeance);
    }

    @GetMapping("/seances")
    List<Seance> getAllSeances(){
        return seanceRepository.findAll();
    }

    @GetMapping("/seance/{id}")
    Seance getSeanceById(@PathVariable Long id){
        return seanceRepository.findById(id)
                .orElseThrow(()->new SeanceNotFoundException(id));
    }

    @PutMapping("/seance/{id}")
    Seance updateSeance(@RequestBody Seance newSeance,@PathVariable Long id){
        return seanceRepository.findById(id)
                .map(seance->{
                    seance.setMontantrecu(newSeance.getMontantrecu());
                    seance.setDate(newSeance.getDate());
                return seanceRepository.save(seance);
                }).orElseThrow(()->new SeanceNotFoundException(id));
    }

    @DeleteMapping("/seance/{id}")
    String deleteSeance(@PathVariable Long id){
        if(!seanceRepository.existsById(id)){
            throw new SeanceNotFoundException(id);
        }
        seanceRepository.deleteById(id);
        return "Seance with id "+id+" has been deleted successfully";
    }
}
