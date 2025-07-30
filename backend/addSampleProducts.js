const { sequelize } = require('./database/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Strawberry Ice Cream',
    description: 'Delicious strawberry ice cream with real fruit pieces',
    price: 180.00,
    category: 'Fruit',
    image: 'strawberry.jpg',
    stock: 25,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream with rich creamy texture',
    price: 150.00,
    category: 'Classic',
    image: 'vanilla.jpg',
    stock: 40,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Chocolate Ice Cream',
    description: 'Rich chocolate ice cream with cocoa flavor',
    price: 210.00,
    category: 'Chocolate',
    image: 'chocolate.jpg',
    stock: 30,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Mint Ice Cream',
    description: 'Refreshing mint ice cream with cool flavor',
    price: 190.00,
    category: 'Special',
    image: 'mint.jpg',
    stock: 20,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Blueberry Ice Cream',
    description: 'Sweet blueberry ice cream with berry pieces',
    price: 200.00,
    category: 'Fruit',
    image: 'blueberry.jpg',
    stock: 15,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Butterscotch Ice Cream',
    description: 'Creamy butterscotch ice cream with caramel notes',
    price: 220.00,
    category: 'Special',
    image: 'buttersotch.jpg',
    stock: 18,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Peanut Butter Ice Cream',
    description: 'Smooth peanut butter ice cream with nutty flavor',
    price: 230.00,
    category: 'Special',
    image: 'peanutbutter.jpg',
    stock: 12,
    status: 'Active',
    isActive: true
  },
  {
    name: 'Mango Ice Cream',
    description: 'Tropical mango ice cream with fresh fruit taste',
    price: 195.00,
    category: 'Fruit',
    image: 'mango.jpg',
    stock: 22,
    status: 'Active',
    isActive: true
  }
];

async function addSampleProducts() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Clear existing products (optional - remove this if you want to keep existing)
    // await Product.destroy({ where: {} });
    // console.log('Cleared existing products.');

    // Add sample products
    for (const product of sampleProducts) {
      const existingProduct = await Product.findOne({ where: { name: product.name } });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Added: ${product.name}`);
      } else {
        console.log(`Skipped (already exists): ${product.name}`);
      }
    }

    console.log('Sample products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample products:', error);
    process.exit(1);
  }
}

addSampleProducts(); 