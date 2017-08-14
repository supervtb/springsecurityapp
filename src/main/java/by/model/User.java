package by.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by albertchubakov on 14.08.17.
 */
@Entity
@Table(name="USER")
public class User {

    @Id
    @Column(name="id")
    private String id;
    @Column(name="name")
    private String name;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @Column(name="role")
    private String role;

    public String getId(){
        return name;
    }

    public String getName(){
        return name;
    }

    public String getPassword(){
        return password;
    }

    public String getEmail(){
        return email;
    }

    public String getRole(){
        return role;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
            this.role = role;
    }
}

