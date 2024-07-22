class ProfileDTO {
    constructor(user) {
        const { first_name, last_name, email, role } = user;
        this.name = first_name,
        this.surname = last_name,
        this.email = email,
        this.role = role,
        this.fullName = `${last_name}, ${first_name}`
        this.isAdmin = role === "admin" ? true : false;
    }
}

export default ProfileDTO;