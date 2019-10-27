const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;
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
  }
})

const syncAndSeed = async ()=>{
  await conn.sync({force: true});

  const users = [
    {
      name: 'Billy Hill'
    },
    {
      name: 'John Ford'
    },
    {
      name: 'Anna Lane'
    },
    {
      name: 'Many Taylor'
    },
    {
      name: 'James Romero'
    }
  ]
  const [billy, john, anna, many, james] = await Promise.all(users.map(user => User.create(user)))

  const products = [
    {name: 'Hammers'},
    {name: 'Silverware'},
    {name: 'Paint'},
    {name: 'Chairs'},
    {name: 'Carpets'},
    {name: 'Game Consoles'},
    {name: 'Movies'}
  ]
  const [hammer, Silverware, paint, chair, carpet, game, movie] = await Promise.all(products.map(product => Product.create(product)))

}

// syncAndSeed();

module.exports = {
  syncAndSeed,
  models: {
    User,
    Product
  }
}
