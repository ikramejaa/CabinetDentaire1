package com.example.cabinetdentaire.entities;

import javax.persistence.*;

@Entity
public class Traitement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_traitement")
    private String nom_traitement;

    private String total_paye;
    private String payment_recu;
    private String  reste;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom_traitement() {
        return nom_traitement;
    }

    public void setNom_traitement(String nom_traitement) {
        this.nom_traitement = nom_traitement;
    }

    public String getTotal_paye() {
        return total_paye;
    }

    public void setTotal_paye(String total_paye) {
        this.total_paye = total_paye;
    }

    public String getPayment_recu() {
        return payment_recu;
    }

    public void setPayment_recu(String payment_recu) {
        this.payment_recu = payment_recu;
    }

    public String getReste() {
        return reste;
    }

    public void setReste(String reste) {
        this.reste = reste;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
