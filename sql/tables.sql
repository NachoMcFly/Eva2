CREATE TABLE IF NOT EXISTS game (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameName VARCHAR(255) NOT NULL,
	platform VARCHAR(255) NOT NULL,
	developer VARCHAR(255) NOT NULL,
	price VARCHAR(255) NOT NULL
);

INSERT INTO game (gameName, platform, developer, price) VALUES (
	"seis", "dos", "tres", "cuadro"
);
