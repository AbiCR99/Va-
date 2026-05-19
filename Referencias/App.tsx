import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const lime = "#C6D93B";
const black = "#111111";
const gray = "#777777";
const lightGray = "#F4F4F4";

const categories = ["Comida", "Bebidas", "Farmacia", "Mascotas", "Express"];

const stores = [
  {
    name: "Burger House",
    type: "Hamburguesas",
    time: "30-40 min",
    rating: "4.6",
  },
  {
    name: "Sushi Point",
    type: "Sushi",
    time: "25-35 min",
    rating: "4.8",
  },
  {
    name: "Farmacia Central",
    type: "Farmacia",
    time: "20-30 min",
    rating: "4.7",
  },
];

const menuItems = [
  {
    name: "Burger clásica",
    description: "Carne, queso, lechuga y salsa de la casa",
    price: "$6.900",
  },
  {
    name: "Papas crocantes",
    description: "Porción individual con salsa",
    price: "$2.800",
  },
  {
    name: "Limonada natural",
    description: "500 ml",
    price: "$1.900",
  },
];

const getCategoryIcon = (category: string) => {
  if (category === "Comida") return "silverware-fork-knife";
  if (category === "Bebidas") return "glass-cocktail";
  if (category === "Farmacia") return "medical-bag";
  if (category === "Mascotas") return "paw";
  return "lightning-bolt";
};

const getStoreIcon = (type: string) => {
  if (type === "Hamburguesas") return "food";
  if (type === "Sushi") return "fish";
  return "medical-bag";
};

const getPriceNumber = (price: string) => {
  return Number(price.replace("$", "").replace(".", ""));
};

export default function App() {
  const [activeTab, setActiveTab] = useState("Inicio");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [accountScreen, setAccountScreen] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const productsTotal = cartItems.reduce((total, item) => {
    return total + getPriceNumber(item.price) * item.quantity;
  }, 0);

  const deliveryPrice = 900;
  const finalTotal = productsTotal + deliveryPrice;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`;
  };

  const renderStoreCard = (store: any, keyPrefix = "") => (
    <View key={`${keyPrefix}${store.name}`} style={styles.storeCard}>
      <View style={styles.storeImage}>
        <View style={styles.storeImageBadge}>
          <MaterialCommunityIcons
            name={getStoreIcon(store.type) as any}
            size={26}
            color={black}
          />
        </View>

        <Text style={styles.discountBadge}>
          {store.type === "Farmacia" ? "24HS" : "PROMO"}
        </Text>
      </View>

      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeType}>{store.type}</Text>
        <Text style={styles.storeMeta}>
          ★ {store.rating} · {store.time}
        </Text>
      </View>

      <Text style={styles.storeArrow}>›</Text>
    </View>
  );

  const renderTabContent = () => {
    if (activeTab === "Tracking") {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setActiveTab("Pedidos")}
          >
            <Ionicons name="chevron-back" size={20} color={black} />
            <Text style={styles.backButtonText}>Volver a pedidos</Text>
          </TouchableOpacity>

          <View style={styles.trackingCard}>
            <Text style={styles.orderLabel}>Seguimiento de pedido</Text>
            <Text style={styles.trackingTitle}>
              {activeOrder ? activeOrder.store : "Burger House"}
            </Text>
            <Text style={styles.trackingStatusPill}>
              {activeOrder ? activeOrder.status : "En camino"}
            </Text>
            <View style={styles.mapMockup}>
              <View style={styles.mapStreetOne} />
              <View style={styles.mapStreetTwo} />
              <View style={styles.mapStreetThree} />

              <View style={styles.routeLine} />

              <View style={styles.mapPin}>
                <Ionicons name="location" size={24} color={black} />
              </View>

              <View style={styles.mapBike}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={24}
                  color={black}
                />
              </View>
            </View>

            <View style={styles.trackingInfoBox}>
              <Text style={styles.orderInfoLabel}>Tiempo estimado</Text>

              <Text style={styles.orderInfoValue}>
                {activeOrder ? activeOrder.estimatedTime : "12:45"}
              </Text>

              <Text style={styles.trackingText}>
                {activeOrder
                  ? `Tu pedido de ${activeOrder.store} está en camino. Te avisamos cuando esté cerca.`
                  : "Tu repartidor está en camino. Faltan aproximadamente 8 minutos."}
              </Text>
            </View>
          </View>
        </>
      );
    }

    if (activeTab === "Pedidos") {
      return (
        <>
          <View style={styles.activeOrderCard}>
            <View style={styles.orderTopRow}>
              <View>
                <Text style={styles.orderLabel}>Pedido activo</Text>
                <Text style={styles.orderTitle}>
                  {activeOrder ? activeOrder.store : "Burger House"}
                </Text>
              </View>

              <Text style={styles.orderStatus}>
                {activeOrder ? activeOrder.status : "En camino"}
              </Text>
            </View>

            <View style={styles.orderProgress}>
              <View style={styles.orderProgressActive} />
            </View>

            <View style={styles.orderInfoRow}>
              <View>
                <Text style={styles.orderInfoLabel}>
                  {activeOrder ? "Total del pedido" : "Llegada estimada"}
                </Text>

                <Text style={styles.orderInfoValue}>
                  {activeOrder ? activeOrder.total : "12:45"}
                </Text>

                {activeOrder && (
                  <Text style={styles.orderSmallText}>
                    Tiempo estimado: {activeOrder.estimatedTime}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.trackButton}
                onPress={() => {
                  if (activeOrder) {
                    setActiveOrder({
                      ...activeOrder,
                      status: "En camino",
                    });
                  }

                  setActiveTab("Tracking");
                }}
              >
                <Text style={styles.trackButtonText}>Ver seguimiento</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Historial reciente</Text>

          {[
            {
              store: "Sushi Point",
              date: "Ayer",
              total: "$12.400",
              status: "Entregado",
            },
            {
              store: "Farmacia Central",
              date: "12 mayo",
              total: "$8.900",
              status: "Entregado",
            },
          ].map((order) => (
            <View key={order.store} style={styles.historyOrderCard}>
              <View style={styles.accountIcon}>
                <Ionicons name="receipt-outline" size={21} color={black} />
              </View>

              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{order.store}</Text>
                <Text style={styles.storeType}>
                  {order.date} · {order.status}
                </Text>
              </View>

              <Text style={styles.productPrice}>{order.total}</Text>
            </View>
          ))}
        </>
      );
    }

    if (activeTab === "Explorar") {
      return (
        <>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={20} color={gray} />
            <TextInput
              placeholder="Buscar comercios, productos o promos"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.exploreTitleRow}>
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory ? selectedCategory : "Explorá por categoría"}
              </Text>

              <Text style={styles.sectionSubtitle}>
                {selectedCategory
                  ? `Comercios y productos de ${selectedCategory.toLowerCase()}`
                  : "Elegí una categoría para ver opciones cerca tuyo."}
              </Text>
            </View>

            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.clearCategory}>Ver todo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.exploreGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.exploreCard,
                  selectedCategory === category && styles.exploreCardActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <View style={styles.exploreIcon}>
                  <MaterialCommunityIcons
                    name={getCategoryIcon(category) as any}
                    size={28}
                    color={black}
                  />
                </View>

                <Text style={styles.exploreTitle}>{category}</Text>
                <Text style={styles.exploreSubtitle}>
                  {category === "Express"
                    ? "Envíos rápidos"
                    : "Comercios cerca tuyo"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.explorePromo}>
            <Text style={styles.promoBadge}>NUEVO</Text>
            <Text style={styles.explorePromoTitle}>Promos cerca tuyo</Text>
            <Text style={styles.explorePromoText}>
              Descubrí descuentos activos en comercios de tu zona.
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Comercios cercanos</Text>
            <Text style={styles.seeAll}>Ver todos</Text>
          </View>

          {stores.map((store) => renderStoreCard(store, "explore-"))}
        </>
      );
    }

    if (activeTab === "Favoritos") {
      return (
        <>
          <View style={styles.favoritesHeader}>
            <Ionicons name="heart" size={28} color={lime} />
            <View>
              <Text style={styles.favoritesTitle}>Tus favoritos</Text>
              <Text style={styles.favoritesText}>
                Comercios guardados para pedir más rápido.
              </Text>
            </View>
          </View>

          {stores.slice(0, 2).map((store) => (
            <View key={`favorite-${store.name}`} style={styles.storeCard}>
              <View style={styles.storeImage}>
                <View style={styles.storeImageBadge}>
                  <MaterialCommunityIcons
                    name={getStoreIcon(store.type) as any}
                    size={26}
                    color={black}
                  />
                </View>

                <Text style={styles.discountBadge}>FAV</Text>
              </View>

              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeType}>{store.type}</Text>
                <Text style={styles.storeMeta}>
                  ★ {store.rating} · {store.time}
                </Text>
              </View>

              <Ionicons name="heart" size={22} color={lime} />
            </View>
          ))}

          <TouchableOpacity
            style={styles.addFavoriteButton}
            onPress={() => {
              setActiveTab("Explorar");
              setSelectedCategory(null);
            }}
          >
            <Ionicons name="add-circle-outline" size={22} color={black} />
            <Text style={styles.addFavoriteText}>Explorar más comercios</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (activeTab === "Cuenta") {
      const accountItems = [
        { label: "Mi perfil", icon: "person-outline" },
        { label: "Direcciones", icon: "location-outline" },
        { label: "Métodos de pago", icon: "card-outline" },
        { label: "Promociones", icon: "pricetag-outline" },
        { label: "Ayuda", icon: "help-circle-outline" },
      ];

      if (accountScreen) {
        return (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setAccountScreen(null)}
            >
              <Ionicons name="chevron-back" size={20} color={black} />
              <Text style={styles.backButtonText}>Volver a cuenta</Text>
            </TouchableOpacity>

            <View style={styles.emptyState}>
              <Ionicons name="settings-outline" size={46} color={lime} />
              <Text style={styles.emptyTitle}>{accountScreen}</Text>
              <Text style={styles.emptyText}>
                Esta sección va a permitir gestionar{" "}
                {accountScreen.toLowerCase()} dentro de Va!.
              </Text>
            </View>
          </>
        );
      }

      return (
        <>
          <View style={styles.accountHeader}>
            <View style={styles.accountAvatar}>
              <Text style={styles.accountInitial}>J</Text>
            </View>

            <View>
              <Text style={styles.accountName}>Juan</Text>
              <Text style={styles.accountEmail}>juan@email.com</Text>
            </View>
          </View>

          <View style={styles.accountList}>
            {accountItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.accountItem}
                onPress={() => setAccountScreen(item.label)}
              >
                <View style={styles.accountIcon}>
                  <Ionicons name={item.icon as any} size={22} color={black} />
                </View>

                <Text style={styles.accountItemText}>{item.label}</Text>

                <Ionicons name="chevron-forward" size={18} color={gray} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color={black} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      );
    }
    if (orderConfirmed) {
      return (
        <>
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={42} color={black} />
            </View>

            <Text style={styles.successTitle}>Pedido confirmado</Text>
            <Text style={styles.successText}>
              Tu pedido fue enviado a{" "}
              {activeOrder ? activeOrder.store : "Burger House"}. Ya podés seguirlo en
              tiempo real.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                if (activeOrder) {
                  setActiveOrder({
                    ...activeOrder,
                    status: "En camino",
                  });
                }

                setOrderConfirmed(false);
                setActiveTab("Tracking");
              }}
            >
              <Text style={styles.primaryButtonText}>Ver seguimiento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setOrderConfirmed(false);
                setSelectedStore(null);
                setShowCart(false);
                setShowCheckout(false);
                setActiveTab("Inicio");
              }}
            >
              <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    if (showCheckout) {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowCheckout(false)}
          >
            <Ionicons name="chevron-back" size={20} color={black} />
            <Text style={styles.backButtonText}>Volver al pedido</Text>
          </TouchableOpacity>

          <View style={styles.checkoutCard}>
            <Text style={styles.cartSummaryTitle}>Confirmar pedido</Text>
            <Text style={styles.cartSummaryStore}>
              Revisá la dirección y el método de pago.
            </Text>

            <View style={styles.checkoutSection}>
              <View style={styles.checkoutIcon}>
                <Ionicons name="location-outline" size={22} color={black} />
              </View>

              <View style={styles.storeInfo}>
                <Text style={styles.checkoutLabel}>Dirección de entrega</Text>
                <Text style={styles.checkoutValue}>
                  Av. Principal 1234, Villa Carlos Paz
                </Text>
              </View>

              <Text style={styles.changeText}>Cambiar</Text>
            </View>

            <View style={styles.checkoutSection}>
              <View style={styles.checkoutIcon}>
                <Ionicons name="card-outline" size={22} color={black} />
              </View>

              <View style={styles.storeInfo}>
                <Text style={styles.checkoutLabel}>Método de pago</Text>
                <Text style={styles.checkoutValue}>Efectivo al recibir</Text>
              </View>

              <Text style={styles.changeText}>Cambiar</Text>
            </View>

            <View style={styles.checkoutSection}>
              <View style={styles.checkoutIcon}>
                <Ionicons name="pricetag-outline" size={22} color={black} />
              </View>

              <View style={styles.storeInfo}>
                <Text style={styles.checkoutLabel}>Cupón</Text>
                <Text style={styles.checkoutValue}>VAEXTRA aplicado</Text>
              </View>

              <Text style={styles.changeText}>Editar</Text>
            </View>

            <View style={styles.cartDivider} />

            {cartItems.map((item, index) => (
              <View key={`checkout-${item.name}-${index}`} style={styles.cartLine}>
                <Text style={styles.cartLineText}>
                  {item.quantity} x {item.name}
                </Text>

                <Text style={styles.cartLinePrice}>{item.price}</Text>
              </View>
            ))}

            <View style={styles.cartLine}>
              <Text style={styles.cartLineText}>Envío</Text>
              <Text style={styles.cartLinePrice}>{formatPrice(deliveryPrice)}</Text>
            </View>

            <View style={styles.cartLine}>
              <Text style={styles.cartTotalText}>Total</Text>
              <Text style={styles.cartTotalPrice}>{formatPrice(finalTotal)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              setActiveOrder({
                store: selectedStore ? selectedStore.name : "Burger House",
                status: "Confirmado",
                estimatedTime: "25-35 min",
                total: formatPrice(finalTotal),
              });

              setOrderConfirmed(true);
              setShowCheckout(false);
              setShowCart(false);
              setCartCount(0);
              setCartItems([]);
            }}
          >
            <Text style={styles.primaryButtonText}>Confirmar pedido</Text>
          </TouchableOpacity>
        </>
      );
    }
    if (selectedProduct) {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedProduct(null)}
          >
            <Ionicons name="chevron-back" size={20} color={black} />
            <Text style={styles.backButtonText}>Volver al menú</Text>
          </TouchableOpacity>

          <View style={styles.productDetailCard}>
            <View style={styles.productDetailIcon}>
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={42}
                color={black}
              />
            </View>

            <Text style={styles.productDetailName}>{selectedProduct.name}</Text>
            <Text style={styles.productDetailDescription}>
              {selectedProduct.description}
            </Text>
            <Text style={styles.productDetailPrice}>{selectedProduct.price}</Text>

            <View style={styles.quantityBox}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setProductQuantity((current) => Math.max(1, current - 1))
                }
              >
                <Ionicons name="remove" size={22} color={black} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{productQuantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setProductQuantity((current) => current + 1)}
              >
                <Ionicons name="add" size={22} color={black} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              setCartItems((currentItems) => [
                ...currentItems,
                {
                  ...selectedProduct,
                  quantity: productQuantity,
                },
              ]);

              setCartCount((current) => current + productQuantity);
              setSelectedProduct(null);
            }}
          >
            <Text style={styles.primaryButtonText}>Agregar al pedido</Text>
          </TouchableOpacity>
        </>
      );
    }
    if (showCart) {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowCart(false)}
          >
            <Ionicons name="chevron-back" size={20} color={black} />
            <Text style={styles.backButtonText}>Volver al menú</Text>
          </TouchableOpacity>

          <View style={styles.cartSummaryCard}>
            <Text style={styles.cartSummaryTitle}>Tu pedido</Text>
            <Text style={styles.cartSummaryStore}>
              {selectedStore ? selectedStore.name : "Burger House"}
            </Text>

            {cartItems.map((item, index) => (
              <View key={`${item.name}-${index}`} style={styles.cartLine}>
                <Text style={styles.cartLineText}>
                  {item.quantity} x {item.name}
                </Text>

                <Text style={styles.cartLinePrice}>{item.price}</Text>
              </View>
            ))}

            <View style={styles.cartDivider} />

            <View style={styles.cartLine}>
              <Text style={styles.cartLineText}>Envío</Text>
              <Text style={styles.cartLinePrice}>{formatPrice(deliveryPrice)}</Text>
            </View>

            <View style={styles.cartLine}>
              <Text style={styles.cartTotalText}>Total estimado</Text>
              <Text style={styles.cartTotalPrice}>{formatPrice(finalTotal)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowCheckout(true)}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (selectedStore) {
      return (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSelectedStore(null);
              setShowCart(false);
            }}
          >
            <Ionicons name="chevron-back" size={20} color={black} />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>

          <View style={styles.storeDetailHero}>
            <View style={styles.storeDetailIcon}>
              <MaterialCommunityIcons
                name={getStoreIcon(selectedStore.type) as any}
                size={42}
                color={black}
              />
            </View>

            <Text style={styles.storeDetailName}>{selectedStore.name}</Text>
            <Text style={styles.storeDetailType}>{selectedStore.type}</Text>

            <View style={styles.storeDetailMetaRow}>
              <Text style={styles.storeDetailMeta}>★ {selectedStore.rating}</Text>
              <Text style={styles.storeDetailMeta}>{selectedStore.time}</Text>
              <Text style={styles.storeDetailMeta}>Envío desde $900</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Menú</Text>

          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuProductCard}
              onPress={() => {
                setSelectedProduct(item);
                setProductQuantity(1);
              }}
            >
              <View style={styles.menuItemIcon}>
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={24}
                  color={black}
                />
              </View>

              <View style={styles.menuProductInfo}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.storeType}>{item.description}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>

              <View style={styles.bigPlusButton}>
                <Ionicons name="add" size={26} color={black} />
              </View>
            </TouchableOpacity>
          ))}
        </>
      );
    }

    return (
      <>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={gray} />
          <TextInput
            placeholder="Buscar comida, farmacia o envíos"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.categoriesRow}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryCard}
              onPress={() => {
                setSelectedCategory(category);
                setActiveTab("Explorar");
              }}
            >
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name={getCategoryIcon(category) as any}
                  size={26}
                  color={black}
                />
              </View>

              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.promoCard}>
          <View>
            <Text style={styles.promoBadge}>PROMO</Text>
            <Text style={styles.promoTitle}>Envío gratis</Text>
            <Text style={styles.promoSubtitle}>en tu primer pedido</Text>
            <Text style={styles.promoSmall}>Código: VAEXTRA</Text>
          </View>

          <View style={styles.bagMockup}>
            <Text style={styles.bagLogo}>
              Va<Text style={styles.logoBang}>!</Text>
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destacados para vos</Text>
          <Text style={styles.seeAll}>Ver todos</Text>
        </View>

        {stores.map((store) => (
          <TouchableOpacity
            key={store.name}
            style={styles.storeCard}
            onPress={() => {
              setSelectedStore(store);
              setShowCart(false);
            }}
          >
            <View style={styles.storeImage}>
              <View style={styles.storeImageBadge}>
                <MaterialCommunityIcons
                  name={getStoreIcon(store.type) as any}
                  size={26}
                  color={black}
                />
              </View>

              <Text style={styles.discountBadge}>
                {store.type === "Farmacia" ? "24HS" : "PROMO"}
              </Text>
            </View>

            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeType}>{store.type}</Text>
              <Text style={styles.storeMeta}>
                ★ {store.rating} · {store.time}
              </Text>
            </View>

            <Text style={styles.storeArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  const navItems = [
    { label: "Inicio", icon: "home", outline: "home-outline" },
    { label: "Pedidos", icon: "bag", outline: "bag-outline" },
    { label: "Explorar", icon: "search", outline: "search-outline" },
    { label: "Favoritos", icon: "heart", outline: "heart-outline" },
    { label: "Cuenta", icon: "person", outline: "person-outline" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoLines}>≡ </Text>
            Va<Text style={styles.logoBang}>!</Text>
          </Text>

          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={22} color={black} />
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>¡Vamos, Luan!</Text>
        <Text style={styles.subtitle}>¿Qué querés pedir hoy?</Text>

        <View style={styles.locationPill}>
          <Ionicons name="location" size={15} color={lime} />
          <Text style={styles.locationText}>Mi ubicación</Text>
          <Ionicons name="chevron-down" size={14} color={gray} />
        </View>

        {renderTabContent()}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {cartCount > 0 && !showCart && !showCheckout && !orderConfirmed && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => setShowCart(true)}
        >
          <View>
            <Text style={styles.cartBarTitle}>Ver pedido</Text>
            <Text style={styles.cartBarText}>
              {cartCount} {cartCount === 1 ? "producto" : "productos"} agregado
            </Text>
          </View>

          <View style={styles.cartBarBadge}>
            <Ionicons name="arrow-forward" size={20} color={black} />
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.bottomNav}>
        {navItems.map((item) => {
          const isActive = activeTab === item.label;

          return (
            <TouchableOpacity
              key={item.label}
              style={styles.navButton}
              onPress={() => {
                setActiveTab(item.label);
                setSelectedStore(null);
                setSelectedProduct(null);
                setShowCart(false);
                setShowCheckout(false);
                setOrderConfirmed(false);

                if (item.label !== "Cuenta") {
                  setAccountScreen(null);
                }
              }}
            >
              <Ionicons
                name={(isActive ? item.icon : item.outline) as any}
                size={22}
                color={isActive ? lime : "#777777"}
              />

              <Text style={isActive ? styles.navActive : styles.navItem}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 34,
    fontWeight: "900",
    color: black,
    fontStyle: "italic",
  },
  logoLines: {
    color: lime,
    fontStyle: "normal",
  },
  logoBang: {
    color: lime,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  locationPill: {
    alignSelf: "flex-start",
    backgroundColor: lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "600",
    color: black,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "900",
    color: black,
    marginTop: 28,
  },
  subtitle: {
    fontSize: 18,
    color: gray,
    marginTop: 4,
    marginBottom: 0,
  },
  searchBox: {
    height: 54,
    backgroundColor: lightGray,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 22,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: black,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoryCard: {
    alignItems: "center",
    width: 64,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: black,
    marginTop: 7,
    textAlign: "center",
  },
  promoCard: {
    backgroundColor: black,
    borderRadius: 28,
    padding: 22,
    minHeight: 160,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  promoBadge: {
    backgroundColor: lime,
    color: black,
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
    overflow: "hidden",
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },
  promoSubtitle: {
    color: lime,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  promoSmall: {
    color: "#CCCCCC",
    marginTop: 12,
    fontSize: 13,
  },
  bagMockup: {
    width: 88,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-4deg" }],
  },
  bagLogo: {
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
    color: black,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: black,
  },
  seeAll: {
    color: lime,
    fontWeight: "900",
  },
  storeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  storeImage: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    position: "relative",
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  storeImageBadge: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  discountBadge: {
    position: "absolute",
    top: -7,
    left: -6,
    backgroundColor: lime,
    color: black,
    fontSize: 9,
    fontWeight: "900",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 17,
    fontWeight: "900",
    color: black,
  },
  storeType: {
    fontSize: 13,
    color: gray,
    marginTop: 3,
  },
  storeMeta: {
    fontSize: 13,
    color: black,
    fontWeight: "700",
    marginTop: 6,
  },
  storeArrow: {
    fontSize: 34,
    color: "#BBBBBB",
  },
  emptyState: {
    marginTop: 42,
    padding: 28,
    borderRadius: 28,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: black,
    marginTop: 14,
  },
  emptyText: {
    fontSize: 15,
    color: gray,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  exploreTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: gray,
    marginTop: 4,
  },
  clearCategory: {
    color: lime,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 24,
  },
  exploreCardActive: {
    borderColor: lime,
    backgroundColor: "#FBFDEB",
  },
  exploreCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  exploreIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: black,
  },
  exploreSubtitle: {
    fontSize: 12,
    color: gray,
    marginTop: 4,
  },
  explorePromo: {
    backgroundColor: black,
    borderRadius: 24,
    padding: 20,
    marginBottom: 26,
  },
  explorePromoTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12,
  },
  explorePromoText: {
    color: "#CCCCCC",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  activeOrderCard: {
    backgroundColor: black,
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
  },
  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  orderLabel: {
    color: "#BBBBBB",
    fontSize: 13,
    fontWeight: "700",
  },
  orderTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },
  orderStatus: {
    backgroundColor: lime,
    color: black,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
  },
  orderProgress: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#333333",
    overflow: "hidden",
    marginBottom: 18,
  },
  orderProgressActive: {
    width: "72%",
    height: "100%",
    backgroundColor: lime,
    borderRadius: 999,
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderInfoLabel: {
    color: "#BBBBBB",
    fontSize: 12,
    fontWeight: "700",
  },
  orderInfoValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },
  orderSmallText: {
  color: "#BBBBBB",
  fontSize: 12,
  fontWeight: "700",
  marginTop: 4,
},
  trackButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  trackButtonText: {
    color: black,
    fontSize: 12,
    fontWeight: "900",
  },
  historyOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "900",
    color: black,
  },
  productDetailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 18,
  },
  productDetailIcon: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E6EDB5",
    marginBottom: 18,
  },
  productDetailName: {
    fontSize: 28,
    fontWeight: "900",
    color: black,
    textAlign: "center",
  },
  productDetailDescription: {
    fontSize: 15,
    color: gray,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  productDetailPrice: {
    fontSize: 24,
    fontWeight: "900",
    color: black,
    marginBottom: 22,
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightGray,
    borderRadius: 999,
    padding: 6,
    gap: 18,
  },
  quantityButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "900",
    color: black,
    minWidth: 26,
    textAlign: "center",
  },
  accountHeader: {
    backgroundColor: "#F7F8EA",
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#E6EDB5",
    marginBottom: 18,
  },
  accountAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: black,
    alignItems: "center",
    justifyContent: "center",
  },
  accountInitial: {
    color: lime,
    fontSize: 26,
    fontWeight: "900",
  },
  accountName: {
    fontSize: 20,
    fontWeight: "900",
    color: black,
  },
  accountEmail: {
    fontSize: 13,
    color: gray,
    marginTop: 3,
  },
  accountList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
    marginBottom: 16,
  },
  accountItem: {
    minHeight: 62,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  accountIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  accountItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: black,
  },
  logoutButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "900",
    color: black,
  },
  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: lightGray,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "900",
    color: black,
  },
  trackingCard: {
    backgroundColor: black,
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
  },
  trackingTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 4,
    marginBottom: 18,
  },
  trackingStatusPill: {
    alignSelf: "flex-start",
    backgroundColor: lime,
    color: black,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 18,
    overflow: "hidden",
  },
  mapMockup: {
    height: 220,
    backgroundColor: "#F7F8EA",
    borderRadius: 24,
    marginBottom: 18,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  routeLine: {
    position: "absolute",
    width: 170,
    height: 5,
    borderRadius: 999,
    backgroundColor: lime,
    transform: [{ rotate: "-22deg" }],
  },
  mapStreetOne: {
    position: "absolute",
    width: 260,
    height: 14,
    borderRadius: 999,
    backgroundColor: "#E9EFC4",
    transform: [{ rotate: "18deg" }],
    top: 54,
    left: -20,
  },
  mapStreetTwo: {
    position: "absolute",
    width: 260,
    height: 14,
    borderRadius: 999,
    backgroundColor: "#E9EFC4",
    transform: [{ rotate: "-28deg" }],
    bottom: 58,
    right: -25,
  },
  mapStreetThree: {
    position: "absolute",
    width: 190,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#E9EFC4",
    transform: [{ rotate: "90deg" }],
    right: 70,
    top: 80,
  },
  mapPin: {
    position: "absolute",
    left: 58,
    bottom: 58,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  mapBike: {
    position: "absolute",
    right: 58,
    top: 58,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: lime,
    alignItems: "center",
    justifyContent: "center",
  },
  trackingInfoBox: {
    backgroundColor: "#1E1E1E",
    borderRadius: 22,
    padding: 16,
  },
  trackingText: {
    color: "#CCCCCC",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  favoritesHeader: {
    backgroundColor: black,
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 22,
  },
  favoritesTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  favoritesText: {
    color: "#CCCCCC",
    fontSize: 13,
    marginTop: 4,
  },
  addFavoriteButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F7F8EA",
    borderWidth: 1,
    borderColor: "#E6EDB5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  addFavoriteText: {
    fontSize: 15,
    fontWeight: "900",
    color: black,
  },
  storeDetailHero: {
    backgroundColor: black,
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    marginBottom: 18,
  },
  storeDetailIcon: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: lime,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  storeDetailName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  storeDetailType: {
    color: "#CCCCCC",
    fontSize: 15,
    marginTop: 5,
  },
  storeDetailMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  storeDetailMeta: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
  },
  primaryButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: lime,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: black,
    fontSize: 16,
    fontWeight: "900",
  },
  menuItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  menuProductCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  menuProductInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  bigPlusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: lime,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 18,
  },
  checkoutSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  checkoutIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#F7F8EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E6EDB5",
  },
  checkoutLabel: {
    fontSize: 12,
    color: gray,
    fontWeight: "700",
  },
  checkoutValue: {
    fontSize: 14,
    color: black,
    fontWeight: "900",
    marginTop: 3,
  },
  changeText: {
    color: lime,
    fontSize: 12,
    fontWeight: "900",
  },
  cartSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 18,
  },
  cartSummaryTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: black,
  },
  cartSummaryStore: {
    fontSize: 15,
    color: gray,
    marginTop: 4,
    marginBottom: 18,
  },
  cartLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  cartLineText: {
    fontSize: 15,
    fontWeight: "700",
    color: black,
  },
  cartLinePrice: {
    fontSize: 15,
    fontWeight: "900",
    color: black,
  },
  cartDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: "900",
    color: black,
  },
  cartTotalPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: black,
  },
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  successIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: lime,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: black,
    textAlign: "center",
  },
  successText: {
    fontSize: 15,
    color: gray,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },
  secondaryButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: lightGray,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: black,
    fontSize: 15,
    fontWeight: "900",
  },
  bottomSpace: {
    height: 95,
  },
  cartBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 88,
    backgroundColor: lime,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    zIndex: 20,
  },
  cartBarTitle: {
    color: black,
    fontSize: 16,
    fontWeight: "900",
  },
  cartBarText: {
    color: black,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  cartBarBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navActive: {
    color: lime,
    fontWeight: "900",
    fontSize: 12,
  },
  navItem: {
    color: "#777777",
    fontWeight: "700",
    fontSize: 12,
  },
});
