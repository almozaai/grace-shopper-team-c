const { db, User, Product, Order, LineItem } = require('../server/db');

const mapAndSave = async(model, items) => Promise.all(await items.map(item => model.create(item)));

const syncAndSeed = async () => {

  await db.sync({ force: true });

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


  const [billy, john, anna, may, james] = await mapAndSave(User, users);

  const products = [
    {
      name: 'Hammer',
      stock: 200,
      price: 25.99
    },
    {
      name: 'Nails',
      stock: 200,
      price: 9.5
    },
    {
      name: 'Wrench',
      stock: 200,
      price: 13.99
    },
    {
      name: 'Paint, Black',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, White',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Red',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Orange',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Yellow',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Green',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Blue',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Paint, Purple',
      stock: 200,
      price: 4.5
    },
    {
      name: 'Chair Set',
      stock: 200,
      price: 157.47
    },
    {
      name: 'Shovel',
      stock: 200,
      price: 10.02
    },
    {
      name: 'Rake',
      stock: 200,
      price: 25.5
    },
    {
      name: 'Broom',
      stock: 200,
      price: 28
    },
    {
      name: 'Smart Lock',
      stock: 200,
      price: 289
    },
    {
      name: 'Deadbolt Lock',
      stock: 200,
      price: 109
    },
    {
      name: 'Door Knobs',
      stock: 200,
      price: 9.97
    },
    {
      name: 'Hinge Set (x12)',
      stock: 200,
      price: 26.98
    },
    {
      name: 'Power Drill',
      stock: 200,
      price: 159
    },
    {
      name: 'Circular Saw',
      stock: 200,
      price: 149
    },
    {
      name: 'Reciprocating Saw',
      stock: 200,
      price: 119
    },
    {
      name: 'Table Saw',
      stock: 200,
      price: 599.47
    },
    {
      name: 'Tool Set',
      stock: 200,
      price: 149.02
    },
    {
      name: 'Ratchets & Sockets',
      stock: 200,
      price: 99.99
    },
    {
      name: 'Tool Storage Workbench, Small',
      stock: 200,
      price: 139.47
    },
    {
      name: 'Tool Storage Workbench, Medium',
      stock: 200,
      price: 636.98
    },
    {
      name: 'Tool Storage Workbench, Large',
      stock: 200,
      price: 1098.49
    },
    {
      name: 'Saw Blades',
      stock: 200,
      price: 14.97
    },
    {
      name: 'Drill Bits',
      stock: 200,
      price: 12.97
    },
    {
      name: 'Batteries & Chargers',
      stock: 200,
      price: 198.99
    },
    {
      name: 'Air Compressor',
      stock: 200,
      price: 299.99
    },
    {
      name: 'Lawn Mower',
      stock: 200,
      price: 299.99
    }
  ];

  const [ hammer, nails, wrench, paintBlack, paintWhite, paintRed, paintOrange, paintYellow, paintGreen, paintBlue, paintPurple, chairSet, shovel, rake, broom, smartLock, deadbolt, doorKnob, hinge, drill, circularSaw, reciprocatingSaw, tableSaw, toolSet, sockets, workbenchSmall, workbenchMedium, workbenchLarge, sawBlades, batteries, air, lawnMower, ] = await mapAndSave(Product, products);

  const orders = [
    {
      complete: true,
      userId: anna.id
    },
    {
      complete: true,
      userId: may.id
    },
    {
      complete: true,
      userId: john.id
    }
  ];

  const [order1, order2, order3] = await mapAndSave(Order, orders);

  const lineItems = [
    {
      quantity: 6,
      productId: hammer.id,
      orderId: order1.id
    },
    {
      quantity: 6,
      productId: shovel.id,
      orderId: order2.id
    },
    {
      quantity: 16,
      productId: nails.id,
      orderId: order2.id
    },
    {
      quantity: 3,
      productId: paintBlack.id,
      orderId: order3.id
    }
  ];

  const [item1, item2, item3, item4] = await mapAndSave(LineItem, lineItems);
}



syncAndSeed();
