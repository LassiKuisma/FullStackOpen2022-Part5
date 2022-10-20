const Notification = ({ notification }) => {
    if (notification === null || notification === undefined) {
        return null
    }

    const className = notification.type === "green"
        ? "ok"
        : notification.type === "yellow"
            ? "alert"
            : "error"

    return (
        <div className={className}>
            {notification.message}
        </div>
    )
}

export default Notification
