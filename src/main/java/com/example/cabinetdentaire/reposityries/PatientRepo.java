package com.example.cabinetdentaire.reposityries;

import com.example.cabinetdentaire.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepo extends JpaRepository<Patient,Long> {
}
