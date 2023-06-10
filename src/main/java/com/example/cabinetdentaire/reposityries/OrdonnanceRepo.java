package com.example.cabinetdentaire.reposityries;

import com.example.cabinetdentaire.entities.Ordonnance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdonnanceRepo extends JpaRepository<Ordonnance,Long> {

    public Ordonnance findBySeanceIdAndPatientId(Long seanceid,Long patientid);
}
