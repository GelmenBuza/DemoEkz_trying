
export default function Login({handleBack, handleLogin, loginInput, setLoginInput}) {

    return (
        <div className="panel login-box">
            <div className="page-bar">
                <h1>Авторизация</h1>
                <button
                    type="button"
                    className="btn"
                    onClick={handleBack}
                >
                    ← Назад
                </button>
            </div>
            <form onSubmit={handleLogin}>
                <label htmlFor="login-input">
                    <strong>Логин пользователя:</strong>
                </label>
                <input
                    id="login-input"
                    className="input"
                    value={loginInput}
                    onChange={(event) => setLoginInput(event.target.value)}
                    placeholder="Например: client1, manager1, admin1"
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: 12 }}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}