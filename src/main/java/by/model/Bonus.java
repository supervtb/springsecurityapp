package by.model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Entity
public class Bonus {
    @Id
    private int bonusId;
    private String nameBonus;
    private String descriptionBonus;
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
