package domain

type User struct {
	Email    string
	Name     string
	Password string
}

func NewUser(email, name, password string) *User {
	return &User{
		Email:    email,
		Name:     name,
		Password: password,
	}
}
