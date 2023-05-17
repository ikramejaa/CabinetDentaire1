package com.example.cabinetdentaire.repository;

import com.example.cabinetdentaire.entities.Seance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeanceRepository extends JpaRepository<Seance,Long> {
}
