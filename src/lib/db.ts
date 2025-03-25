import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gallery_gem',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the database connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Initialize the database (create tables if they don't exist)
export const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create contact_requests table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        painting_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('new', 'contacted', 'completed') DEFAULT 'new'
      )
    `);
    
    console.log('Database initialized successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// Execute a query with parameters
export const query = async (sql: string, params: any[] = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
};

// For development/testing: Insert mock data if the table is empty
export const insertMockDataIfEmpty = async (): Promise<void> => {
  try {
    const results = await query('SELECT COUNT(*) as count FROM contact_requests') as [{ count: number }];
    
    if (results[0].count === 0) {
      console.log('Inserting mock contact request data...');
      
      const mockData = [
        {
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          phone: '+33 6 12 34 56 78',
          message: 'Je suis intéressé(e) par l\'œuvre "Coucher de Soleil sur Paris". Veuillez me contacter pour plus d\'informations.',
          painting_name: 'Coucher de Soleil sur Paris',
          status: 'new'
        },
        {
          name: 'Marie Laurent',
          email: 'marie.laurent@example.com',
          phone: '+33 7 98 76 54 32',
          message: 'Bonjour, je souhaiterais avoir plus d\'informations sur l\'œuvre "Abstraction en Bleu". Est-elle toujours disponible?',
          painting_name: 'Abstraction en Bleu',
          status: 'contacted'
        },
        {
          name: 'Pierre Martin',
          email: 'pierre.martin@example.com',
          phone: '+33 6 55 44 33 22',
          message: 'Je voudrais acheter "Nature Morte aux Fruits". Pouvez-vous me contacter pour discuter du prix et de la livraison?',
          painting_name: 'Nature Morte aux Fruits',
          status: 'completed'
        },
        {
          name: 'Sophie Dubois',
          email: 'sophie.dubois@example.com',
          phone: '+33 7 11 22 33 44',
          message: 'Bonjour, je suis intéressée par plusieurs œuvres de votre galerie. Pouvez-vous me contacter pour discuter des options?',
          status: 'new'
        },
        {
          name: 'Thomas Bernard',
          email: 'thomas.bernard@example.com',
          phone: '+33 6 99 88 77 66',
          message: 'Je souhaite obtenir plus d\'informations sur l\'œuvre "Paysage Urbain". Est-il possible de la voir en personne?',
          painting_name: 'Paysage Urbain',
          status: 'new'
        }
      ];
      
      for (const data of mockData) {
        await query(
          'INSERT INTO contact_requests (name, email, phone, message, painting_name, status) VALUES (?, ?, ?, ?, ?, ?)',
          [data.name, data.email, data.phone, data.message, data.painting_name || null, data.status]
        );
      }
      
      console.log('Mock data inserted successfully');
    }
  } catch (error) {
    console.error('Failed to insert mock data:', error);
  }
};

export default pool;
