const UserForm = ({
    user,
    handleLogout,
}) => {

    if (user === null) {
        return (<></>)
    }

    return (
        <div>
            <p>Logged in as {user.name}
                <button onClick={handleLogout}>Log out</button>
            </p>
        </div>
    )
}

export default UserForm
