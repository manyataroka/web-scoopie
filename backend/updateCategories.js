const { sequelize } = require('./database/db');
const Product = require('./models/Product');

async function updateCategories() {
  try {
    // Sync the database to ensure the model is properly set up
    await sequelize.sync();
    
    console.log('Database connected and synced');

    // Update products with old categories to new ones
    const result1 = await Product.update(
      { category: 'Special' },
      { 
        where: { 
          category: ['Chocolate', 'Classic'] 
        } 
      }
    );

    // Update Seasonal to Premium
    const result2 = await Product.update(
      { category: 'Premium' },
      { 
        where: { 
          category: 'Seasonal' 
        } 
      }
    );

    console.log('Categories updated successfully!');
    console.log('Updated Chocolate/Classic to Special:', result1[0], 'rows');
    console.log('Updated Seasonal to Premium:', result2[0], 'rows');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating categories:', error);
    process.exit(1);
  }
}

updateCategories(); 