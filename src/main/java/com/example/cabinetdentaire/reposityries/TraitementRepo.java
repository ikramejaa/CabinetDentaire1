package com.example.cabinetdentaire.reposityries;

import com.example.cabinetdentaire.entities.Traitement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TraitementRepo extends JpaRepository<Traitement,Long> {
    List<Traitement> findByPatientId(Long patientId);

}
