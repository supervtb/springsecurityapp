package by.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Entity
@Table(name = "bonus")
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="_idn")
public class Bonus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bonus_id" )
    private int bonusId;
    @Column(name = "name_bonus")
    private String nameBonus;
    @Column(name = "description_bonus")
    private String descriptionBonus;
    @Column(name = "price_bonus")
    private int priceBonus;

    @ManyToOne()
    @JoinTable(name = "store_bonus", joinColumns = @JoinColumn(name = "bonus_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
    @JsonIgnore
    private Store store;

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public int getBonusId() {
        return bonusId;
    }

    public void setBonusId(int bonusId) {
        this.bonusId = bonusId;
    }

    public String getNameBonus() {
        return nameBonus;
    }

    public void setNameBonus(String nameBonus) {
        this.nameBonus = nameBonus;
    }

    public String getDescriptionBonus() {
        return descriptionBonus;
    }

    public void setDescriptionBonus(String descriptionBonus) {
        this.descriptionBonus = descriptionBonus;
    }

    public int getPriceBonus() {
        return priceBonus;
    }

    public void setPriceBonus(int priceBonus) {
        this.priceBonus = priceBonus;
    }
}
