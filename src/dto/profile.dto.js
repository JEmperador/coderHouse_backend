class ProfileDTO {
    constructor(user) {
        const { id, first_name, last_name, email, role, social } = user;
        this.id = id;
        this.name = first_name,
        this.surname = last_name,
        this.email = email,
        this.role = role,
        this.social = social,
        this.fullName = `${last_name}, ${first_name}`
        this.isAdmin = role === "admin" ? true : false;
        this.noAdmin = role !== "admin" ? true : false;
    }
}

export default ProfileDTO;