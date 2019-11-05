const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DataTypes, BOOLEAN, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/grace_shopper_db'
);

const User = conn.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  }
});

const Product = conn.define('product', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      isDecimal: true
    }
  },
  stock: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const Order = conn.define('order', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  complete: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

LineItem.belongsTo(Product);
Product.hasMany(LineItem);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const users = [
    {
      name: 'Billy Hill',
      email: 'bHill@gmail.com',
      password: '12345'
    },
    {
      name: 'John Ford',
      email: 'jFord@gmail.com',
      password: '12345'
    },
    {
      name: 'Anna Lane',
      email: 'aLane@gmail.com',
      password: '12345'
    },
    {
      name: 'May Taylor',
      email: 'mTaylor@gmail.com',
      password: '12345'
    },
    {
      name: 'James Romero',
      email: 'jRomero@gmail.com',
      password: '12345'
    }
  ];
  const [billy, john, anna, may, james] = await Promise.all(
    users.map(user => User.create(user))
  );

  const products = [
    { name: 'Hammer', stock: 200, price: 25.99 },
    { name: 'Nails', stock: 200, price: 9.5 },
    { name: 'Paint', stock: 200, price: 4.5 },
    { name: 'Chair Set', stock: 200, price: 157.47 },
    { name: 'Shovel', stock: 200, price: 15.0 },
    { name: 'Lawn Mower', stock: 200, price: 300.25 },
    { name: 'Wrench', stock: 200, price: 13.99 }
  ];
  const [
    hammer,
    nails,
    paint,
    chairSet,
    shovel,
    lawnMower,
    wrench
  ] = await Promise.all(products.map(product => Product.create(product)));

  const orders = [
    { complete: true, userId: anna.id },
    { complete: true, userId: may.id },
    { complete: true, userId: john.id }
  ];

  const [order1, order2, order3] = await Promise.all(
    orders.map(order => Order.create(order))
  );

  const lineItems = [
    { quantity: 6, productId: hammer.id, orderId: order1.id },
    { quantity: 6, productId: shovel.id, orderId: order2.id },
    { quantity: 16, productId: nails.id, orderId: order2.id },
    { quantity: 3, productId: paint.id, orderId: order3.id }
  ];

  const [item1, item2, item3, item4] = await Promise.all(
    lineItems.map(item => LineItem.create(item))
  );

  return {
    users: {
      billy,
      john,
      anna,
      may,
      james
    },
    products: {
      hammer,
      nails,
      paint,
      chairSet,
      shovel,
      lawnMower,
      wrench
    },
    orders: {
      order1,
      order2,
      order3
    },
    lineitems: {
      item1,
      item2,
      item3,
      item4
    }
  };
};

// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    User,
    Product,
    Order,
    LineItem
  }
};
