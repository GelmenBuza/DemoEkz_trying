import { useState } from "react"


export default function Header({ navigateTo, COMPANY_NAME, canManageOrders, user, handleLogout, draftItems, setDraftItems }) {
    const [mouseIn, setMouseIn] = useState(false)

    return (
        < header className="app-header" >
            <div
                className="brand"
                onClick={() => navigateTo("catalog")}
            >
                <img
                    src="/logo.png"
                    alt="Логотип"
                />
                <div>
                    <div className="brand-title">{COMPANY_NAME}</div>
                    <div className="brand-subtitle">Система оформления заказов</div>
                </div>
            </div>

            <div className="header-actions">
                {canManageOrders && (
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigateTo("orders")}
                    >
                        Заказы
                    </button>
                )}

                {user ? (
                    <>
                        <div className="user-badge">
                            <div className="user-fio">{user.full_name}</div>
                            <div className="user-role">{user.role_name}</div>
                        </div>
                        <button onClick={() => setDraftItems(null)} onMouseEnter={() => setMouseIn(true)} onMouseLeave={() => setMouseIn(false)}>
                            {mouseIn ? <span>Очистить?</span> : <span>Корзина: {draftItems?.length || 0}</span>}
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigateTo("login")}
                    >
                        Войти
                    </button>
                )}
            </div>
        </header >
    )
}