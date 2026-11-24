import { useEffect, useState } from "react";
import rawMockData from "./data/mockData.json";
import './App.css'

import Header from './components/Header'
import NoticeBanner from './components/NoticeBanner'
import Login from './pages/Login'
import Catalog from './pages/Catalog'
import Detail from './pages/Detail'
import Orders from './pages/Orders'

// Выберите ваш вариант: "variantA" (обувь) или "variantB" (спортинвентарь)
const ACTIVE_VARIANT = "variantA";
const STORAGE_KEY = `pr_de_state_${ACTIVE_VARIANT}`;

const initialDataset = rawMockData[ACTIVE_VARIANT];
const COMPANY_NAME = initialDataset.companyName;

const PAGE_TITLES = {
  catalog: `${COMPANY_NAME} — ${initialDataset.catalogTitle}`,
  detail: `${COMPANY_NAME} — Карточка товара`,
  login: `${COMPANY_NAME} — Авторизация`,
  orders: `${COMPANY_NAME} — Управление заказами`,
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Если данные в localStorage повреждены — используем стартовый mockData.json
  }

  return {
    products: initialDataset.products,
    orders: initialDataset.orders,
  };
}

export default function App() {
  const [initialState] = useState(loadInitialState);

  // Основные данные приложения (синхронизируются с localStorage)
  const [products, setProducts] = useState(initialState.products);
  const [orders, setOrders] = useState(initialState.orders);
  const users = initialDataset.users;
  const categories = initialDataset.categories;

  // Текущий авторизованный пользователь (null = Гость)
  const [user, setUser] = useState(null);
  const [loginInput, setLoginInput] = useState("");

  // Многоэкранная навигация: "catalog" | "detail" | "login" | "orders"
  const [screen, setScreen] = useState("catalog");
  const [prevScreen, setPrevScreen] = useState("catalog");
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Фильтры каталога (доступны авторизованному пользователю)
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortBy, setSortBy] = useState("");

  // Черновик текущего заказа и клиент, на которого он оформляется
  const [draftItems, setDraftItems] = useState([]);
  const [targetClient, setTargetClient] = useState(null);

  // Единое уведомление (type: "info" | "warning" | "error")
  const [notice, setNotice] = useState(null);

  // 1. Динамический заголовок вкладки браузера
  useEffect(() => {
    document.title = PAGE_TITLES[screen] || COMPANY_NAME;
  }, [screen]);

  // 2. Сохранение товаров и заказов в localStorage при любых изменениях
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ products, orders })
    );
  }, [products, orders]);

  // Навигация между экранами с запоминанием предыдущего экрана для кнопки «Назад»
  const navigateTo = (nextScreen) => {
    setPrevScreen(screen);
    setScreen(nextScreen);
  };

  const handleBack = () => {
    if (prevScreen && prevScreen !== screen) {
      setScreen(prevScreen);
    } else {
      setScreen("catalog");
    }
  };

  // Авторизация только по логину (без пароля)
  const handleLogin = (event) => {
    event.preventDefault();
    const cleanedLogin = loginInput.trim();
    const foundUser = users.find((item) => item.login === cleanedLogin);

    if (!foundUser) {
      setNotice({
        type: "error",
        title: "Ошибка авторизации",
        message: "Пользователь с таким логином не найден.",
      });
      return;
    }

    setUser(foundUser);
    setTargetClient(foundUser);
    setLoginInput("");
    setScreen("catalog");
    setNotice({
      type: "info",
      title: "Вход выполнен",
      message: `Добро пожаловать, ${foundUser.full_name} (${foundUser.role_name}).`,
    });
  };

  // Выход из аккаунта и сброс фильтров
  const handleLogout = () => {
    setUser(null);
    setTargetClient(null);
    setDraftItems([]);
    setSearch("");
    setCategoryId("all");
    setSortBy("");
    setScreen("catalog");
  };

  // Подтверждение заказа (допишите списание остатков в массиве products)
  const handleConfirmOrder = () => {
    const orderOwner = targetClient || user;
    if (!orderOwner || draftItems.length === 0) {
      return;
    }

    const nextOrderId =
      orders.length > 0
        ? Math.max(...orders.map((order) => order.id)) + 1
        : 1;

    const newOrder = {
      id: nextOrderId,
      user_id: orderOwner.id,
      client_full_name: orderOwner.full_name,
      order_date: new Date().toISOString().slice(0, 10),
      items: draftItems.map((item, index) => ({
        id: Date.now() + index,
        variant_id: item.variant_id,
        product_id: item.product_id,
        product_name: item.product_name,
        manufacturer_name: item.manufacturer_name,
        size: item.size,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
    };

    // TODO: обновите состояние products через setProducts(...),
    // уменьшив quantity у каждого заказанного варианта (variant_id)
    // на заказанное количество, чтобы остатки в каталоге пересчитались.

    // setProducts(prev => {})

    setOrders((prev) => [newOrder, ...prev]);
    setDraftItems([]);
    setTargetClient(user);
    setScreen("catalog");
    setNotice({
      type: "info",
      title: "Заказ оформлен",
      message: `Заказ №${newOrder.id} успешно сохранён.`,
    });
  };

  const canManageOrders =
    user !== null &&
    (user.role_code === "manager" || user.role_code === "admin");

  return (
    <div>
      <Header navigateTo={navigateTo} COMPANY_NAME={COMPANY_NAME} canManageOrders={canManageOrders} user={user} handleLogout={handleLogout} />

      <main className="container">
        {/* TODO: подключите компонент NoticeBanner для показа notice */}
        {notice && (
            <NoticeBanner notice={notice} setNotice={setNotice}/>
        )}

        {/* Экран 1: Авторизация */}
        {screen === "login" && (
          <Login handleBack={handleBack} handleLogin={handleLogin} loginInput={loginInput} setLoginInput={setLoginInput}/>
        )}

        {/* Экран 2: Главный каталог */}
        {screen === "catalog" && (
          <Catalog initialDataset={initialDataset} products={products}/>
        )}

        {/* Экран 3: Карточка просмотра товара */}
        {screen === "detail" && (
          <Detail selectedProductId={selectedProductId} handleBack={handleBack}/>
        )}

        {/* Экран 4: Управление заказами (Менеджер / Администратор) */}
        {screen === "orders" && canManageOrders && (
          <Orders user={user} handleBack={handleBack}/>
        )}
      </main>
    </div>
  );
}
