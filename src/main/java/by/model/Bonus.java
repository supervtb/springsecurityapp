package by.model;

import javax.persistence.*;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Entity
@Table(name = "bonus")
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
