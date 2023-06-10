package com.example.cabinetdentaire.entities;


import javax.persistence.*;
import java.util.Date;

@Entity
public class Seance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name="traitement_id")
    private Traitement traitement;

    private String montantrecu ;
    @Column(columnDefinition = "DATE")
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Traitement getTraitement() {
        return traitement;
    }

    public void setTraitement(Traitement traitement) {
        this.traitement = traitement;
    }

    public String getMontantrecu() {
        return montantrecu;
    }

    public void setMontantrecu(String montantrecu) {
        this.montantrecu = montantrecu;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
