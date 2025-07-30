const { sequelize } = require('./database/db');
const Product = require('./models/Product');

async function removeOldProducts() {
  try {
    // Sync the database to ensure the model is properly set up
    await sequelize.sync();
    
    console.log('Database connected and synced');

    // Remove products with "Chocolate" in their name
    const result = await Product.destroy({
      where: { 
        name: {
          [require('sequelize').Op.like]: '%Chocolate%'
        }
      }
    });

    console.log('Chocolate products removed successfully!');
    console.log('Removed products:', result, 'rows');
    
    // Show remaining products
    const remainingProducts = await Product.findAll();
    console.log('Remaining products:');
    remainingProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error removing old products:', error);
    process.exit(1);
  }
}

removeOldProducts(); 