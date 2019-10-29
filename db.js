const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4, DataTypes} = Sequelize;
const conn = new Sequelize(process.env.DATABASE || 'postgres://localhost/grace_shopper_db');

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
})

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
    type: DataTypes.DECIMAL(10,2),
    validate: {
      isDecimal: true
    }
  }
});



Product.belongsTo(User);
User.hasMany(Product);

const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const users = [
    {
      name: 'Billy Hill', email: 'bHill@gmail.com', password: '12345'
    },
    {
      name: 'John Ford', email: 'bHill@gmail.com', password: '12345'
    },
    {
      name: 'Anna Lane', email: 'bHill@gmail.com', password: '12345'
    },
    {
      name: 'May Taylor', email: 'bHill@gmail.com', password: '12345'
    },
    {
      name: 'James Romero', email: 'bHill@gmail.com', password: '12345'
    }
  ]
  const [billy, john, anna, may, james] = await Promise.all(users.map(user => User.create(user)))

// WE CAN CHANGE IT LATER
  const products = [
    {name: 'Hammers', price: 25},
    {name: 'Silverware', price: 19.5},
    {name: 'Paint', price: 4.5},
    {name: 'Chair Set', price: 157.47},
    {name: 'Carpet', price: 51},
    {name: 'Game Consoles', price: 300},
    {name: 'Movie', price: 13}
  ]
  const [hammer, silverware, paint, chair, carpet, game, movie] = await Promise.all(products.map(product => Product.create(product)))

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
      silverware,
      paint,
      chair,
      carpet,
      game,
      movie
    }
  }

}

// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    User,
    Product
  }
}
