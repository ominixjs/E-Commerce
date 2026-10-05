//=== Models
import UserModel from "./User.js";
import AddressModel from "./Address.js";
import ProductModel from "./Product.js";
import FavoriteModel from "./Favorite.js";
import CartModel from "./Cart.js";
import CartItemModel from "./CartItem.js";
import OrderModel from "./Order.js";
import OrderItemModel from "./Orderitem.js";
import PaymentModel from "./Payment.js";
import sequelize from "../configs/database.js";

// Associações -->

UserModel.hasMany(AddressModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", // Deleta a associação quando o usuário for deletado
    hooks: true, // Garante que os hooks do Sequelize também rodem nos filhos, se necessário
});
AddressModel.belongsTo(UserModel, { foreignKey: "addressId" });

// Cria uma associação para produtos definidos como favoritos.
// Essa associação define uma tabela intermediaria entre Usuário e Produto.
UserModel.belongsToMany(ProductModel, {
    through: FavoriteModel, // Tabela intermediária
    foreignKey: "userId",
    otherKey: "productId",
});
ProductModel.belongsToMany(UserModel, {
    through: FavoriteModel, // Tabela intermediária
    foreignKey: "productId",
    otherKey: "userId",
});

// Associações entre Usuário e Produto com Favoritos
// Para evitar erros ao deletar usuário será apagado
// todos os dados associados referente ao usuário.
UserModel.hasMany(FavoriteModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
FavoriteModel.belongsTo(UserModel, {
    foreignKey: "userId",
});

ProductModel.hasMany(FavoriteModel, {
    foreignKey: "productId",
    onDelete: "CASCADE",
});
FavoriteModel.belongsTo(ProductModel, {
    foreignKey: "productId",
});

// Associação entre usuário e carrinho com os produtos
UserModel.hasOne(CartModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
CartModel.belongsTo(UserModel, {
    foreignKey: "cartId",
    onDelete: "CASCADE",
});

// Associação entre carrinho e produtos do carrinho
CartModel.hasMany(CartItemModel, {
    foreignKey: "cartId",
    onDelete: "CASCADE",
});
CartItemModel.belongsTo(CartModel, {
    foreignKey: "cartId",
    onDelete: "CASCADE",
});

// Associação de produtos e carinho de produtos
ProductModel.hasMany(CartItemModel, {
    foreignKey: "productId",
    onDelete: "CASCADE",
});
CartItemModel.belongsTo(ProductModel, {
    foreignKey: "productId",
    onDelete: "CASCADE",
});

// Associação entre Order e Usuário
UserModel.hasMany(OrderModel, {
    foreignKey: "userId",
});
OrderModel.belongsTo(UserModel, {
    foreignKey: "orderId",
});

// Associação entre Order e OrderItem
OrderModel.hasMany(OrderItemModel, {
    foreignKey: "orderId",
    onDelete: "CASCADE",
});
OrderItemModel.belongsTo(OrderModel, {
    foreignKey: "orderId",
});

// Associação de Produto e OrderItem
ProductModel.hasMany(OrderItemModel, {
    foreignKey: "productId",
});
OrderItemModel.belongsTo(ProductModel, {
    foreignKey: "productId",
});

// Associação entre pagamento e usuário
UserModel.hasMany(PaymentModel, {
    foreignKey: "userId",
});
PaymentModel.belongsTo(UserModel, {
    foreignKey: "paymentId",
});

// Associação entre Pedido e Pagamentos
PaymentModel.hasMany(OrderModel, {
    foreignKey: "paymentId",
});
OrderModel.belongsTo(PaymentModel, {
    foreignKey: "orderId",
});

// await sequelize.sync({ force: true });
// await sequelize.drop()

export {
    UserModel,
    AddressModel,
    ProductModel,
    FavoriteModel,
    CartModel,
    CartItemModel,
    OrderModel,
    OrderItemModel,
};
