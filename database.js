var db = window.openDatabase("msw_shop","1.0","MSW Shop", 200000);

function initialize_database() {
    db.transaction(function(tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL)`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('city'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS district (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          city_id INTEGER NOT NULL,
                          FOREIGN KEY (city_id) REFERENCES city(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('district'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS ward (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          district_id INTEGER NOT NULL,
                          FOREIGN KEY (district_id) REFERENCES district(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('ward'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS category (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          parent_id INTEGER NULL,
                          FOREIGN KEY (parent_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('category'),
          transaction_fail
      );
      
      query = `CREATE TABLE IF NOT EXISTS product (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          price REAL NOT NULL,
                          image TEXT NULL,
                          category_id INTEGER NOT NULL,
                          FOREIGN KEY (category_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('product'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS cart (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          account_id INTEGER NOT NULL,
                          product_id INTEGER NOT NULL,
                          quantity INTEGER NOT NULL,
                          FOREIGN KEY (account_id) REFERENCES account(id),
                          FOREIGN KEY (product_id) REFERENCES product(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('cart'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS account (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          username TEXT UNIQUE NOT NULL,
                          password TEXT NOT NULL,
                          firstname TEXT NULL,
                          lastname TEXT NULL,
                          birthday REAL NULL,
                          phone TEXT NULL,
                          ward_id INTEGER NULL,
                          district_id INTEGER NULL,
                          city_id INTEGER NULL,
                          status INTEGER NOT NULL,
                          FOREIGN  KEY (city_id) REFERENCES city(id),
                          FOREIGN  KEY (ward_id) REFERENCES ward(id),
                          FOREIGN  KEY (district_id) REFERENCES district(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('account'),
          transaction_fail
      );
  });
}

function fetch_database() {
  db.transaction(function(tx) {
      var query = `INSERT INTO category (name) VALUES (?)`;

      tx.executeSql(query, ['T_Shirt'], insert_transaction_success('T_Shirt'), transaction_fail);
      tx.executeSql(query, ['Hoodie'], insert_transaction_success('Hoodie'), transaction_fail);
 
      query = `INSERT INTO product (name, price, category_id, image) VALUES (?, ?, ?, ?)`;
      tx.executeSql(query, ['Áo ADLV gấu đen', 1300000, '1', 'img/item1.jpg'], insert_transaction_success('Product 01'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV gấu be', 1300000, '1','img/item2.jpg'], insert_transaction_success('Product 02'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV blue cloud', 1200000, '1','img/item4.jpg'], insert_transaction_success('Product 03'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV basic', 1200000, '1','img/item6.jpeg'], insert_transaction_success('Product 04'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV pink cloud', 1200000, '1','img/item5.jpeg'], insert_transaction_success('Product 05'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV gấu xanh', 1300000, '1','img/item3.jpg'], insert_transaction_success('Product 06'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV baby', 1100000, '1','img/item8.jpg'], insert_transaction_success('Product 07'), transaction_fail);
      tx.executeSql(query, ['Áo ADLV X', 1400000, '1','img/item7.jpg'], insert_transaction_success('Product 08'), transaction_fail);
      tx.executeSql(query, ['Hoodie ADLV trắng', 2200000, '2','img/item10.jpg'], insert_transaction_success('Product 09'), transaction_fail);
      tx.executeSql(query, ['Hoodie ADLV đen', 2200000, '2','img/item9.jpg'], insert_transaction_success('Product 10'), transaction_fail);
      
      
      query = `INSERT INTO account (username, password, status) VALUES (?, ?, ?)`;
      tx.executeSql(query, ['qunlee0712', '123', 1], insert_transaction_success('qunlee0712'), transaction_fail); 
  });
};

function insert_transaction_success(name) {
    log(`INFO`, `Insert ${name} successfully.`)
};

function table_transaction_success(table_name) {
    log(`INFO`, `Create table ${table_name} successfully.`)
};

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
};
  
function transaction_fail(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`); 
};
