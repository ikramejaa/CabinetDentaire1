package com.example.cabinetdentaire.entities;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Seance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seanceid;
    private Long traitementid;
    private Long patientid;
    private String montantrecu ;
    @Column(columnDefinition = "DATE")
    private Date date;
    private String ord_path;

    public Long getSeanceid() {
        return seanceid;
    }

    public void setSeanceid(Long seanceid) {
        this.seanceid = seanceid;
    }

    public Long getTraitementid() {
        return traitementid;
    }

    public void setTraitementid(Long traitementid) {
        this.traitementid = traitementid;
    }

    public Long getPatientid() {
        return patientid;
    }

    public void setPatientid(Long patientid) {
        this.patientid = patientid;
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

    public String getOrd_path() {
        return ord_path;
    }

    public void setOrd_path(String ord_path) {
        this.ord_path = ord_path;
    }
}
