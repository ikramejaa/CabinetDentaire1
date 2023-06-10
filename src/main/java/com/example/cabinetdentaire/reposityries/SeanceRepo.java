package com.example.cabinetdentaire.reposityries;

import com.example.cabinetdentaire.entities.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SeanceRepo extends JpaRepository<Seance,Long> {
    List<Seance> findByPatientId(Long patientId);
    List<Seance> findByTraitementId(Long traitementId);
    List<Seance> findByTraitementPatientIdAndTraitementId(Long patientId, Long traitementId);

    List<Seance> findByDate(Date date);

}
