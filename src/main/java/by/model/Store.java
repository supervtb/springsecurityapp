package by.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

/**
 * Created by albertchubakov on 24.01.2018.
 */
@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id" )
    private int storeId;
    @Column(name = "store_name")
    private String storeName;

    @OneToMany()
    @JoinTable(name = "store_bonus", joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "bonus_id"))
    @JsonManagedReference
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
}
