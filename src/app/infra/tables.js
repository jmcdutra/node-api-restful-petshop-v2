class Tables {
    init(connection) {
        console.log("Carregando tabelas")
        this.connection = connection;
        this.createServices();
    }

    createServices() {
        const query = "CREATE TABLE IF NOT EXISTS services (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), service varchar(255) NOT NULL, date datetime NOT NULL, dateCreation datetime NOT NULL, status varchar(255), comments text, PRIMARY KEY(id))"
        this.connection.query(query, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

}

module.exports = new Tables