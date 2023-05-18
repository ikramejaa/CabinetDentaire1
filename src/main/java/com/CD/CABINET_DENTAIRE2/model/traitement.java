package com.CD.CABINET_DENTAIRE2.model;


import jakarta.persistence.*;

@Entity
public class traitement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String traitement;
    private String total_paye;
    private String payment_recu;
    private String  reste;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTraitement() {
        return traitement;
    }

    public void setTraitement(String traitement) {
        this.traitement = traitement;
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
}
