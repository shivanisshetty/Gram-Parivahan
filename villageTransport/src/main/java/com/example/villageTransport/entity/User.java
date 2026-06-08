package com.example.villageTransport.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String phone;

    private String password;

    private String role;
    @Column(

    		columnDefinition = "TEXT"

    		)

    		private String profilePhoto;
    private String DrivingLicense;
    private String VehicleNumber;
    private String VehicleName;
    @Column(

    		columnDefinition = "boolean default false"

    		)

    		private Boolean verified = false;
    public User() {}

    public User(
            Long id,
            String name,
            String phone,
            String password,
            String role
    ) {

        this.id = id;

        this.name = name;

        this.phone = phone;

        this.password = password;

        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	public String getDrivingLicense() {
		return DrivingLicense;
	}

	public void setDrivingLicense(String drivingLicense) {
		DrivingLicense = drivingLicense;
	}

	public String getVehicleNumber() {
		return VehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		VehicleNumber = vehicleNumber;
	}

	public String getVehicleName() {
		return VehicleName;
	}

	public void setVehicleName(String vehicleName) {
		VehicleName = vehicleName;
	}

	public boolean isVerified() {
		return verified;
	}
	
	public Boolean getVerified() {
		return verified;
	}

	public void setVerified(Boolean verified) {
		this.verified = verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}
}