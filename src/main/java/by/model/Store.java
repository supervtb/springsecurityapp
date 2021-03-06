package by.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

/**
 * Created by albertchubakov on 24.01.2018.
 */
@Entity
@Table(name = "store")
public class Store  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id" )
    private int storeId;
    @Column(name = "store_name")
    private String storeName;
    @Column(name = "percent")
    private int percent;
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "store", allowSetters = true)
    private List<Bonus> bonuses;
    @JsonIgnoreProperties(value = "store", allowSetters = true)
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<User> users ;


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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
