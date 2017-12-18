package by.model;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;
import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Set;


@Entity
@Table(name="USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private int userId;
    @Column(name="name")
    private String name;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "secondname")
    private String secondname;
    @Column(name = "middlename")
    private String middlename;
    @Column(name = "phone")
    private String phone;
    @Column(name = "bonuscardnumber")
    private String bonuscardnumber;
    @Column(name = "points")
    private int points;


   @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
   @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
   private Set<Role> role;


    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_bonus", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "bonus_id"))
    private List<Bonus> bonus;


    public User() {
    }

    public User(User user){
        this.userId = user.getId();
        this.name = user.getName();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.firstname = user.getFirstname();
        this.secondname = user.getSecondname();
        this.middlename = user.getMiddlename();
        this.phone = user.getPhone();
        this.bonuscardnumber = user.getBonuscardnumber();
        this.points = user.getPoints();
        this.bonus = user.getBonus();

    }


    public int getId(){
        return userId;
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

    public String getFirstname() {
        return firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public String getPhone() {
        return phone;
    }

    public String getBonuscardnumber() {
        return bonuscardnumber;
    }

    public void setId(int id) {
        this.userId = id;
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

    public Set<Role> getRole() {
        return role;
    }

    public void setRoles(Set<Role> role) {
        this.role = role;
    }


    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setSecondname(String secondname) {
        this.secondname = secondname;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBonuscardnumber(String bonuscardnumber) {
        this.bonuscardnumber = bonuscardnumber;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<Bonus> getBonus() {
        return bonus;
    }

    public void setBonus(List<Bonus> bonus) {
        this.bonus = bonus;
    }
}

