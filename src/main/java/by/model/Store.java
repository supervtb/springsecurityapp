package by.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

/**
 * Created by albertchubakov on 24.01.2018.
 */
@Entity
@Table(name = "store")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="_id")
public class Store  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id" )
    private int storeId;
    @Column(name = "store_name")
    private String storeName;
    @Column(name = "percent")
    private int percent;

    @OneToMany(mappedBy = "store")
    private List<Bonus> bonuses;


    public Store(){}

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public List<Bonus> getBonuses() {
        return bonuses;
    }

    public void setBonuses(List<Bonus> bonuses) {
        this.bonuses = bonuses;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }
}
